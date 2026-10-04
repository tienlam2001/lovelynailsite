import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://nailslovely.com";
const siteDescription =
  "Lovely Nail & Spa is a Winter Garden, FL nail salon offering pedicures, acrylic nails, Gel-X, dipping powder, manicures, polish changes, waxing, nail design, and online booking near Daniels Rd.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lovely Nail & Spa | Nail Salon in Winter Garden, FL",
    template: "%s | Lovely Nail & Spa Winter Garden",
  },
  description: siteDescription,
  applicationName: "Lovely Nail & Spa",
  authors: [{ name: "Lovely Nail & Spa" }],
  creator: "Lovely Nail & Spa",
  publisher: "Lovely Nail & Spa",
  category: "Nail Salon",
  keywords: [
    "Lovely Nail & Spa",
    "Lovely Nail Spa Winter Garden",
    "nail salon Winter Garden FL",
    "nails Winter Garden",
    "pedicure Winter Garden",
    "manicure Winter Garden",
    "acrylic nails Winter Garden",
    "Gel-X Winter Garden",
    "dipping powder Winter Garden",
    "nail art Winter Garden",
    "waxing Winter Garden FL",
    "nail salon near Winter Garden Village",
    "nail salon near Horizon West",
    "nail salon near Windermere",
    "3317 Daniels Rd nail salon",
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/apple-touch-icon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Lovely Nail & Spa",
    title: "Lovely Nail & Spa | Nail Salon in Winter Garden, FL",
    description: siteDescription,
    images: [
      {
        url: "/ln-mark.jpg",
        width: 1024,
        height: 1024,
        alt: "Lovely Nail & Spa logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lovely Nail & Spa | Nail Salon in Winter Garden, FL",
    description: siteDescription,
    images: ["/ln-mark.jpg"],
  },
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
