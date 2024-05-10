export default async function Tests() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tests`);
  return await res.json();
}
