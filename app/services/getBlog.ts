import { cacheLife, revalidateTag } from "next/cache";

export const getBlogs = async () => {
  //  data base communitaciton (prism) use korle cache component|functional cache
  // "use cache";
  // cacheLife("hours");
  // cacheTag("posts");

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["posts"],
    },
  });
  const data = await res.json();
  return data;
};

export const renewGetBlogs = async () => {
  revalidateTag("posts", "max"); // revalidate time porjonto cacje thakbe
  revalidateTag("posts", {
    expire: 60 * 60 * 60 * 24 * 7, // ami custovabe revalidate time bole dite pari
  });
};
