import { NextApiRequest, NextApiResponse } from "next";
import useHttpProtocol from "@/hooks/useHttpProtocol";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const { host } = req.headers;

  const url = await fetch(`${useHttpProtocol()}${host}/api/classes/${id}`);
  const data = await url.json();
  const className = data.class;

  res.status(200).json(className);
};
