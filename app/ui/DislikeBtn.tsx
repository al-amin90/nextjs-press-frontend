"use client";

const DislikeBtn = ({ slug }: { slug: string }) => {
  return (
    <button
      onClick={() => {
        console.log("Dislike btn clik", slug);
      }}
    >
      slug me : {slug}
    </button>
  );
};

export default DislikeBtn;
