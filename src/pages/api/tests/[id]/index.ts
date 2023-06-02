import { NextApiRequest, NextApiResponse } from "next";
import useHttpProtocol from "@/hooks/useHttpProtocol";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { host } = req.headers;

  const url = await fetch(`${useHttpProtocol()}${host}/api/tests`);
  const data = await url.json();
  const test = data.find(
    (test: { _id: string | string[] | undefined }) => test._id === id
  );

  res.status(200).json(test);
};
