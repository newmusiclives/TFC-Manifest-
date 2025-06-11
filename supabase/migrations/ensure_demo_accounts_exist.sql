/*
  # Ensure demo accounts exist

  1. Changes
    - Creates demo accounts in the public.users table if they don't exist
    - Sets the correct user_type for each demo account
  
  2. Security
    - No changes to security policies
*/

-- Ensure demo accounts exist in the public.users table
DO $$
BEGIN
  -- Admin user
  IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@example.com') THEN
    INSERT INTO public.users (
      id,
      email,
      user_type,
      created_at,
      updated_at
    )
    VALUES (
      'demo-admin-id',
      'admin@example.com',
      'admin',
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
      created_at,
      updated_at
    )
    VALUES (
      'demo-musician-id',
      'musician@example.com',
      'musician',
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
      created_at,
      updated_at
    )
    VALUES (
      'demo-fan-id',
      'fan@example.com',
      'fan',
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
      created_at,
      updated_at
    )
    VALUES (
      'demo-venue-id',
      'venue@example.com',
      'venue',
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