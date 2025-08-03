import {
  speculateFunctionName,
  AwsRegion,
  getRenderProgress,
} from "@remotion/lambda/client";

import { DISK, RAM, REGION, TIMEOUT } from "@/config.mjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const renderProgress = await getRenderProgress({
      bucketName: body.bucketName,
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      renderId: body.id,
    });

    if (renderProgress.fatalErrorEncountered) {
      return NextResponse.json(
        {
          type: "error",
          message: renderProgress.errors[0].message,
        },
        { status: 500 }
      );
    }

    if (renderProgress.done) {
      return NextResponse.json(
        {
          type: "done",
          url: renderProgress.outputFile as string,
          size: renderProgress.outputSizeInBytes as number,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        type: "progress",
        progress: Math.max(0.03, renderProgress.overallProgress),
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        type: "error",
        message: error,
      },
      { status: 500 }
    );
  }
}
