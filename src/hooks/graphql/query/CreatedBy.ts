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

    const teachers = await db
      .collection("teachers")
      .find({ _id: teacherId })
      .limit(100)
      .toArray();

    return teachers;
  } catch (error) {
    console.error(error);
  }
}
