

-- 1. INNER JOIN: Orders with Customer Details
SELECT 
    o.order_id,
    o.order_date,
    c.customer_name,
    c.email,
    o.total_amount
FROM orders o
INNER JOIN customers c
    ON o.customer_id = c.customer_id;


-- 2. LEFT JOIN: Customers Who Never Placed Any Orders
SELECT 
    c.customer_id,
    c.customer_name,
    c.email
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.order_id IS NULL;


-- 3. Total Revenue Per Product
SELECT 
    p.product_id,
    p.product_name,
    SUM(o.total_amount) AS total_revenue
FROM orders o
INNER JOIN products p
    ON o.product_id = p.product_id
GROUP BY p.product_id, p.product_name
ORDER BY total_revenue DESC;


-- 4. Category-wise Revenue Distribution
SELECT 
    c.category_name,
    SUM(o.total_amount) AS category_revenue
FROM orders o
INNER JOIN products p
    ON o.product_id = p.product_id
INNER JOIN categories c
    ON p.category_id = c.category_id
GROUP BY c.category_name
ORDER BY category_revenue DESC;


-- 5. Sales in a Specific Region Between Dates
SELECT 
    o.order_id,
    c.customer_name,
    c.region,
    o.order_date,
    o.total_amount
FROM orders o
INNER JOIN customers c
    ON o.customer_id = c.customer_id
WHERE c.region = 'South'
  AND o.order_date BETWEEN '2024-01-01' AND '2024-12-31';


-- 6. Order Count Per Customer
SELECT 
    c.customer_id,
    c.customer_name,
    COUNT(o.order_id) AS total_orders
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_orders DESC;


-- 7. Top 3 Products by Revenue
SELECT 
    p.product_name,
    SUM(o.total_amount) AS total_revenue
FROM orders o
INNER JOIN products p
    ON o.product_id = p.product_id
GROUP BY p.product_name
ORDER BY total_revenue DESC
LIMIT 3;
