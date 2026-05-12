# Portfolio — Next.js Refactor

Modern portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and animations powered by **Framer Motion** and **GSAP**.

## 🚀 Project Structure

```
portfolio-refactored/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with SEO metadata
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global Tailwind + custom styles
├── components/
│   ├── pages/                   # Page-specific components
│   ├── layouts/                 # Layout wrappers
│   ├── molecules/               # Reusable component groups
│   └── ui/                      # Atomic UI components
├── styles/                      # Component-scoped stylesheets
├── public/                      # Static assets (images, fonts, etc.)
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS v4 configuration
└── postcss.config.js           # PostCSS configuration
```

## 📦 Installed Dependencies

- **Next.js 16** — React framework with SSR, SSG, and ISR
- **React 19** — Modern UI library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS v4** — Utility-first CSS framework
- **Framer Motion** — Animation library
- **GSAP** — Advanced animation library

## 🎯 Features Built-In

✅ Server-Side Rendering (SSR) for SEO
✅ TypeScript for type safety
✅ Tailwind CSS with custom theme
✅ Accessibility (a11y) support
✅ Dark mode ready (`data-theme="light"|"dark"`)
✅ Font loading (Inter Tight, Instrument Serif, JetBrains Mono)
✅ ESLint configuration

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Next Steps

1. **Migrate components** from `/Portfolio/components/` to `/components/`
2. **Create pages** in `/app/` for: home, work, about, etc.
3. **Add animations** using Framer Motion or GSAP
4. **Optimize images** and add alt text for accessibility
5. **Set up SEO** with proper metadata in each page
6. **Configure environment variables** if needed (`.env.local`)

## 🎨 Styling

- Use **Tailwind CSS** for utility-based styling
- Create component-scoped styles in `/styles/` for complex styling
- Use `data-theme` attribute for dark mode switching

## ♿ Accessibility

All components should include:
- Proper semantic HTML (`<button>`, `<a>`, etc.)
- Alt text for all images
- ARIA labels where necessary
- Focus styles (already included in globals.css)
- Color contrast ratios ≥ 4.5:1

## 📊 SEO

- Metadata is defined in `layout.tsx` and individual page files
- Use Next.js `Metadata` type for type-safe SEO
- Include Open Graph tags for social sharing
- Generate sitemap and robots.txt for crawlers

---

**Status**: ✅ Next.js initialized and ready for component migration
