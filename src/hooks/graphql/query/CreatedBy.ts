export default async function CreatedBy(
  parent: { createdBy: string },
  args: unknown
) {
  const teacherId = parent.createdBy;
  const teachersRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teachers`);
  const teachers = await teachersRes.json();

  // Compare and filter matching elements
  const matches = teachers.filter((obj: { _id: string }) =>
    teacherId.includes(obj._id)
  );
  return matches;
}
