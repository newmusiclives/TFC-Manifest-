/*
  # Create demo users

  1. New Data
    - Creates demo users for testing different user roles
    - Adds user_type field to users table if it doesn't exist
  
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

-- Insert demo users if they don't exist
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'artist@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now()),
  ('00000000-0000-0000-0000-000000000003', 'fan@example.com', '$2a$10$Ql9XLaLqYYGQQU0QIjPB3.Rd6AVs/ZlJsY5.4X1zgRFxLOZV3j5/2', now(), now(), now())
ON CONFLICT (id) DO NOTHING;

-- Insert user profiles if they don't exist
INSERT INTO users (id, email, user_type, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'admin@example.com', 'admin', now(), now()),
  ('00000000-0000-0000-0000-000000000002', 'artist@example.com', 'musician', now(), now()),
  ('00000000-0000-0000-0000-000000000003', 'fan@example.com', 'fan', now(), now())
ON CONFLICT (id) DO NOTHING;
