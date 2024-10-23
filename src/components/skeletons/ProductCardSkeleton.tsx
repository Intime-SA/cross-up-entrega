import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="h-64 w-full" />
      </CardHeader>
      <CardContent className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
