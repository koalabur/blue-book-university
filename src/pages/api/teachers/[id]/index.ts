import { NextApiRequest, NextApiResponse } from "next";
import useHttpProtocol from "@/hooks/useHttpProtocol";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { host } = req.headers;

  const url = await fetch(`${useHttpProtocol()}${host}/api/teachers`);
  const data = await url.json();
  const teacher = data.find(
    (teacher: { _id: string | string[] | undefined }) => teacher._id === id
  );

  res.status(200).json(teacher);
};
