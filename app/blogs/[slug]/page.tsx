import DislikeBtn from "@/app/ui/DislikeBtn";
import React from "react";

const SignleBlogPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      Pages: {slug}
      <DislikeBtn slug={slug} />
    </div>
  );
};

export default SignleBlogPage;
