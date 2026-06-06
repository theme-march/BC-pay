import type { Metadata } from "next";
import { Providers } from "./providers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.scss";

export const metadata: Metadata = {
  title: "MultiTransfer",
  description: "International money transfer frontend demo",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
