import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { ServiceItem } from "@/types";

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: async () => (await api.get<ServiceItem[]>("/services")).data
  });
