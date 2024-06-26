export default async function Teachers(parent: unknown, args: unknown) {
  console.log(parent, args)
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teachers`);
  return await res.json();
}
