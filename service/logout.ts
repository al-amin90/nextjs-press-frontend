"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookie = await cookies();

  cookie.delete("accessToken");
  cookie.delete("refreshToken");

  revalidateTag("my-profile", "max");
};
