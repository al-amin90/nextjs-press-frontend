"use server";

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookie = await cookies();
  const accessToken = cookie.get("accessToken")?.value;

  if (!accessToken) {
    // throw new Error("User not Login");

    return {
      success: false,
      message: "User not Login",
    };
  }

  const res = await fetch(
    `https://prisma-press-backend-indol.vercel.app/api/users/me`,
    {
      method: "POST",
      headers: {
        //   Authorization: `${accessToken}`,
        //   Authorization: accessToken as unknown as string,
        Authorization: `Bearer ${accessToken}`,

        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const data = await res.json();

  return data;
};
