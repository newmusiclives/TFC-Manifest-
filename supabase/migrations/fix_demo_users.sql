/*
  # Fix demo users creation

  1. Changes
    - Fixes the duplicate key issue by using ON CONFLICT DO UPDATE
    - Ensures user_type is properly set for existing users
  
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
    VALUES ('00000000-0000-0000-0000-000000000001', 'admin@example.com', 'admin', now(), now());
  END IF;
  
  -- Update artist user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'artist@example.com') THEN
    UPDATE users SET user_type = 'musician' WHERE email = 'artist@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000002', 'artist@example.com', 'musician', now(), now());
  END IF;
  
  -- Update fan user
  IF EXISTS (SELECT 1 FROM users WHERE email = 'fan@example.com') THEN
    UPDATE users SET user_type = 'fan' WHERE email = 'fan@example.com';
  ELSE
    INSERT INTO users (id, email, user_type, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000003', 'fan@example.com', 'fan', now(), now());
  END IF;
END $$;

-- Insert or update auth users
DO $$
BEGIN
  -- Check if admin user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@example.com') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000001', 'admin@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now());
  END IF;
  
  -- Check if artist user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'artist@example.com') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000002', 'artist@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now());
  END IF;
  
  -- Check if fan user exists in auth.users
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'fan@example.com') THEN
    INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
    VALUES ('00000000-0000-0000-0000-000000000003', 'fan@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now());
  END IF;
END $$;
