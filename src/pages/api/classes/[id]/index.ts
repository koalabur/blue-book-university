import { NextApiRequest, NextApiResponse } from "next";
import useHttpProtocol from "@/hooks/useHttpProtocol";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { host } = req.headers;

  const url = await fetch(`${useHttpProtocol()}${host}/api/classes`);
  const data = await url.json();
  const classId = data.find(
    (classId: { _id: string | string[] | undefined }) => classId._id === id
  );

  res.status(200).json(classId);
};
