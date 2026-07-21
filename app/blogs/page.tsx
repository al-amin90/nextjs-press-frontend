/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { getBlogs } from "../services/getBlog";
import { cacheLife, cacheTag } from "next/cache";

const BlogPage = async () => {
  //   "use cache";
  //   cacheLife("hours");
  //   cacheTag("posts");

  const blogData = await getBlogs();

  console.log("blogData", blogData);
  return (
    <div>
      {blogData.map((b: any) => (
        <div key={b.id}>
          <p>{b.title}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
