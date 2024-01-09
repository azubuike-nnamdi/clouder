// hooks/useCoursesMutation.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { CoursesPayloadType } from "@/utils/types";
import { useCourses } from "@/context/CoursesProvider";

const useCoursesMutation = () => {
  const { handleFormSteps, handleFillForm } = useCourses();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (courses: CoursesPayloadType) => {
      return api.post("/courses", courses);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Course Submitted Successfully", {
          theme: "dark",
        });
        handleFormSteps(1);
        handleFillForm(false);
      }
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: { response: { data: { error: string } } }) => {
      const errorMsg = error.response.data.error;
      toast.error(errorMsg, {
        theme: "dark",
      });
    },
  });

  const handleSubmitCourses = (payload: CoursesPayloadType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitCourses,
  };
};

export default useCoursesMutation;
