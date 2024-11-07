import type { Metadata } from "next";
import "./globals.css";
import { QueryClientWrapper } from "@/provider/query-client.provider";
import { Suspense } from "react";
import Loading from "./loading";

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
        <Suspense fallback={<Loading />}>
         <QueryClientWrapper>
          {children}
         </QueryClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
