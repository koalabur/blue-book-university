export default async function Tests(parent: { _id: string }, args: unknown) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tests`);
  const data = await res.json();
  const matchingTests = data.filter(
    (allTests: { classId: string }) => allTests.classId === parent._id
  );
  return await matchingTests;
}
