import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Test(parent: unknown, args: { id: String }) {
  const objectId = new ObjectId(args.id as string);
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const test = await db.collection("tests").findOne({ _id: objectId });

    return test;
  } catch (error) {
    console.error(error);
  }
}
