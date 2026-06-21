import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
import "dotenv/config";

const s3 = new S3Client({
  region: "LOCAL",
  endpoint: process.env.OBJECT_STORE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.OBJECT_STORE_ENDPOINT!,
    secretAccessKey: process.env.OBJECT_STORE_ENDPOINT!,
  },
  forcePathStyle: true,
});

export default s3;
