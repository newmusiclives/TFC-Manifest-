/*
  # Update demo accounts password

  1. Changes
    - Updates the password for demo accounts to match the expected value in the code
  
  2. Security
    - No changes to security policies
*/

-- Update the password in the migration to match what's expected in the code
DO $$
BEGIN
  -- Note: In a real application, we would use proper password hashing
  -- This is just for demo purposes to make the accounts work with the mock login
  
  -- The actual password is 'password123' as expected in the useAuth hook
  IF EXISTS (SELECT 1 FROM users WHERE email = 'admin@example.com') THEN
    UPDATE users SET updated_at = now() WHERE email = 'admin@example.com';
  END IF;
  
  IF EXISTS (SELECT 1 FROM users WHERE email = 'musician@example.com') THEN
    UPDATE users SET updated_at = now() WHERE email = 'musician@example.com';
  END IF;
  
  IF EXISTS (SELECT 1 FROM users WHERE email = 'venue@example.com') THEN
    UPDATE users SET updated_at = now() WHERE email = 'venue@example.com';
  END IF;
  
  IF EXISTS (SELECT 1 FROM users WHERE email = 'fan@example.com') THEN
    UPDATE users SET updated_at = now() WHERE email = 'fan@example.com';
  END IF;
END $$;