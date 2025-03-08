import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "./components/themeProvider";

export const metadata: Metadata = {
  title: "Currency exchange App",
  description:
    "this app has some cool features like currency conversion, filtering and sorting them.",
  openGraph: {
    title: "Currency Exchange App",
    description:
      "Easily convert currencies and track live exchange rates with our intuitive app.",
    url: "https://currency-exchange-mzayan.vercel.app/",
    siteName: "Currency Exchange",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
