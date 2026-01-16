# Convex Solar Solutions

A modern web application for Convex Solar Solutions, demonstrating solar energy services and projects.

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- shadcn/ui components
- Supabase (Backend/Auth)
- Netlify (Deployment)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on configuration (see Environment Helper below)
4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is configured for deployment on Netlify.

### Netlify Environment Variables
Make sure to add the following environment variables in your Netlify Site Settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Local Deployment
To build locally:
```bash
npm run build
npm run preview
```
