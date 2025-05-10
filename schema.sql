-- schema sql
-- Create deliveries table
CREATE TABLE IF NOT EXISTS deliveries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  otp TEXT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  timestamp TEXT
);

-- Insert seed data
-- INSERT INTO deliveries (recipient_name, phone, address, otp, status, timestamp)
-- VALUES 
--   ('Amit Sharma', '9876543210', 'Delhi, IN', '456123', 'PENDING', datetime('now')),
--   ('Sneha Iyer', '9988776655', 'Mumbai, IN', '321654', 'DELIVERED', datetime('now')),
--   ('Ravi Kumar', '9123456780', 'Hyderabad, IN', '789123', 'FAILED', datetime('now'));
