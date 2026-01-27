# Data Analyst Internship – Task 8  
## SQL Window Functions: Ranking & Running Totals

## 📌 Task Overview
This task focuses on using SQL Window Functions to perform advanced analytical operations such as ranking, running totals, and month-over-month (MoM) growth analysis. The goal is to demonstrate strong SQL reporting skills commonly required in data analyst roles.

---

## 🛠 Tools & Technologies
- Database: PostgreSQL  
- SQL Concepts:
  - Window Functions
  - CTEs (Common Table Expressions)
  - Aggregations
- Functions Used:
  - ROW_NUMBER()
  - RANK()
  - DENSE_RANK()
  - SUM() OVER()
  - LAG()
- Optional GUI Tools:
  - PgAdmin
  - DBeaver

---

## 📂 Dataset
Global Superstore Dataset (CSV format), imported into PostgreSQL with correct data types:
- Date → DATE
- Sales → NUMERIC
- Customer, Product, Region → VARCHAR

---

## 🔍 Tasks Performed
1. Imported CSV dataset into PostgreSQL.
2. Calculated total sales per customer using GROUP BY.
3. Ranked customers by sales within each region using:
   - ROW_NUMBER()
   - RANK()
   - DENSE_RANK()
4. Compared ranking behavior for tied values.
5. Calculated running total sales using SUM(sales) OVER (ORDER BY order_date).
6. Computed Month-over-Month (MoM) growth using LAG().
7. Identified Top 3 products per category using DENSE_RANK() with CTEs.
8. Exported SQL query results to CSV files.
9. Documented analytical insights.

---

## 📁 Deliverables
- task8_window.sql  
- ranked_customers.csv  
- mom_growth.csv  
- insights_task8.txt  
- README.md  

---

## 📊 Key Insights
- Window functions enable advanced analytics without collapsing rows.
- DENSE_RANK() is ideal for Top-N analysis when ties exist.
- Running totals help identify cumulative performance trends.
- LAG() enables period-over-period growth analysis.

---

## 🎯 Final Outcome
- Developed advanced SQL queries using window functions
- Performed ranking and trend analysis on sales data
- Generated meaningful business insights for reporting


