import { Storage } from "@google-cloud/storage";

export const handler = async (req: any, res: any) => {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });

  const bucketName = "dev-groupmanager";
  const bucket = storage.bucket(bucketName);
  const file = bucket.file("IconImage/" + req.query.file);
  const options = {
    expires: Date.now() + 1 * 60 * 1000,
    fields: { "x-goog-meta-test": "data" },
  };
  const [response] = await file.generateSignedPostPolicyV4(options);
  res.status(200).json(response);
};
