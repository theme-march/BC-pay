import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { Country } from "@/types";

export const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: async () => (await api.get<Country[]>("/countries")).data
  });
