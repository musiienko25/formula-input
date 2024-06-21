import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
