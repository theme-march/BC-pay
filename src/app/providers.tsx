"use client";

import { PropsWithChildren, useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppTheme, globalStylesConfig } from "@/theme/theme";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeModeProvider, useThemeMode } from "@/theme/ThemeModeContext";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeModeProvider>
          <ThemedApp>{children}</ThemedApp>
        </ThemeModeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}

function ThemedApp({ children }: PropsWithChildren) {
  const { mode } = useThemeMode();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStylesConfig} />
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
