import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Student(parent: unknown, args: { id: String }) {
  const objectId = new ObjectId(args.id as string);
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const student = await db.collection("students").findOne({ _id: objectId });

    return student;
  } catch (error) {
    console.error(error);
  }
}
