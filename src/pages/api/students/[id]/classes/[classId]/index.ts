import { NextApiRequest, NextApiResponse } from "next";
import useHttpProtocol from "@/hooks/useHttpProtocol";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, classId } = req.query;
  const { host } = req.headers;

  const url = await fetch(`${useHttpProtocol()}${host}/api/tests/${classId}`);
  const data = await url.json();
  const test = data.find(
    (test: { _id: string | string[] | undefined }) => test._id === classId
  );

  res.status(200).json(test);
};
