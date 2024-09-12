import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";
import {
  COURSES_URL,
  LOGBOOK_URL,
  MEDICAL_LOGBOOK_URL,
  RESEARCH_URL,
  SURGICAL_LOGBOOK_URL,
} from "@/config/route";
import { usePathname } from "next/navigation";

const useFetchFeedback = (id: string) => {
  const pathname = usePathname();
  const getOptionFromPathname = (pathname: string): string => {
    if (!pathname) return "";

    if (pathname.includes(RESEARCH_URL)) {
      return "research";
    } else if (pathname.includes(COURSES_URL)) {
      return "courses";
    } else if (pathname.includes(LOGBOOK_URL)) {
      return "logbook";
    } else if (pathname.includes(SURGICAL_LOGBOOK_URL || MEDICAL_LOGBOOK_URL)) {
      return "logbook";
    }
    // Add more conditions as needed
    return "";
  };

  const option = getOptionFromPathname(pathname);
  const fetchFeedback = async () => {
    const data = await api.get(`feedbacks/${id}?option=${option}`);
    return data;
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
    staleTime: 300000,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetchFeedback;
