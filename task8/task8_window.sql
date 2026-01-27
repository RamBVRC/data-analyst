
-- Task 8: SQL Window Functions

-- Rank customers by total sales per region
WITH customer_sales AS (
    SELECT
        customer_id,
        customer_name,
        region,
        SUM(sales) AS total_sales
    FROM orders
    GROUP BY customer_id, customer_name, region
)
SELECT
    customer_id,
    customer_name,
    region,
    total_sales,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY total_sales DESC) AS row_num,
    RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) AS rank_num,
    DENSE_RANK() OVER (PARTITION BY region ORDER BY total_sales DESC) AS dense_rank_num
FROM customer_sales;

-- Month-over-Month growth
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(sales) AS monthly_sales
    FROM orders
    GROUP BY month
)
SELECT
    month,
    monthly_sales,
    LAG(monthly_sales) OVER (ORDER BY month) AS prev_month_sales,
    (monthly_sales - LAG(monthly_sales) OVER (ORDER BY month)) AS mom_growth
FROM monthly_sales
ORDER BY month;
