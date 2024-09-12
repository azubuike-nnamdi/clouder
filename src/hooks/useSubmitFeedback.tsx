import { DASHBOARD_URL } from "@/config/route";
import api from "@/utils/axiosInstance";
import { FeedbackPayload } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSubmitFeedback(id: string, option: string) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (feedback: FeedbackPayload) => {
      return api.post(`/feedbacks/${id}?option=${option}`, feedback);
    },
    onSuccess: ({ data }) => {
      if (data) {
        toast.success(data?.message);
        router.push(DASHBOARD_URL);
      }
    },
    onError: (error: { response: { data: { message: string } } }) => {
      const errorMsg = error.response.data.message;
      toast.error(errorMsg);
    },
  });

  const handleSubmitFeedback = (payload: FeedbackPayload) => {
    mutation.mutate(payload);
  };

  return {
    ...mutation,
    handleSubmitFeedback,
  };
}
