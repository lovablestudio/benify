
import { useState, useEffect } from "react";
import {
  EmployeeSpendingTableProps,
  TopSpenderData,
  RecentTransactionData,
  UnusedAllowanceData,
  SpendingTimeframe
} from "./types/employee-spending-types";
import { generateMockData } from "./data/employee-spending-data";
import TopSpendersTable from "./TopSpendersTable";
import RecentTransactionsTable from "./RecentTransactionsTable";
import UnusedAllowancesTable from "./UnusedAllowancesTable";

const EmployeeSpendingTable = ({ type, timeframe }: EmployeeSpendingTableProps) => {
  const [data, setData] = useState<TopSpenderData[] | RecentTransactionData[] | UnusedAllowanceData[]>([]);
  
  useEffect(() => {
    // Fetch data based on type and timeframe
    setData(generateMockData(type, timeframe));
  }, [type, timeframe]);

  if (type === "top-spenders") {
    return <TopSpendersTable data={data as TopSpenderData[]} timeframe={timeframe} />;
  } else if (type === "recent-transactions") {
    return <RecentTransactionsTable data={data as RecentTransactionData[]} timeframe={timeframe} />;
  } else if (type === "unused-allowances") {
    return <UnusedAllowancesTable data={data as UnusedAllowanceData[]} timeframe={timeframe} />;
  }

  return null;
};

export default EmployeeSpendingTable;
