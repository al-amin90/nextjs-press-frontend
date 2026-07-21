"use server";

import { cookies } from "next/headers";

type LoginState = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export const loginAction = async (
  prevState: LoginState,
  formData: FormData,
) => {
  console.log("prevState", prevState);

  const email = formData.get("email");
  const password = formData.get("password");

  const payload = { email, password };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data: LoginState = await res.json();

  if (data.success) {
    const cookie = await cookies();

    cookie.set("accessToken", data.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookie.set("refreshToken", data.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  return data;
};
