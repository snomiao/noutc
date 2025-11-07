import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "No UTC - Convert UTC time to local time",
  description: "Convert UTC timestamps to local time as SVG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
