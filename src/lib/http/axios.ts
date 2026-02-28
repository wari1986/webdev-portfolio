import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  timeout: 8_000,
  headers: {
    "Content-Type": "application/json",
  },
});
