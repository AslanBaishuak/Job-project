import { BASE_URL } from "./api";

export const registerUser = async (name,email,password,select) => {
  try {
    const response = await fetch(BASE_URL+"/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(
            { name, email, password, role: select }
        ),
    });
    if (!response.ok) {
        throw new Error(response.json().message  || "Registration failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};