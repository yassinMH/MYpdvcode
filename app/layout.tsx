import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My PDV - Étiquettes électroniques et aménagement de magasin",
  description:
    "Votre partenaire pour des magasins connectés et performants. Spécialiste en étiquettes électroniques, aménagement de magasin et solutions sur-mesure avec plus de 1200 magasins équipés.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "shortcut icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
  ],
  verification: {
    google: "google3ae5d960d6a06943",
  },
  openGraph: {
    title: "My PDV - Étiquettes électroniques et aménagement de magasin",
    description:
      "Votre partenaire pour des magasins connectés et performants. Plus de 1200 magasins équipés, 13M+ étiquettes installées, 15 ans d'expérience.",
    url: "https://my-pdv.com", // Remplacez par votre vraie URL
    siteName: "My PDV",
    images: [
      {
        url: "/images/mission_6.jpg",
        width: 1200,
        height: 630,
        alt: "My PDV - Installation d'étiquettes électroniques en magasin",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My PDV - Étiquettes électroniques et aménagement de magasin",
    description: "Votre partenaire pour des magasins connectés et performants. Plus de 1200 magasins équipés.",
    images: ["/images/mission_1.jpg"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="google3ae5d960d6a06943" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
