import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { TransferMethod } from "@/types";

export const useMethods = () =>
  useQuery({
    queryKey: ["methods"],
    queryFn: async () => (await api.get<TransferMethod[]>("/methods")).data
  });
