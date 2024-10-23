export async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
