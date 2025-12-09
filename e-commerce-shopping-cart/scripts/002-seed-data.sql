-- Insert categories
INSERT INTO categories (name, slug, image_url) VALUES
('Electronics', 'electronics', '/placeholder.svg?height=200&width=300'),
('Fashion', 'fashion', '/placeholder.svg?height=200&width=300'),
('Home & Kitchen', 'home-kitchen', '/placeholder.svg?height=200&width=300'),
('Books', 'books', '/placeholder.svg?height=200&width=300'),
('Sports & Outdoors', 'sports-outdoors', '/placeholder.svg?height=200&width=300'),
('Beauty & Personal Care', 'beauty', '/placeholder.svg?height=200&width=300');

-- Insert products for Electronics
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 149.99, 199.99, '/placeholder.svg?height=300&width=300', 1, 150, 4.5, 2340),
('Smart Watch Pro', 'Advanced fitness tracking with heart rate monitor and GPS', 299.99, 349.99, '/placeholder.svg?height=300&width=300', 1, 80, 4.7, 1890),
('4K Ultra HD Webcam', 'Crystal clear video for streaming and video calls', 89.99, 129.99, '/placeholder.svg?height=300&width=300', 1, 200, 4.3, 567),
('Portable Bluetooth Speaker', 'Waterproof speaker with 360° sound and 24-hour playback', 79.99, 99.99, '/placeholder.svg?height=300&width=300', 1, 300, 4.6, 3421),
('Wireless Charging Pad', 'Fast charging for all Qi-enabled devices', 34.99, 49.99, '/placeholder.svg?height=300&width=300', 1, 500, 4.4, 892);

-- Insert products for Fashion
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('Classic Leather Jacket', 'Genuine leather jacket with modern fit', 189.99, 249.99, '/placeholder.svg?height=300&width=300', 2, 45, 4.8, 456),
('Premium Cotton T-Shirt Pack', 'Set of 5 comfortable everyday t-shirts', 49.99, 69.99, '/placeholder.svg?height=300&width=300', 2, 200, 4.5, 1234),
('Designer Sneakers', 'Comfortable and stylish everyday sneakers', 129.99, 159.99, '/placeholder.svg?height=300&width=300', 2, 100, 4.6, 789),
('Casual Denim Jeans', 'Classic fit jeans with stretch comfort', 59.99, 79.99, '/placeholder.svg?height=300&width=300', 2, 150, 4.4, 567),
('Wool Winter Scarf', 'Warm and soft merino wool scarf', 39.99, 54.99, '/placeholder.svg?height=300&width=300', 2, 80, 4.7, 234);

-- Insert products for Home & Kitchen
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('Air Fryer Pro', 'Large capacity air fryer with digital controls', 119.99, 159.99, '/placeholder.svg?height=300&width=300', 3, 60, 4.7, 2156),
('Robot Vacuum Cleaner', 'Smart navigation with app control', 249.99, 349.99, '/placeholder.svg?height=300&width=300', 3, 40, 4.5, 1678),
('Coffee Maker Deluxe', '12-cup programmable coffee maker', 79.99, 99.99, '/placeholder.svg?height=300&width=300', 3, 90, 4.6, 3421),
('Non-Stick Cookware Set', '10-piece premium cookware collection', 149.99, 199.99, '/placeholder.svg?height=300&width=300', 3, 55, 4.4, 892),
('Smart LED Bulbs Pack', 'Color-changing WiFi bulbs (4-pack)', 44.99, 59.99, '/placeholder.svg?height=300&width=300', 3, 200, 4.3, 567);

-- Insert products for Books
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('The Art of Programming', 'Comprehensive guide to modern software development', 49.99, 59.99, '/placeholder.svg?height=300&width=300', 4, 100, 4.8, 1234),
('Business Strategy Masterclass', 'Learn from top business leaders', 29.99, 39.99, '/placeholder.svg?height=300&width=300', 4, 150, 4.6, 567),
('Mindfulness & Meditation Guide', 'Achieve inner peace and clarity', 19.99, 24.99, '/placeholder.svg?height=300&width=300', 4, 200, 4.7, 892),
('World History Encyclopedia', 'Illustrated journey through human history', 59.99, 79.99, '/placeholder.svg?height=300&width=300', 4, 75, 4.5, 345),
('Cooking Around the World', 'International recipes from 50 countries', 34.99, 44.99, '/placeholder.svg?height=300&width=300', 4, 120, 4.4, 678);

-- Insert products for Sports & Outdoors
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('Yoga Mat Premium', 'Extra thick non-slip yoga mat', 39.99, 54.99, '/placeholder.svg?height=300&width=300', 5, 180, 4.6, 2341),
('Resistance Bands Set', 'Complete set with 5 resistance levels', 24.99, 34.99, '/placeholder.svg?height=300&width=300', 5, 250, 4.5, 1567),
('Camping Tent 4-Person', 'Waterproof tent with easy setup', 159.99, 199.99, '/placeholder.svg?height=300&width=300', 5, 35, 4.7, 456),
('Running Shoes Ultra', 'Lightweight with maximum cushioning', 119.99, 149.99, '/placeholder.svg?height=300&width=300', 5, 90, 4.8, 3421),
('Fitness Tracker Band', 'Track steps, sleep, and heart rate', 49.99, 69.99, '/placeholder.svg?height=300&width=300', 5, 200, 4.4, 1234);

-- Insert products for Beauty & Personal Care
INSERT INTO products (name, description, price, original_price, image_url, category_id, stock, rating, review_count) VALUES
('Vitamin C Serum', 'Brightening serum with hyaluronic acid', 29.99, 39.99, '/placeholder.svg?height=300&width=300', 6, 150, 4.7, 2678),
('Electric Toothbrush Pro', 'Sonic cleaning with smart timer', 79.99, 99.99, '/placeholder.svg?height=300&width=300', 6, 100, 4.6, 1892),
('Hair Dryer Professional', 'Ionic technology for smooth results', 89.99, 119.99, '/placeholder.svg?height=300&width=300', 6, 80, 4.5, 1234),
('Organic Skincare Set', 'Complete routine with natural ingredients', 69.99, 89.99, '/placeholder.svg?height=300&width=300', 6, 60, 4.8, 567),
('Perfume Collection', 'Set of 4 designer fragrances', 99.99, 139.99, '/placeholder.svg?height=300&width=300', 6, 45, 4.4, 345);
