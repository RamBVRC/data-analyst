
import { SaleRecord } from './types';

export const SAMPLE_DATA: SaleRecord[] = [
  { orderId: "CA-2023-152156", orderDate: "2023-11-08", region: "South", category: "Furniture", subCategory: "Chairs", segment: "Consumer", sales: 731.94, profit: 219.58, quantity: 3 },
  { orderId: "CA-2023-138688", orderDate: "2023-06-12", region: "West", category: "Office Supplies", subCategory: "Labels", segment: "Corporate", sales: 14.62, profit: 6.87, quantity: 2 },
  { orderId: "US-2023-108966", orderDate: "2023-10-11", region: "South", category: "Furniture", subCategory: "Tables", segment: "Consumer", sales: 957.58, profit: -383.03, quantity: 5 },
  { orderId: "CA-2023-115812", orderDate: "2023-06-09", region: "West", category: "Furniture", subCategory: "Furnishings", segment: "Consumer", sales: 48.86, profit: 14.17, quantity: 7 },
  { orderId: "CA-2023-114412", orderDate: "2023-04-15", region: "Central", category: "Office Supplies", subCategory: "Paper", segment: "Consumer", sales: 15.55, profit: 7.46, quantity: 3 },
  { orderId: "CA-2023-161389", orderDate: "2023-12-05", region: "East", category: "Technology", subCategory: "Phones", segment: "Consumer", sales: 219.99, profit: 54.99, quantity: 1 },
  { orderId: "CA-2023-105893", orderDate: "2023-01-14", region: "West", category: "Technology", subCategory: "Accessories", segment: "Home Office", sales: 407.97, profit: 132.59, quantity: 3 },
  { orderId: "US-2023-118983", orderDate: "2023-11-22", region: "Central", category: "Office Supplies", subCategory: "Appliances", segment: "Home Office", sales: 68.81, profit: -123.85, quantity: 5 },
  { orderId: "CA-2023-121258", orderDate: "2023-02-26", region: "East", category: "Furniture", subCategory: "Tables", segment: "Consumer", sales: 341.96, profit: -170.98, quantity: 2 },
  { orderId: "CA-2023-101343", orderDate: "2023-07-17", region: "South", category: "Office Supplies", subCategory: "Storage", segment: "Corporate", sales: 512.42, profit: 46.12, quantity: 4 },
  { orderId: "CA-2023-143336", orderDate: "2023-08-27", region: "West", category: "Technology", subCategory: "Phones", segment: "Consumer", sales: 1399.98, profit: 349.99, quantity: 2 },
  { orderId: "CA-2023-102204", orderDate: "2023-05-01", region: "Central", category: "Office Supplies", subCategory: "Storage", segment: "Consumer", sales: 25.24, profit: 6.81, quantity: 1 },
  { orderId: "US-2023-156909", orderDate: "2023-03-12", region: "East", category: "Furniture", subCategory: "Chairs", segment: "Consumer", sales: 361.54, profit: 12.65, quantity: 2 },
  { orderId: "CA-2023-161389", orderDate: "2023-12-05", region: "East", category: "Office Supplies", subCategory: "Binders", segment: "Consumer", sales: 18.50, profit: 8.88, quantity: 3 },
  { orderId: "CA-2023-121258", orderDate: "2023-02-26", region: "East", category: "Office Supplies", subCategory: "Paper", segment: "Consumer", sales: 114.46, profit: 54.94, quantity: 2 },
  { orderId: "CA-2023-105893", orderDate: "2023-01-14", region: "West", category: "Furniture", subCategory: "Tables", segment: "Home Office", sales: 90.57, profit: -31.70, quantity: 3 },
  { orderId: "US-2023-118983", orderDate: "2023-11-22", region: "Central", category: "Furniture", subCategory: "Chairs", segment: "Home Office", sales: 441.56, profit: -17.66, quantity: 2 },
  { orderId: "CA-2023-101343", orderDate: "2023-07-17", region: "South", category: "Technology", subCategory: "Accessories", segment: "Corporate", sales: 32.40, profit: 11.66, quantity: 1 },
  { orderId: "CA-2023-143336", orderDate: "2023-08-27", region: "West", category: "Office Supplies", subCategory: "Art", segment: "Consumer", sales: 11.42, profit: 3.08, quantity: 2 },
  { orderId: "CA-2023-102204", orderDate: "2023-05-01", region: "Central", category: "Office Supplies", subCategory: "Paper", segment: "Consumer", sales: 25.92, profit: 12.44, quantity: 4 }
];

export const REGIONS = ["Central", "East", "South", "West"];
export const CATEGORIES = ["Furniture", "Office Supplies", "Technology"];
export const SEGMENTS = ["Consumer", "Corporate", "Home Office"];
