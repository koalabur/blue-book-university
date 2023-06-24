import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Test(parent: unknown, args: { id: string }) {
  const testId = new ObjectId(args.id);
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const tests = await db.collection("tests").findOne({ _id: testId });

    return tests;
  } catch (error) {
    console.error(error);
  }
}
