# Task 14 – ETL Mini Pipeline (Extract → Transform → Load)

## 📌 Overview
This project demonstrates a mini ETL (Extract, Transform, Load) pipeline using Python.  
The objective is to extract raw data, clean and transform it, and load it into structured storage for analysis.

## 🛠 Tools & Technologies
- Python  
- pandas  
- SQLite  
- CSV files  
- Google Colab / Jupyter Notebook  

## 📂 Project Structure
Task14_ETL/
├── raw/
│   └── raw_data.csv
├── processed/
│   └── processed_data.csv
├── output/
│   ├── customers.csv
│   ├── orders.csv
│   └── products.csv
├── database.sqlite
├── task14_etl.ipynb
└── README.md

## 🔄 ETL Process

### Extract
- Loaded raw dataset from a CSV file.
- Stored original data inside the raw folder.

### Transform
- Handled missing values.
- Removed duplicate records.
- Standardized column names and data types.
- Created derived columns such as margin and segment flags.
- Split the dataset into customers, orders, and products tables.

### Load
- Exported cleaned data as CSV files.
- Loaded transformed data into a SQLite database.
- Validated row counts before and after transformations.

## 📊 Outputs
- processed_data.csv  
- customers.csv  
- orders.csv  
- products.csv  
- database.sqlite  

## ✅ Validation
- Verified record counts before and after ETL.
- Ensured no data loss during transformation.
- Confirmed table creation in SQLite database.

## 🎯 Final Outcome
- Gained practical understanding of ETL workflows.
- Learned data cleaning and transformation techniques.
- Built a structured data pipeline for analytics use cases.

## 📌 Interview Questions Covered
- What is ETL and why is it needed?
- Difference between ETL and ELT.
- How do you validate ETL output?
- Why separate tables in an ETL pipeline?
- Common ETL errors.
