"use client";
import axios from "axios";
import { getToken } from "next-auth/jwt";

export default function useAxiosSecure() {
  const instance = axios.create({ baseURL: "/api" });

  instance.interceptors.request.use(async (config) => {
    const token = await getToken({ secret: process.env.NEXTAUTH_SECRET });

    if (token?.id) {
      config.headers.Authorization = `Bearer ${token.id}`;
    }

    return config;
  });

  return instance;
}
