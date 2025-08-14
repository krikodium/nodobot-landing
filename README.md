# NodoBot Studio — Landing/Portfolio (Next.js + Tailwind)

Landing profesional para agencia de **arquitectura, diseño e implementación de bots** con **n8n** y agentes.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Copy y secciones **100% IA**

## Uso
```bash
npm install
npm run dev  # http://localhost:3000
```

## Personalización
- Branding (logo/título): `components/Logo.tsx` y `app/layout.tsx`
- Colores: `tailwind.config.ts` (palette `brand`)
- Contenido: `components/*` y `app/page.tsx`
- Imagen OG: reemplazá `public/og.png`

## Próximos pasos
- Integrar formulario con Formspree/Resend/Zapier.
- Conectar analytics (Vercel/Umami).
- Agregar estudios de caso reales y métricas.
