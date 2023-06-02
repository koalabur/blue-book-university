export default async function ClassInfo(
  parent: { classId: string },
  args: unknown
) {
  const classId = parent.classId;
  const classRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/classes`);
  const res = await classRes.json();

  // Compare and filter matching elements
  const matches = res.filter((obj: { _id: string }) =>
    classId.includes(obj._id)
  );
  return matches;
}
