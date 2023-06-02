export default async function Student(parent: unknown, args: { id: String }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students/${args.id}`);
  return await res.json();
}
