import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const tests = await db
      .collection("tests")
      .find({})
      .limit(20)
      .toArray();

    res.json(tests);
  } catch (error) {
    console.error(error);
  }
};
