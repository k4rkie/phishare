import { S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: process.env.OBJECT_STORE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.OBJECT_STORE_ACCESS_KEY!,
    secretAccessKey: process.env.OBJECT_STORE_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export default s3;
