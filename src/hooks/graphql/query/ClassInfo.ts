import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function ClassInfo(
  parent: { classId: ObjectId },
  args: unknown
) {
  const classId = parent.classId;
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const classes = await db
      .collection("classes")
      .find({ _id: classId })
      .limit(100)
      .toArray();

    return classes;
  } catch (error) {
    console.error(error);
  }
}
