/*
  # Fix demo accounts for proper authentication
  
  1. Changes
    - Ensures all demo accounts exist with proper authentication settings
    - Fixes email confirmation status for all demo accounts
    - Sets raw_app_meta_data and raw_user_meta_data for proper user type identification
    - Ensures accounts are in the authenticated role
  
  2. Security
    - No changes to security policies
*/

-- Fix demo accounts to ensure they work properly
DO $$
BEGIN
  -- Admin user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = now(),
        confirmation_token = NULL,
        recovery_token = NULL,
        aud = 'authenticated',
        role = 'authenticated',
        raw_app_meta_data = '{"provider":"email","providers":["email"],"user_type":"admin"}',
        raw_user_meta_data = '{"user_type":"admin"}'
    WHERE email = 'admin@example.com';
  ELSE
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
      raw_app_meta_data,
      raw_user_meta_data
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
      '{"provider":"email","providers":["email"],"user_type":"admin"}',
      '{"user_type":"admin"}'
    );
  END IF;
  
  -- Musician user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'musician@example.com') THEN
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = now(),
        confirmation_token = NULL,
        recovery_token = NULL,
        aud = 'authenticated',
        role = 'authenticated',
        raw_app_meta_data = '{"provider":"email","providers":["email"],"user_type":"musician"}',
        raw_user_meta_data = '{"user_type":"musician"}'
    WHERE email = 'musician@example.com';
  ELSE
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
      raw_app_meta_data,
      raw_user_meta_data
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
      '{"provider":"email","providers":["email"],"user_type":"musician"}',
      '{"user_type":"musician"}'
    );
  END IF;
  
  -- Fan user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'fan@example.com') THEN
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = now(),
        confirmation_token = NULL,
        recovery_token = NULL,
        aud = 'authenticated',
        role = 'authenticated',
        raw_app_meta_data = '{"provider":"email","providers":["email"],"user_type":"fan"}',
        raw_user_meta_data = '{"user_type":"fan"}'
    WHERE email = 'fan@example.com';
  ELSE
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
      raw_app_meta_data,
      raw_user_meta_data
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
      '{"provider":"email","providers":["email"],"user_type":"fan"}',
      '{"user_type":"fan"}'
    );
  END IF;
  
  -- Venue user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'venue@example.com') THEN
    UPDATE auth.users 
    SET encrypted_password = crypt('pass123', gen_salt('bf')),
        email_confirmed_at = now(),
        confirmation_token = NULL,
        recovery_token = NULL,
        aud = 'authenticated',
        role = 'authenticated',
        raw_app_meta_data = '{"provider":"email","providers":["email"],"user_type":"venue"}',
        raw_user_meta_data = '{"user_type":"venue"}'
    WHERE email = 'venue@example.com';
  ELSE
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
      raw_app_meta_data,
      raw_user_meta_data
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
      '{"provider":"email","providers":["email"],"user_type":"venue"}',
      '{"user_type":"venue"}'
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
          SELECT id, email, 'user_type', now()
          FROM auth.users
          WHERE email = 'venue@example.com'
          LIMIT 1;
        END IF;
      END IF;
    END IF;
  END IF;
END $$;
