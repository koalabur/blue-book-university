import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../lib/mongo";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query; // Get the ID from the query parameters
    const objectId = new ObjectId(id as string);

    const client = await clientPromise;
    const db = client.db("learning_portal");

    const student = await db.collection("students").findOne({ _id: objectId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
