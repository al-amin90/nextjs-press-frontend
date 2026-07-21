"use server";

export const loginAction = async (formData: FormData) => {
  console.log("formData", formData);

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
  const data = await res.json();

  console.log("data", data);
};
