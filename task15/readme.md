# Task 15 – Customer Segmentation (RFM Analysis)

## Objective
To perform Customer Segmentation using RFM (Recency, Frequency, Monetary) Analysis and identify different customer groups for targeted marketing.

## Tools Used
- Python
- Pandas
- NumPy
- Jupyter Notebook / Google Colab

## Dataset
E-commerce transaction dataset containing:
- Customer ID
- Invoice ID
- Invoice Date
- Quantity
- Unit Price

## Steps Performed

### 1. Data Cleaning
- Removed null Customer IDs
- Removed cancelled invoices
- Converted InvoiceDate to datetime format
- Created TotalAmount column (Quantity × UnitPrice)

### 2. RFM Calculation
- **Recency (R):** Days since last purchase
- **Frequency (F):** Number of transactions per customer
- **Monetary (M):** Total spending per customer

### 3. RFM Scoring
- Used quantile-based binning (qcut)
- Assigned R, F, M scores from 1 to 4
- Combined scores to create overall RFM score

### 4. Customer Segmentation
Customers were categorized into segments such as:
- Champions
- Loyal Customers
- Potential Loyalists
- At Risk
- Lost Customers

### 5. Visualization
- Created bar chart showing customer distribution across segments.

### 6. Export
- Exported final segmentation table to CSV file.

## Business Actions

### Champions
- Offer exclusive rewards
- Early access to new products
- Loyalty bonuses

### Loyal Customers
- Cross-sell premium products
- Referral programs
- Personalized recommendations

### At Risk Customers
- Re-engagement email campaigns
- Discount offers
- Feedback surveys

### Lost Customers
- Win-back campaigns
- Special discount vouchers
- Retargeting ads

## Outcome
This project demonstrates practical customer segmentation using RFM analysis and provides actionable business insights for targeted marketing strategies.
