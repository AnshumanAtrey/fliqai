# FliqAI - College Recommendation AI

FliqAI is a modern Next.js app that helps students get personalized college roadmaps after AI analysis of their profile and college data, increasing their chances of admission.

## 📁 Project Structure (Simple Overview)

- **/src/app/**
  - Contains all your main pages (e.g. `/about`, `/features`, `/pricing`, etc.)
  - Each page is a folder with a `page.tsx` file for its content.
  - The `layout.tsx` file is the root layout for all pages (adds Navbar, global styles, etc.).

- **/src/sections/**
  - All reusable UI sections/components (Hero, Features, Footer, etc.) go here.
  - You can import any section into any page for easy reuse.
  - To add a new section, just make a new file in this folder and import it where needed.

- **/src/components/**
  - (Optional) For small, reusable UI elements (buttons, cards, etc.)

- **/src/app/globals.css**
  - Global styles for the whole app (colors, fonts, resets, etc.).
  - You can add custom CSS here if needed.

## 🧑‍💻 How to Work With This Project

- **Add/Edit Pages:**
  - Create a new folder in `/src/app/` (e.g. `/src/app/new-page/`) and add a `page.tsx` file.
  - Import any section from `/src/sections/` to build your page.

- **Add/Edit Sections:**
  - Make a new file in `/src/sections/` (e.g. `NewSection.tsx`).
  - Export your React component and import it into any page.
  - This keeps your code clean and reusable!

- **Global Layout:**
  - The `layout.tsx` in `/src/app/` wraps all pages (adds Navbar, etc.).
  - Navbar is always visible on every page.

- **Styling:**
  - Uses Tailwind CSS for fast, utility-first styling.
  - Add custom styles in `globals.css` if needed.

## 💡 Best Practices

- **Icons:**
  - Use [Heroicons](https://heroicons.com/) (built into Tailwind) for simple icons.
  - For animated icons, use [Lordicon](https://lordicon.com/).
- **Sections:**
  - Always put big, reusable UI blocks in `/src/sections/`.
  - This makes it easy for any developer to build or update pages by mixing and matching sections.

## 🚀 Why This Structure?
- Super easy for any developer to understand and extend.
- No hard work needed to add new pages or sections—just copy, paste, and import!
- Keeps code organized, clean, and scalable for future features.

---

**FliqAI** is a college recommendation system for students, providing personalized roadmaps and increasing their chances of getting into their dream college through AI analysis of student and college profiles.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Built by [atrey.dev](https://atrey.dev)**
