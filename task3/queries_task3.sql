CREATE DATABASE sales_db;
USE sales_db;
CREATE TABLE superstore (
    order_id VARCHAR(20),
    order_date DATE,
    customer_name VARCHAR(100),
    category VARCHAR(50),
    sub_category VARCHAR(50),
    region VARCHAR(50),
    sales DECIMAL(10,2),
    profit DECIMAL(10,2)
);
describe superstore;
SHOW TABLES;
SET GLOBAL local_infile = 1;
SHOW VARIABLES LIKE 'local_infile';
USE sales_db;

LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/superstore_data.csv'
INTO TABLE superstore
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@row_id, order_id, @order_date, @ship_date, @ship_mode,
 @customer_id, customer_name, @segment, @country,
 @city, @state, @postal_code, region,
 @product_id, category, sub_category,
 @product_name, sales, @quantity, @discount, profit)
SET order_date = STR_TO_DATE(@order_date, '%d-%m-%Y');
SELECT COUNT(*) FROM superstore;
USE sales_db;
DROP TABLE superstore;
CREATE TABLE superstore (
  row_id INT,
  order_id VARCHAR(20),
  order_date DATE,
  ship_date DATE,
  ship_mode VARCHAR(50),
  customer_id VARCHAR(20),
  customer_name VARCHAR(100),
  segment VARCHAR(50),
  country VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(50),
  postal_code VARCHAR(20),
  region VARCHAR(50),
  product_id VARCHAR(50),
  category VARCHAR(50),
  sub_category VARCHAR(50),
  product_name VARCHAR(200),
  sales DECIMAL(10,2),
  quantity INT,
  discount DECIMAL(4,2),
  profit DECIMAL(10,2)
);
LOAD DATA LOCAL INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/superstore_data.csv'
INTO TABLE superstore
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS
(
row_id, order_id, @order_date, @ship_date, ship_mode,
customer_id, customer_name, segment, country,
city, state, postal_code, region,
product_id, category, sub_category,
product_name, sales, quantity, discount, profit
)
SET
order_date = STR_TO_DATE(@order_date, '%m/%d/%Y'),
ship_date  = STR_TO_DATE(@ship_date,  '%m/%d/%Y');
DROP TABLE superstore;
SELECT COUNT(*) FROM superstore;
SELECT DATABASE();
USE sales_db;
SHOW TABLES;
RENAME TABLE `superstore_data.csv` TO superstore;
SELECT COUNT(*) FROM superstore;
SELECT * FROM superstore LIMIT 5;
DESCRIBE superstore;
SELECT `Customer Name`, Sales, Profit
FROM superstore
LIMIT 1000;
SELECT `Customer Name`, Sales, Profit
FROM superstore
WHERE Category = 'Technology';
SELECT `Customer Name`, Sales, Profit
FROM superstore
WHERE Profit > 500;
SELECT `Customer Name`, Sales, Profit, Category
FROM superstore
WHERE Category = 'Furniture'
AND Profit > 200;

SELECT `Customer Name`, Sales, Profit
FROM superstore
ORDER BY Sales DESC;
SELECT SUM(Sales) AS Total_Sales
FROM superstore;
SELECT AVG(Profit) AS Avg_Profit
FROM superstore;
SELECT Category, SUM(Sales) AS Total_Sales
FROM superstore
GROUP BY Category;
SELECT Category, SUM(Sales) AS Total_Sales
FROM superstore
GROUP BY Category
HAVING SUM(Sales) > 100000;
