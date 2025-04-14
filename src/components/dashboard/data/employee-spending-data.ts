
import { 
  SpendingTimeframe, 
  SpendingTableType,
  TopSpenderData,
  RecentTransactionData,
  UnusedAllowanceData
} from "../types/employee-spending-types";

// Generate mock data based on type and timeframe
export const generateMockData = (
  type: SpendingTableType, 
  timeframe: SpendingTimeframe
): TopSpenderData[] | RecentTransactionData[] | UnusedAllowanceData[] => {
  switch (type) {
    case "top-spenders":
      return generateTopSpendersData(timeframe);
    case "recent-transactions":
      return generateRecentTransactionsData(timeframe);
    case "unused-allowances":
      return generateUnusedAllowancesData(timeframe);
    default:
      return [];
  }
};

// Generate top spenders data
const generateTopSpendersData = (timeframe: SpendingTimeframe): TopSpenderData[] => {
  // Names with English names
  const employees = [
    { name: "Mohammed Smith", department: "IT", avatar: "" },
    { name: "Abdullah Johnson", department: "HR", avatar: "" },
    { name: "Sarah Davis", department: "Finance", avatar: "" },
    { name: "Nora Williams", department: "Marketing", avatar: "" },
    { name: "Khalid Brown", department: "Operations", avatar: "" },
    { name: "Ahmed Taylor", department: "Sales", avatar: "" },
    { name: "Fatima Wilson", department: "Customer Service", avatar: "" },
    { name: "Omar Miller", department: "Product Development", avatar: "" }
  ];

  return employees.map((employee, index) => ({
    id: index + 1,
    name: employee.name,
    department: employee.department,
    amount: Math.floor(Math.random() * 5000) + 1000,
    percentOfAllowance: Math.floor(Math.random() * 80) + 20,
    trend: Math.random() > 0.5 ? "up" : "down",
    avatar: employee.avatar
  }));
};

// Generate recent transactions data
const generateRecentTransactionsData = (timeframe: SpendingTimeframe): RecentTransactionData[] => {
  const employees = [
    { name: "Mohammed Smith", department: "IT", avatar: "" },
    { name: "Abdullah Johnson", department: "HR", avatar: "" },
    { name: "Sarah Davis", department: "Finance", avatar: "" },
    { name: "Nora Williams", department: "Marketing", avatar: "" },
    { name: "Khalid Brown", department: "Operations", avatar: "" },
    { name: "Fahad Anderson", department: "Management", avatar: "" }
  ];

  const descriptions = [
    "Anghami Premium Subscription",
    "Fitness Time Membership",
    "Shahid VIP Service",
    "AMC Cinema Tickets",
    "beIN SPORTS Subscription",
    "Paragon Spa Session"
  ];

  // Generate dates in the last month
  const getRandomDate = (): string => {
    const now = new Date();
    const daysOffset = Math.floor(Math.random() * 30);
    const date = new Date(now.setDate(now.getDate() - daysOffset));
    return date.toISOString().split('T')[0];
  };

  return employees.map((employee, index) => ({
    id: index + 1,
    name: employee.name,
    department: employee.department,
    description: descriptions[index % descriptions.length],
    date: getRandomDate(),
    amount: Math.floor(Math.random() * 800) + 200,
    avatar: employee.avatar
  }));
};

// Generate unused allowances data
const generateUnusedAllowancesData = (timeframe: SpendingTimeframe): UnusedAllowanceData[] => {
  const employees = [
    { name: "Sultan Harris", department: "IT", avatar: "" },
    { name: "Lina Roberts", department: "HR", avatar: "" },
    { name: "Reem Jones", department: "Finance", avatar: "" },
    { name: "Faisal Thompson", department: "Marketing", avatar: "" },
    { name: "Ohoud Parker", department: "Operations", avatar: "" }
  ];

  // Generate dates in the last 3 months
  const getRandomDate = (): string => {
    const now = new Date();
    const daysOffset = Math.floor(Math.random() * 90);
    const date = new Date(now.setDate(now.getDate() - daysOffset));
    return date.toISOString().split('T')[0];
  };

  return employees.map((employee, index) => ({
    id: index + 1,
    name: employee.name,
    department: employee.department,
    allowanceLeft: Math.floor(Math.random() * 5000) + 1000,
    percentUnused: Math.floor(Math.random() * 70) + 30,
    lastUsed: getRandomDate(),
    avatar: employee.avatar
  }));
};
