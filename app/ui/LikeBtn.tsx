"use client";

const LikeBtn = () => {
  return (
    <div
      onClick={() => {
        console.log("btn cliked");
      }}
    >
      Like Button
    </div>
  );
};

export default LikeBtn;
