export default async function Test(parent: unknown, args: { id: string }) {
  const testId = args.id;
  const testRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tests`);
  const res = await testRes.json();

  // Compare and filter matching elements
  const singleTest = res.find((obj: { _id: string }) =>
    testId.includes(obj._id)
  );
  return singleTest;
}
