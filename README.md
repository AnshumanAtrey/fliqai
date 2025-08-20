_ Installation Steps Followed :
atrey@Anshumans-MacBook-Air fliqai % npx create-next-app@latest . --typescript --eslint      
Need to install the following packages:
create-next-app@15.5.0
Ok to proceed? (y) y

✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like your code inside a `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to use Turbopack? (recommended) … No / Yes
✔ Would you like to customize the import alias (`@/*` by default)? … No / Yes
✔ What import alias would you like configured? … @/*
Creating a new Next.js app in /Users/atrey/Desktop/code/fliqai.

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- react
- react-dom
- next

Installing devDependencies:
- typescript
- @types/node
- @types/react
- @types/react-dom
- @tailwindcss/postcss
- tailwindcss
- eslint
- eslint-config-next
- @eslint/eslintrc


added 336 packages, and audited 337 packages in 57s

137 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
Success! Created fliqai at /Users/atrey/Desktop/code/fliqai

atrey@Anshumans-MacBook-Air fliqai % npm install tailwindcss @tailwindcss/postcss postcss

up to date, audited 337 packages in 1s

137 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
atrey@Anshumans-MacBook-Air fliqai % 



Tailwind theme setup and layout setup :

font used is a free google font called Outfit. Paragraph text have a 18px size, with 150% line height. 

headings have three hierarchies - h1 at 48px, h2 at 32px, and h3 at 24px, all bold. Size can be viewed through clicking layer on the figma design file

almost all spacing and padding values use increments of 8px - so 8px, 16px, 24px and so on. 

hex codes of all colors listed to the right

all icons used are from the phosphor icon set, which is free and open source. Available at https://phosphoricons.com/

The border and shadow effect on boxes and cards is implementable via CSS. Add a stroke of 1px, and a drop shadow of x=4, and y=4, with blur set to 0. Set color to #000 at 100% opacity 

Badges and the likes can be exported through figma. Select the layer, click export and select 2x. Export as png or svg depending on if they are vector or raster (im happy to email assets as well if it would be easier)

Light Theme Colors
#FFFBF1 - Light Theme Background Color
#FFFFFF - Secondary BG Color
#FF9269- Accent Color  (Both themes)
#5D5237 - Paragraph text color for light theme (Not headings)
Dark Theme Colors
#0F0D0E - Background Color
#231F20 - Secondary background color for UI Cards 
#353132 - Tertiary background color
#FFFBF1 - Use for text and strokes

