# Database Migration for Guest Checkout Support

## Overview
This migration adds support for guest checkout by adding `guest_email` and `guest_name` columns to the `orders` table.

## Migration Files
- `V1__add_guest_columns_simple.sql` - Simple migration (recommended)
- `V1__add_guest_columns_to_orders.sql` - Full table recreation (use with caution)

## Running the Migration

### Option 1: Using psql (Recommended)
```bash
# Connect to the database
psql -h localhost -p 5432 -U pevu_user -d pevu_social_commerce

# Run the migration
\i backend/order-service/src/main/resources/db/migration/V1__add_guest_columns_simple.sql
```

### Option 2: Using Docker
```bash
# Copy the migration file to the postgres container
docker cp backend/order-service/src/main/resources/db/migration/V1__add_guest_columns_simple.sql docker-postgres-1:/tmp/

# Execute the migration
docker exec -it docker-postgres-1 psql -U pevu_user -d pevu_social_commerce -f /tmp/V1__add_guest_columns_simple.sql
```

### Option 3: Direct execution
```bash
psql -h localhost -p 5432 -U pevu_user -d pevu_social_commerce -f backend/order-service/src/main/resources/db/migration/V1__add_guest_columns_simple.sql
```

## What the Migration Does
1. Adds `guest_email` column (VARCHAR(255), nullable)
2. Adds `guest_name` column (VARCHAR(255), nullable)
3. Creates indexes for better performance
4. Maintains backward compatibility with existing orders

## Verification
After running the migration, you can verify the changes:
```sql
-- Check the table structure
\d orders

-- Check if columns were added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'orders' 
AND column_name IN ('guest_email', 'guest_name');
```

## Rollback (if needed)
If you need to rollback the changes:
```sql
-- Remove the new columns
ALTER TABLE orders DROP COLUMN IF EXISTS guest_email;
ALTER TABLE orders DROP COLUMN IF EXISTS guest_name;

-- Remove the indexes
DROP INDEX IF EXISTS idx_orders_guest_email;
DROP INDEX IF EXISTS idx_orders_created_at;
``` 