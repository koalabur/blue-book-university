import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongo";

export default async function CreatedBy(
  parent: { createdBy: ObjectId },
  args: unknown
) {
  const teacherId = parent.createdBy;
  try {
    const client = await clientPromise;
    const db = client.db("learning_portal");

    const classes = await db
      .collection("classes")
      .find({ _id: teacherId })
      .limit(100)
      .toArray();

    return classes;
  } catch (error) {
    console.error(error);
  }
}
