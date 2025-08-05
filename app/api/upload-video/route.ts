import { NextResponse } from "next/server";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { nanoid } from "nanoid";

const s3Region = process.env.AWS_REGION!;
const s3BucketName = process.env.AWS_BUCKET_NAME!;

export async function POST(request: Request) {
  try {
    const { fileType, fileName } = await request.json();

    const uniqueKey = `${nanoid()}-${fileName}`;

    const client = new S3Client({ region: s3Region });

    const { url, fields } = await createPresignedPost(client, {
      Bucket: s3BucketName,
      Key: uniqueKey,
      Expires: 600,
      Fields: {
        "Content-Type": fileType,
      },
      Conditions: [
        { "Content-Type": fileType },
        ["content-length-range", 0, 100 * 1024 * 1024], // Max 100MB
      ],
    });

    return NextResponse.json({
      url,
      fields,
      s3FileUrl: `https://${s3BucketName}.s3.${s3Region}.amazonaws.com/${uniqueKey}`,
    });
  } catch (err) {
    console.error("Error creating presigned S3 post:", err);
    return NextResponse.json(
      { error: "Failed to create presigned post" },
      { status: 500 }
    );
  }
}
