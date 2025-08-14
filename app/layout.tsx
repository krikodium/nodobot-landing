import "./globals.css";
import type { Metadata } from "next";

// TIP: definí NEXT_PUBLIC_SITE_URL en tu .env (ej: https://tudominio.com)
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // ✅ clave para resolver OG/Twitter images
  title: "NodoBot Studio — Arquitectura, diseño e implementación de bots",
  description:
    "Agencia especializada en agentes y automatizaciones: diseño conversacional, orquestación con n8n y despliegue en canales como WhatsApp, Web y Apps.",
  openGraph: {
    title: "NodoBot Studio",
    description: "Bots y agentes de punta a punta.",
    url: siteUrl,
    siteName: "NodoBot Studio",
    images: ["/og.png"], // se vuelve absoluta con metadataBase
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NodoBot Studio",
    description: "Bots y agentes de punta a punta.",
    images: ["/og.png"], // se vuelve absoluta con metadataBase
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

const setInitialTheme = `
(function() {
  try {
    const key = 'theme';
    const stored = localStorage.getItem(key);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (_) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
