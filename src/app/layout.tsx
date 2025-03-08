import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "./components/themeProvider";

export const metadata: Metadata = {
  title: "Currency exchange App",
  description:
    "this app has some cool features like currency conversion, filtering and sorting them.",
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
