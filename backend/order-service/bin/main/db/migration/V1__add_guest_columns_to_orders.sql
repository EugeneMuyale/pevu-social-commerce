-- Migration: Add guest checkout support to orders table
-- Version: V1
-- Description: Add guestEmail and guestName columns, make userId nullable

-- Add new columns for guest checkout
ALTER TABLE orders ADD COLUMN guest_email VARCHAR(255);
ALTER TABLE orders ADD COLUMN guest_name VARCHAR(255);

-- Make userId nullable (PostgreSQL doesn't support direct nullable change, so we need to recreate)
-- First, create a new table with the desired structure
CREATE TABLE orders_new (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    guest_email VARCHAR(255),
    guest_name VARCHAR(255),
    shipping_address TEXT,
    total INTEGER,
    payment_method VARCHAR(255),
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Copy data from old table to new table
INSERT INTO orders_new (id, user_id, shipping_address, total, payment_method, status, created_at)
SELECT id, user_id, shipping_address, total, payment_method, status, created_at FROM orders;

-- Drop the old table
DROP TABLE orders;

-- Rename the new table to orders
ALTER TABLE orders_new RENAME TO orders;

-- Recreate the order_items table with proper foreign key
CREATE TABLE order_items_new (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT,
    quantity INTEGER,
    price INTEGER
);

-- Copy data from old order_items table
INSERT INTO order_items_new (id, order_id, product_id, quantity, price)
SELECT id, order_id, product_id, quantity, price FROM order_items;

-- Drop the old order_items table
DROP TABLE order_items;

-- Rename the new order_items table
ALTER TABLE order_items_new RENAME TO order_items;

-- Add indexes for better performance
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_guest_email ON orders(guest_email);
CREATE INDEX idx_orders_created_at ON orders(created_at); 