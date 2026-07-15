import React from "react";

const BlogPage = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const res = await data.json();
  console.log("res", res);
  return <div>Pafw</div>;
};

export default BlogPage;
