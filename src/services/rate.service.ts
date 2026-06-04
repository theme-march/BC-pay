import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { Rate } from "@/types";

export const useRates = () =>
  useQuery({
    queryKey: ["rates"],
    queryFn: async () => (await api.get<Rate[]>("/rates")).data
  });
