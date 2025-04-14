
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  status?: 'active' | 'inactive';
  className?: string;
}

const StatCard = ({ title, value, subtitle, status, className }: StatCardProps) => {
  return (
    <div className={cn(
      "p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow", 
      className
    )}>
      <p className="text-xs text-gray-500 mb-1 font-medium truncate">{title}</p>
      <div className="flex items-center">
        <h3 className="text-base font-bold text-gray-900 truncate">{value}</h3>
        <div className="flex items-center ml-2">
          {status && (
            <span className="flex items-center text-xs font-medium">
              {status === 'active' ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-green-700">Active</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  <span className="text-red-700">Inactive</span>
                </>
              )}
            </span>
          )}
          {subtitle && <span className="text-xs text-gray-500 ml-1 truncate">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
