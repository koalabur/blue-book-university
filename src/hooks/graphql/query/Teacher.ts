export default async function Teacher(parent: unknown, args: { id: String }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teachers/${args.id}`);
  return await res.json();
}
