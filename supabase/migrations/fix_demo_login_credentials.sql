/*
  # Fix demo login credentials

  1. Changes
    - Ensures demo accounts exist in auth.users table with correct password
    - Sets email_confirmed_at to ensure accounts are active
    - Uses consistent password 'pass123' for all demo accounts
  
  2. Security
    - No changes to security policies
*/

-- Create or update demo accounts with correct credentials
DO $$
BEGIN
  -- Admin user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    -- Update existing admin user password
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE email = 'admin@example.com';
  ELSE
    -- Create admin user
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@example.com',
      crypt('pass123', gen_salt('bf')),
      now(),
      now(),
      now(),
      ''
    );
  END IF;
  
  -- Musician user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'musician@example.com') THEN
    -- Update existing musician user password
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE email = 'musician@example.com';
  ELSE
    -- Create musician user
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'musician@example.com',
      crypt('pass123', gen_salt('bf')),
      now(),
      now(),
      now(),
      ''
    );
  END IF;
  
  -- Fan user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'fan@example.com') THEN
    -- Update existing fan user password
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE email = 'fan@example.com';
  ELSE
    -- Create fan user
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'fan@example.com',
      crypt('pass123', gen_salt('bf')),
      now(),
      now(),
      now(),
      ''
    );
  END IF;
  
  -- Venue user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'venue@example.com') THEN
    -- Update existing venue user password
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = COALESCE(email_confirmed_at, now())
    WHERE email = 'venue@example.com';
  ELSE
    -- Create venue user
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      confirmation_token
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'venue@example.com',
      crypt('pass123', gen_salt('bf')),
      now(),
      now(),
      now(),
      ''
    );
  END IF;
  
  -- Ensure user_type is set in public.users table if it exists
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
    -- Check if user_type column exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'user_type') THEN
      -- Admin user in public.users
      IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
        IF EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@example.com') THEN
          UPDATE public.users SET user_type = 'admin' WHERE email = 'admin@example.com';
        ELSE
          INSERT INTO public.users (id, email, user_type, created_at)
          SELECT id, email, 'admin', now()
          FROM auth.users
          WHERE email = 'admin@example.com'
          LIMIT 1;
        END IF;
      END IF;
      
      -- Musician user in public.users
      IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'musician@example.com') THEN
        IF EXISTS (SELECT 1 FROM public.users WHERE email = 'musician@example.com') THEN
          UPDATE public.users SET user_type = 'musician' WHERE email = 'musician@example.com';
        ELSE
          INSERT INTO public.users (id, email, user_type, created_at)
          SELECT id, email, 'musician', now()
          FROM auth.users
          WHERE email = 'musician@example.com'
          LIMIT 1;
        END IF;
      END IF;
      
      -- Fan user in public.users
      IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'fan@example.com') THEN
        IF EXISTS (SELECT 1 FROM public.users WHERE email = 'fan@example.com') THEN
          UPDATE public.users SET user_type = 'fan' WHERE email = 'fan@example.com';
        ELSE
          INSERT INTO public.users (id, email, user_type, created_at)
          SELECT id, email, 'fan', now()
          FROM auth.users
          WHERE email = 'fan@example.com'
          LIMIT 1;
        END IF;
      END IF;
      
      -- Venue user in public.users
      IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'venue@example.com') THEN
        IF EXISTS (SELECT 1 FROM public.users WHERE email = 'venue@example.com') THEN
          UPDATE public.users SET user_type = 'venue' WHERE email = 'venue@example.com';
        ELSE
          INSERT INTO public.users (id, email, user_type, created_at)
          SELECT id, email, 'venue', now()
          FROM auth.users
          WHERE email = 'venue@example.com'
          LIMIT 1;
        END IF;
      END IF;
    END IF;
  END IF;
END $$;
