import { BASE_URL } from "./api";

export async function loginUser(email, password) {
  const response = await fetch(BASE_URL+"/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        email,
        password,
    }),
  });
    if (!response.ok) {
    throw new Error("Login failed");
    }
    return response.json();
}