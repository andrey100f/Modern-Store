import axios from "axios";


const baseUrl = "http://localhost:8081/api/auth";

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${baseUrl}/login`, {email, password});
    localStorage.setItem("token", response.data);
    console.log("Login successful, token stored.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
}
