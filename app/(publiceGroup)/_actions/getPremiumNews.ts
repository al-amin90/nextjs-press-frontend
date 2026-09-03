export const getPremiumNews = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/premium`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 6,
      tags: ["premium-post"],
    },
  });

  const result = await res.json();
  return result;
};
