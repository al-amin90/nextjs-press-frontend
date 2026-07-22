"use server";

import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookie = await cookies();
  const refreshToken = cookie.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      message: "refreshToken Token not Found",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();

  return data;
};
