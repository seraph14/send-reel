import { AwsRegion, RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";

import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from "@/config.mjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.REMOTION_AWS_ACCESS_KEY_ID) {
    throw new TypeError(
      "Set up Remotion Lambda to render videos. See the README.md for how to do so."
    );
  }
  if (!process.env.REMOTION_AWS_SECRET_ACCESS_KEY) {
    throw new TypeError(
      "The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file."
    );
  }

  const { inputProps } = await request.json();

  try {
    const { renderId, bucketName } = await renderMediaOnLambda({
      codec: "h264",
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: "MainVideo",
      inputProps: inputProps,
      framesPerLambda: 10,
      downloadBehavior: {
        type: "download",
        fileName: "send-reel-video.mp4",
      },
    });

    return NextResponse.json(
      {
        message: "Rendering Started Successfully!",
        data: {
          renderId,
          bucketName,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: `Failed to render video` },
      { status: 500 }
    );
  }
}
