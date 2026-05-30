import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Doce Amor | Confeitaria Artesanal",
  description: "Confeitaria artesanal especializada em bolos, recheios deliciosos e temas personalizados para sua festa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased text-text-main bg-bg-main">
        {children}
      </body>
    </html>
  );
}
