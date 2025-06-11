/*
  # Create demo accounts for different user roles

  1. New Data
    - Creates demo accounts for admin, musician, venue, and fan roles
    - Ensures user_type field exists in users table
  
  2. Security
    - No changes to security policies
*/

-- Add user_type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'user_type'
  ) THEN
    ALTER TABLE users ADD COLUMN user_type TEXT;
  END IF;
END $$;

-- Update existing users with user_type if they exist, or insert if they don't
DO $$
BEGIN
  -- Update admin user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN
    UPDATE users SET user_type = 'admin' WHERE email = 'admin@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES (gen_random_uuid(), 'admin@example.com', 'admin', now(), now());
  END IF;
  
  -- Update musician user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'musician@example.com') THEN
    UPDATE users SET user_type = 'musician' WHERE email = 'musician@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES (gen_random_uuid(), 'musician@example.com', 'musician', now(), now());
  END IF;
  
  -- Update venue user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'venue@example.com') THEN
    UPDATE users SET user_type = 'venue' WHERE email = 'venue@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES (gen_random_uuid(), 'venue@example.com', 'venue', now(), now());
  END IF;
  
  -- Update fan user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'fan@example.com') THEN
    UPDATE users SET user_type = 'fan' WHERE email = 'fan@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES (gen_random_uuid(), 'fan@example.com', 'fan', now(), now());
  END IF;
END $$;
