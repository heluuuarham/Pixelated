/*
# Add readable order numbers (ORD-YYMMDD-###)

1. Schema Changes
   - Add `order_number` column (text) to `orders` table.
   - This column stores a human-readable ID like "ORD-260829-001"
     (ORD-YYMMDD-### where ### is a zero-padded running count for that day).

2. New Function
   - `generate_order_number()` — SECURITY DEFINER function that:
     a) Gets today's date in YYMMDD format.
     b) Acquires a transaction-level advisory lock keyed to that date
        to prevent race conditions on concurrent inserts.
     c) Counts existing orders with today's prefix.
     d) Returns "ORD-YYMMDD-###" with the next number, zero-padded to 3 digits.
   - SECURITY DEFINER is required so the anon role can count all orders
     (RLS would otherwise hide rows from other sessions, breaking the count).

3. Notes
   - The existing UUID `id` column is kept as the primary key — no data loss.
   - `order_number` is a secondary readable identifier.
   - The frontend will call this function via RPC before inserting, then
     include the returned order_number in the insert payload.
*/;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS order_number text;

CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_date text;
  v_count integer;
  v_number text;
BEGIN
  v_date := to_char(now(), 'YYMMDD');

  PERFORM pg_advisory_xact_lock(hashtext('order_number_' || v_date));

  SELECT count(*) INTO v_count
  FROM orders
  WHERE order_number LIKE 'ORD-' || v_date || '-%';

  v_number := 'ORD-' || v_date || '-' || lpad((v_count + 1)::text, 3, '0');

  RETURN v_number;
END;
$$;

GRANT EXECUTE ON FUNCTION generate_order_number() TO anon, authenticated;
