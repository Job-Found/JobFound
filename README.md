# Job Found - Modern Job Portal

A modern job portal built with React, Supabase, and Chakra UI. Features include job listings, advanced filtering, admin dashboard, and beautiful animations.

## Features

- 🎯 Modern and responsive UI with Chakra UI
- 🔒 Secure admin authentication with Supabase
- 🎨 Beautiful animations using Framer Motion
- 🔍 Advanced job filtering and search
- 📱 Fully responsive design
- 🌓 Dark/Light mode support
- 👩‍💼 Admin dashboard for job management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd job-found
```

2. Install dependencies:
```bash
npm install
```

3. Create a Supabase project and set up the following table:

```sql
create table jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text not null,
  type text not null,
  description text not null,
  apply_url text not null,
  posted_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

4. Create a `.env` file in the root directory and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/      # Reusable components
├── contexts/        # Context providers
├── lib/            # Utility functions and configurations
├── pages/          # Page components
└── App.jsx         # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- React 18
- Vite
- Supabase
- Chakra UI
- Framer Motion
- React Router DOM
- React Hook Form
- date-fns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
