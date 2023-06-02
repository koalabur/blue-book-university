import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const students = await db
      .collection("classes")
      .find({})
      .limit(20)
      .toArray();

    res.json(students);
  } catch (error) {
    console.error(error);
  }
};
