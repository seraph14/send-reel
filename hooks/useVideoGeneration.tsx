import { useCallback, useEffect, useState } from "react";
import { CaptionWord, MyVideo } from "@/lib/types";

interface VideoGenerationState {
  aiHookVideoUrl: string | null;
  captions: CaptionWord[];
  isLoading: boolean;
  error: string | null;
  downloadLink: string | null;
  myVideos: MyVideo[];
}

interface VideoGenerationActions {
  generateAIHook: (hookId: string) => Promise<void>;
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

  const generateAIHook = async (hookId: string) => {
    setState((s) => ({
      ...s,
      isLoading: true,
      error: null,
      downloadLink: null,
    }));
    try {
      console.log("Initiating AI hook generation...");
      const response = await fetch("/api/generate-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hookId }),
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
    } catch (err: any) {
      setState((s) => ({ ...s, error: err.message, isLoading: false }));
      console.error("AI hook generation error:", err);
    }
  };

  const generateCaptions = async (userVideoUrl: string) => {
    setState((s) => ({
      ...s,
      isLoading: true,
      error: null,
      downloadLink: null,
    }));

    if (!userVideoUrl) {
      setState((s) => ({
        ...s,
        error: "Please upload a video first to generate captions.",
        isLoading: false,
      }));
      return;
    }

    try {
      console.log("Initiating caption generation...");
      const response = await fetch("/api/generate-captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userVideoUrl }),
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
      }));
      console.log("Captions generated:", data.text);
    } catch (err: any) {
      setState((s) => ({ ...s, error: err.message, isLoading: false }));
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

        console.log("Initiating video upload to S3 via API route...");
        setState((s) => ({
          ...s,
          isLoading: true,
          error: "Uploading video to S3...",
        }));

        const formData = new FormData();
        formData.append("file", file);

        // Call our API route which handles the S3 upload
        const uploadResponse = await fetch("/api/upload-video", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.error || "Failed to upload video to S3.");
        }

        const { s3FileUrl } = await uploadResponse.json();
        console.log("Video uploaded to S3 successfully:", s3FileUrl);

        // After a successful upload, add the video to our local cache
        const objectUrl = URL.createObjectURL(file);
        setState((s) => ({
          ...s,
          myVideos: [
            ...s.myVideos,
            { name: file.name, s3Url: s3FileUrl, previewUrl: objectUrl },
          ],
          error: null, // Clear the upload message
        }));

        return s3FileUrl;
      } catch (err: any) {
        const errorMessage =
          err.message || "An unknown error occurred during upload.";
        setState((s) => ({ ...s, error: errorMessage }));
        console.error("Video upload error:", err);
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
