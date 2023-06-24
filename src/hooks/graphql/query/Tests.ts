// import { ObjectId } from "mongodb";
// import clientPromise from "../../../lib/mongo";

// export default async function Test(parent: { _id: ObjectId }, args: unknown) {
//   const testId = parent._id;
//   try {
//     const client = await clientPromise;
//     const db = client.db("learning_portal");

//     const classes = await db
//       .collection("tests")
//       .find({ _id: testId })
//       .limit(100)
//       .toArray();

//     return classes;
//   } catch (error) {
//     console.error(error);
//   }
// }

export default async function Tests(parent: { _id: string }, args: unknown) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tests`);
  const data = await res.json();
  const matchingTests = data.filter(
    (allTests: { classId: string }) => allTests.classId === parent._id
  );
  return await matchingTests;
}
