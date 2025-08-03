import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";
import {
  FPS,
  VIDEO_WIDTH,
  VIDEO_HEIGHT,
  defaultMainProps,
} from "../lib/constants";
import { AIHook } from "./compositions/AIHook";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        defaultProps={defaultMainProps}
        durationInFrames={FPS * 5} // 5 seconds for the hook
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="AIHook"
        component={AIHook}
        durationInFrames={FPS * 5} // 5 seconds for the hook
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{ aiHookVideoUrl: null }}
      />
    </>
  );
};
