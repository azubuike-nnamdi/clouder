// hooks/useQualificationMutation.ts
import api from "@/utils/axiosInstance";
import { RequestSupportType } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useMutateSupport = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (support: RequestSupportType) => {
      return api.post("/messages/send", support);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success("Request submitted Successfully!");
        console.log("data", data);
      }
      queryClient.invalidateQueries({ queryKey: ["support"] });
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    },
  });

  const handleRequestSupport = (payload: RequestSupportType) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleRequestSupport,
  };
};

export default useMutateSupport;
