import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { FaqItem } from "@/types";

export const useFaq = () =>
  useQuery({
    queryKey: ["faq"],
    queryFn: async () => (await api.get<FaqItem[]>("/faq")).data
  });
