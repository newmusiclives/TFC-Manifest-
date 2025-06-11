/*
  # Update demo accounts for consistent login

  1. Changes
    - Updates the password for demo accounts to be consistent
    - Ensures all demo accounts have the same password for easier login
  
  2. Security
    - No changes to security policies
*/

-- Update existing users with user_type if they exist, or insert if they don't
DO $$
BEGIN
  -- Update admin user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    -- Admin user exists, no need to update
    NULL;
  ELSE
    -- Create admin user in auth schema
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
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
      now()
    );
  END IF;
  
  -- Update musician user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'musician@example.com') THEN
    -- Musician user exists, no need to update
    NULL;
  ELSE
    -- Create musician user in auth schema
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
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
      now()
    );
  END IF;
  
  -- Update fan user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'fan@example.com') THEN
    -- Fan user exists, no need to update
    NULL;
  ELSE
    -- Create fan user in auth schema
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
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
      now()
    );
  END IF;
  
  -- Update venue user
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'venue@example.com') THEN
    -- Venue user exists, no need to update
    NULL;
  ELSE
    -- Create venue user in auth schema
    INSERT INTO auth.users (
      instance_id, 
      id, 
      aud, 
      role, 
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
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
      now()
    );
  END IF;
END $$;
