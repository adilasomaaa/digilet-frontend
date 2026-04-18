import { useState, useEffect, useCallback } from "react";
import { activityParticipantService } from "@/services/ActivityParticipantService";
import type { SortDescriptor } from "@heroui/react";
import type { ActivityParticipant } from "@/models";

export const useMyActivity = () => {
  const [items, setItems] = useState<ActivityParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterValue, setFilterValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1, limit: 10, totalData: 0, totalPages: 1,
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await activityParticipantService.myActivities({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  return {
    items, isLoading, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    fetchItems,
  };
};
