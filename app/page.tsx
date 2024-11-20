"use client";

import { useQuery } from "@tanstack/react-query";
import { apiUrls } from "@/lib/api-urls";
import { axiosCall } from "@/lib/axios";

export default function Home() {
  useQuery({
    queryKey: ["d"],
    queryFn: async () => {
      return axiosCall({ method: "GET", urlPath: apiUrls.user });
    },
  });

  return <h1>Hello World</h1>;
}
