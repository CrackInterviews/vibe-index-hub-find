
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type SortOption = "most-liked" | "most-viewed" | "newest";
type TimeOption = "all-time" | "this-month" | "this-week" | "today";

interface FilterSortProps {
  onSortChange: (sort: SortOption) => void;
  onTimeChange: (time: TimeOption) => void;
}

const FilterSort = ({ onSortChange, onTimeChange }: FilterSortProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("most-liked");
  const [timeFrame, setTimeFrame] = useState<TimeOption>("all-time");

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    onSortChange(option);
  };

  const handleTimeChange = (option: TimeOption) => {
    setTimeFrame(option);
    onTimeChange(option);
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Sort By: {sortBy.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleSortChange("most-liked")}>
            Most Liked
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("most-viewed")}>
            Most Viewed
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSortChange("newest")}>
            Newest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Time: {timeFrame.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleTimeChange("all-time")}>
            All Time
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeChange("this-month")}>
            This Month
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeChange("this-week")}>
            This Week
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleTimeChange("today")}>
            Today
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterSort;
