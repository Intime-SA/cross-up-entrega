export async function getProducts() {
  const res = await fetch("https://api.npoint.io/a69824ca4c40ac8e783d");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
