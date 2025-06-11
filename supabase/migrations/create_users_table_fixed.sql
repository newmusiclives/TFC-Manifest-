/*
  # Create users table and ensure demo accounts exist

  1. New Tables
    - `users`
      - `id` (text, primary key)
      - `email` (text, unique)
      - `user_type` (text, either 'musician', 'fan', 'venue', or 'admin')
      - `name` (text, optional)
      - `profile_photo` (text, optional)
      - `bio` (text, optional)
      - `location` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `account_status` (text, default 'active')
  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
    - Add policy for authenticated users to update their own data
    - Add policy for public to read user profiles
  3. Data
    - Creates demo accounts for admin, musician, venue, and fan roles
*/

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id text PRIMARY KEY,
  email text UNIQUE NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('musician', 'fan', 'venue', 'admin')),
  name text,
  profile_photo text,
  bio text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  account_status text NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended'))
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid errors
DO $$
BEGIN
  -- Drop policies if they exist
  BEGIN
    DROP POLICY IF EXISTS "Users can read own data" ON public.users;
  EXCEPTION WHEN OTHERS THEN
    -- Policy doesn't exist, continue
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Users can update own data" ON public.users;
  EXCEPTION WHEN OTHERS THEN
    -- Policy doesn't exist, continue
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Users can insert own data" ON public.users;
  EXCEPTION WHEN OTHERS THEN
    -- Policy doesn't exist, continue
  END;
  
  BEGIN
    DROP POLICY IF EXISTS "Public can read user profiles" ON public.users;
  EXCEPTION WHEN OTHERS THEN
    -- Policy doesn't exist, continue
  END;
END $$;

-- Create policies with type casting for auth.uid()
CREATE POLICY "Users can read own data"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can update own data"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id);

CREATE POLICY "Users can insert own data"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = id);

CREATE POLICY "Public can read user profiles"
  ON public.users
  FOR SELECT
  TO anon
  USING (account_status = 'active');

-- Insert demo accounts
DO $$
BEGIN
  -- Admin user
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@example.com') THEN
    INSERT INTO public.users (
      id,
      email,
      user_type,
      name,
      created_at,
      updated_at
    )
    VALUES (
      'demo-admin-id',
      'admin@example.com',
      'admin',
      'Admin User',
      now(),
      now()
    );
  ELSE
    -- Update existing admin user
    UPDATE public.users 
    SET user_type = 'admin',
        updated_at = now()
    WHERE email = 'admin@example.com';
  END IF;
  
  -- Musician user
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'musician@example.com') THEN
    INSERT INTO public.users (
      id,
      email,
      user_type,
      name,
      created_at,
      updated_at
    )
    VALUES (
      'demo-musician-id',
      'musician@example.com',
      'musician',
      'Musician User',
      now(),
      now()
    );
  ELSE
    -- Update existing musician user
    UPDATE public.users 
    SET user_type = 'musician',
        updated_at = now()
    WHERE email = 'musician@example.com';
  END IF;
  
  -- Fan user
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'fan@example.com') THEN
    INSERT INTO public.users (
      id,
      email,
      user_type,
      name,
      created_at,
      updated_at
    )
    VALUES (
      'demo-fan-id',
      'fan@example.com',
      'fan',
      'Fan User',
      now(),
      now()
    );
  ELSE
    -- Update existing fan user
    UPDATE public.users 
    SET user_type = 'fan',
        updated_at = now()
    WHERE email = 'fan@example.com';
  END IF;
  
  -- Venue user
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'venue@example.com') THEN
    INSERT INTO public.users (
      id,
      email,
      user_type,
      name,
      created_at,
      updated_at
    )
    VALUES (
      'demo-venue-id',
      'venue@example.com',
      'venue',
      'Venue User',
      now(),
      now()
    );
  ELSE
    -- Update existing venue user
    UPDATE public.users 
    SET user_type = 'venue',
        updated_at = now()
    WHERE email = 'venue@example.com';
  END IF;
END $$;