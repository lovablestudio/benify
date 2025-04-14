
import { ReactNode } from "react";

export type SpendingTimeframe = "weekly" | "monthly" | "quarterly" | "yearly";
export type SpendingTableType = "top-spenders" | "recent-transactions" | "unused-allowances";

export interface EmployeeSpendingTableProps {
  type: SpendingTableType;
  timeframe: SpendingTimeframe;
}

export interface TopSpenderData {
  id: number;
  name: string;
  department: string;
  amount: number;
  percentOfAllowance: number;
  trend: "up" | "down";
  avatar: string;
}

export interface RecentTransactionData {
  id: number;
  name: string;
  department: string;
  description: string;
  date: string;
  amount: number;
  avatar: string;
}

export interface UnusedAllowanceData {
  id: number;
  name: string;
  department: string;
  allowanceLeft: number;
  percentUnused: number;
  lastUsed: string;
  avatar: string;
}

export type SpendingData = TopSpenderData | RecentTransactionData | UnusedAllowanceData;
