export default async function Class(
  parent: { classes: { classId: String }[]; _id: String },
  args: unknown
) {
  const classIds = parent.classes.map((c) => c.classId);
  const testsRes = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tests`);
  const tests = await testsRes.json();
  // Compare and filter matching elements
  const matches = tests.filter((obj: { classId: String }) =>
    classIds.includes(obj.classId)
  );
  return matches;
}
