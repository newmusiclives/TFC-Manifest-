/*
  # Create payouts table for tracking artist payments

  1. New Tables
    - `payouts`
      - `id` (uuid, primary key)
      - `musician_id` (uuid, references musicians.id)
      - `amount` (numeric)
      - `status` (text)
      - `payout_date` (timestamptz)
      - `reference_id` (text)
      - `bank_account_id` (text)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `payouts` table
    - Add policy for musicians to read their own payouts
    - Add policy for admin to manage all payouts
*/

CREATE TABLE IF NOT EXISTS payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  musician_id uuid NOT NULL REFERENCES musicians(id),
  amount numeric NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  payout_date timestamptz,
  reference_id text,
  bank_account_id text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Musicians can read their own payouts"
  ON payouts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = musician_id);

CREATE POLICY "Admin can manage all payouts"
  ON payouts
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
