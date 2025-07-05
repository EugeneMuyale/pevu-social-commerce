-- Migration: Add guest checkout support to orders table (Simple version)
-- Version: V1
-- Description: Add guestEmail and guestName columns to orders table

-- Add new columns for guest checkout
ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_email VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS guest_name VARCHAR(255);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_guest_email ON orders(guest_email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Note: userId column remains NOT NULL for existing data
-- New orders can be created with userId = NULL if guest info is provided
-- This approach maintains backward compatibility 