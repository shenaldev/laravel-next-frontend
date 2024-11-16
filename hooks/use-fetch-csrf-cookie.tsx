"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosCall } from "@/lib/axios";

export default function useFetchCsrfCookie() {
  useQuery({
    queryKey: ["csrf-cookie"],
    queryFn: async () => {
      return await axiosCall({
        method: "GET",
        urlPath: "/sanctum/csrf-cookie",
        isBase: true,
      });
    },
    refetchInterval: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
}
