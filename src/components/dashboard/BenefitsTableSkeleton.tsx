
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BenefitsTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Benefit Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="w-24">Status</TableHead>
          <TableHead className="w-24">Visibility</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3].map((i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
            <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
            <TableCell className="text-right"><Skeleton className="h-5 w-[60px] ml-auto" /></TableCell>
            <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
            <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BenefitsTableSkeleton;
