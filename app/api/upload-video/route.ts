import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

const s3Region = process.env.AWS_REGION;
const s3BucketName = process.env.AWS_BUCKET_NAME;

export async function POST(request: Request) {
  if (!s3Region || !s3BucketName) {
    console.error("AWS_REGION or AWS_BUCKET_NAME is not set.");
    return NextResponse.json(
      { error: "Server misconfiguration. AWS environment variables not set." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const videoFile = formData.get("file") as File;

    if (!videoFile) {
      return NextResponse.json(
        { error: "No video file provided." },
        { status: 400 }
      );
    }

    // Initialize the S3 client
    const client = new S3Client({
      region: s3Region,
    });

    // Generate a unique key for the video file in the S3 bucket
    const uniqueKey = `${nanoid()}-${videoFile.name}`;

    // Create a presigned POST URL. This allows the client to upload the file
    const { url, fields } = await createPresignedPost(client, {
      Bucket: s3BucketName,
      Key: uniqueKey,
      Expires: 600, // URL expires in 10 minutes
      Fields: {
        "Content-Type": videoFile.type,
      },
      Conditions: [
        { "Content-Type": videoFile.type },
        ["content-length-range", 0, 100 * 1024 * 1024], // Max 100MB file size
      ],
    });

    // The S3 URL where the file will be accessible after a successful upload
    const s3FileUrl = `https://${s3BucketName}.s3.${s3Region}.amazonaws.com/${uniqueKey}`;

    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    });
    formDataS3.append("file", formData.get("file") as string);

    const uploadResponse = await fetch(url, {
      method: "POST",
      body: formDataS3,
    });

    const response = await uploadResponse.text();
    console.log(response);

    if (uploadResponse.ok) {
      console.log("File uploaded successfully");
      return NextResponse.json(
        {
          url,
          fields,
          s3FileUrl, // We return this to the client to use in the Remotion render request
        },
        { status: 200 }
      );
    } else {
      console.error("Failed to upload file");
      return NextResponse.json(
        { error: "Failed to create S3 presigned post." },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("Error creating presigned S3 post:", err);
    return NextResponse.json(
      { error: "Failed to create S3 presigned post." },
      { status: 500 }
    );
  }
}
