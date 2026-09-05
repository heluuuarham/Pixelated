/*
# Create orders table for checkout order capture

1. New Tables
- `orders`
  - `id` (uuid, primary key)
  - `customer_name` (text, not null)
  - `customer_phone` (text, not null)
  - `customer_address` (text, not null)
  - `customer_city` (text, not null)
  - `payment_method` (text, not null) — 'cod' or 'advance'
  - `items` (jsonb, not null) — array of cart items with title, code, variant, size, borderColor, qty, unitPrice, lineTotal
  - `subtotal` (integer, not null)
  - `delivery_fee` (integer, not null)
  - `total` (integer, not null)
  - `status` (text, not null, default 'pending')
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `orders`.
- Single-tenant storefront, no sign-in. anon must INSERT orders.
- SELECT/UPDATE/DELETE denied by default (no policies = deny).

3. Notes
- Prices stored as integers (Pakistani Rupees).
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  payment_method text NOT NULL DEFAULT 'cod',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal integer NOT NULL DEFAULT 0,
  delivery_fee integer NOT NULL DEFAULT 0,
  total integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);
