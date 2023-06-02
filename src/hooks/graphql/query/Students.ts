export default async function Students(parent: unknown, args: unknown) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`);
  return await res.json();
}
