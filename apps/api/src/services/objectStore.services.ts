import s3 from "@/lib/object.store.js";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type PresignerParams =
  | {
      action: "upload";
      bucket: string;
      key: string;
      contentType: string;
    }
  | {
      action: "retrieve";
      bucket: string;
      key: string;
    };

export const presignURL = async (
  presignerParams: PresignerParams,
): Promise<string | undefined> => {
  if (presignerParams.action === "upload") {
    const cmd = new PutObjectCommand({
      Bucket: presignerParams.bucket,
      Key: presignerParams.key,
      ContentType: presignerParams.contentType,
    });

    return await getSignedUrl(s3, cmd, {
      expiresIn: 900,
    });
  }

  if (presignerParams.action === "retrieve") {
    const cmd = new GetObjectCommand({
      Bucket: presignerParams.bucket,
      Key: presignerParams.key,
    });

    return await getSignedUrl(s3, cmd, {
      expiresIn: 900,
    });
  }
};
