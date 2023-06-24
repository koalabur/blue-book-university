import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function Class(
  parent: { classes: { classId: ObjectId }[] },
  args: unknown
) {
  const classIds = parent.classes.map((c) => c.classId);
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const tests = await db
      .collection("tests")
      .find({ classId: { $in: classIds } })
      .limit(100)
      .toArray();

    return tests;
  } catch (error) {
    console.error(error);
  }
}
