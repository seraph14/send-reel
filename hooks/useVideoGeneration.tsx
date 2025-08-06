import { useCallback, useEffect, useRef, useState } from "react";
import { CaptionWord, MyVideo } from "@/lib/types";
import { toast } from "sonner";

interface VideoGenerationState {
  aiHookVideoUrl: string | null;
  captions: CaptionWord[];
  isLoading: boolean;
  error: string | null;
  downloadLink: string | null;
  myVideos: MyVideo[];
}

interface VideoGenerationActions {
  generateAIHook: (hookId: string, prompt?: string) => Promise<void>;
  generateCaptions: (userVideoUrl: string) => Promise<void>;
  uploadVideoToApi: (file: File) => Promise<string | null>;
  exportVideo: (
    selectedHook: string | null,
    userVideoUrl: string | null,
    aiHookVideoUrl: string | null,
    captions: CaptionWord[]
  ) => Promise<void>;
  reset: () => void;
}

interface useVideoGenerationReturn
  extends VideoGenerationState,
    VideoGenerationActions {}

const LOCAL_STORAGE_KEY = "my-uploaded-videos";

export const useVideoGeneration = (): useVideoGenerationReturn => {
  const [state, setState] = useState<VideoGenerationState>(() => {
    if (typeof window !== "undefined") {
      try {
        const storedVideos = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedVideos) {
          return {
            aiHookVideoUrl: null,
            captions: [],
            isLoading: false,
            error: null,
            downloadLink: null,
            myVideos: JSON.parse(storedVideos),
          };
        }
      } catch (error) {
        console.error("Failed to load videos from local storage:", error);
      }
    }

    return {
      aiHookVideoUrl: null,
      captions: [],
      isLoading: false,
      error: null,
      downloadLink: null,
      myVideos: [],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.myVideos));
    } catch (error) {
      console.error("Failed to save videos to local storage:", error);
    }
  }, [state.myVideos]);

  const clearMyVideos = useCallback(() => {
    setState((s) => ({ ...s, myVideos: [] }));
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear videos from local storage:", error);
    }
  }, []);

  const reset = () => {
    setState({
      aiHookVideoUrl: null,
      captions: [],
      isLoading: false,
      error: null,
      downloadLink: null,
      myVideos: state.myVideos,
    });
  };

  const generateAIHook = async (hookId: string, prompt?: string) => {
    setState((s) => ({
      ...s,
      isLoading: true,
      error: null,
      downloadLink: null,
    }));
    try {
      console.log("Initiating AI hook generation...");
      toast("Initiating AI Hook Generation");

      const response = await fetch("/api/generate-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hookId, prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate AI hook");
      }

      const data = await response.json();
      setState((s) => ({
        ...s,
        aiHookVideoUrl: data.videoUrl,
        isLoading: false,
      }));
      console.log("AI hook generated:", data.videoUrl);
      toast.success("AI hook generated!");
    } catch (err: any) {
      setState((s) => ({
        ...s,
        error: "AI hook generation error",
        isLoading: false,
      }));
      console.error("AI hook generation error:", err);
      toast.error("AI hook generation failed!");
    }
  };

  const cacheRef = useRef<Map<string, any>>(new Map());

  const generateCaptions = async (userVideoUrl: string, prompt = "") => {
    setState((s) => ({
      ...s,
      isLoading: true,
      error: null,
      downloadLink: null,
    }));

    if (!userVideoUrl) {
      setState((s) => ({
        ...s,
        isLoading: false,
      }));
      return;
    }

    if (cacheRef.current.has(userVideoUrl)) {
      console.log("⚡ Using cached captions");
      setState((s) => ({
        ...s,
        captions: cacheRef.current.get(userVideoUrl),
        isLoading: false,
        status: "Captions Generated.",
      }));
      return;
    }

    try {
      console.log("Initiating caption generation...");
      toast("Initiating Caption Generation!");
      const response = await fetch("/api/generate-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userVideoUrl, prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate captions");
      }

      const data = await response.json();
      setState((s) => ({
        ...s,
        captions: data.words,
        isLoading: false,
        status: "Captions Generated.",
      }));
      console.log("Captions generated:", data.text);
      toast.success("Captions generated!");
      cacheRef.current.set(userVideoUrl, data.words);
    } catch (err: any) {
      setState((s) => ({ ...s, error: err.message, isLoading: false }));
      toast.error("Captions generation failed!");
      console.error("Caption generation error:", err);
    }
  };

  const exportVideo = async (
    selectedHook: string | null,
    userVideoUrl: string | null,
    aiHookVideoUrl: string | null,
    captions: CaptionWord[]
  ) => {
    setState((s) => ({
      ...s,
      isLoading: true,
      error: null,
      downloadLink: null,
    }));

    if (!userVideoUrl) {
      setState((s) => ({
        ...s,
        error: "Please upload a video first.",
        isLoading: false,
      }));
      return;
    }

    try {
      console.log("Initiating video export (via backend simulation)...");
      const response = await fetch("/api/lambda/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hookId: selectedHook,
          userVideoUrl,
          aiHookVideoUrl,
          captions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to export video");
      }

      const data = await response.json();
      console.log("Video export simulated. Download link:", data);
      setState((s) => ({
        ...s,
        downloadLink: data.downloadUrl,
        isLoading: false,
      }));
    } catch (err: any) {
      setState((s) => ({ ...s, error: err.message, isLoading: false }));
      console.error("Video export error:", err);
    }
  };

  const uploadVideoToApi = useCallback(
    async (file: File): Promise<string | null> => {
      try {
        // Check if the video is already in our session cache
        const existingVideo = state.myVideos.find((v) => v.name === file.name);
        if (existingVideo) {
          console.log("Video found in cache. Skipping upload.");
          return existingVideo.s3Url;
        }

        setState((s) => ({
          ...s,
          isLoading: true,
        }));

        toast("Uploading Video...");

        // 1. Get presigned data from API
        const res = await fetch("/api/upload-video/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: file.name, fileType: file.type }),
        });

        console.log(res);

        const { url, fields, s3FileUrl } = await res.json();

        // 2. Build form data for S3
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          // @ts-expect-error: This line works no need for type check
          formData.append(key, value);
        });
        formData.append("file", file);

        // 3. Upload directly to S3
        const upload = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (!upload.ok) {
          console.log(upload);
          throw new Error("Failed to upload video to S3.");
        }

        console.log("Video uploaded to S3 successfully:", s3FileUrl);
        toast.success("Video uploaded successfully!");

        // After a successful upload, add the video to our local cache
        setState((s) => ({
          ...s,
          myVideos: [...s.myVideos, { name: file.name, s3Url: s3FileUrl }],
        }));

        return s3FileUrl;
      } catch (err: any) {
        const errorMessage =
          err.message || "An unknown error occurred during upload.";
        setState((s) => ({ ...s, error: errorMessage }));
        console.error("Video upload error:", err);
        toast.error("Video uploaded failed!");
        return null;
      } finally {
        setState((s) => ({ ...s, isLoading: false }));
      }
    },
    [state.myVideos]
  );

  return {
    ...state,
    generateAIHook,
    generateCaptions,
    uploadVideoToApi,
    exportVideo,
    reset,
  };
};
