import type { Metadata } from "next";
import "./globals.css";
import { QueryClientWrapper } from "@/provider/query-client.provider";

export const metadata: Metadata = {
  title: "Proofed Task",
  description: "Proofed Order Management Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
         <QueryClientWrapper>
          {children}
         </QueryClientWrapper>
      </body>
    </html>
  );
}
