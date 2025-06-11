/*
  # Update donations table to add processing fee fields

  1. Changes
    - Add `processing_fee` column to store the transaction fee (2.9% + $0.30)
    - Add `total_charged` column to store the total amount charged to the fan
  
  2. Purpose
    - Track processing fees separately from platform fees
    - Maintain clear records of the total amount charged to fans vs. the base donation amount
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'processing_fee'
  ) THEN
    ALTER TABLE donations ADD COLUMN processing_fee numeric DEFAULT 0;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'donations' AND column_name = 'total_charged'
  ) THEN
    ALTER TABLE donations ADD COLUMN total_charged numeric DEFAULT 0;
  END IF;
END $$;
