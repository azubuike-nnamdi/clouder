// src/hooks/useLoginMutation.ts
import { DASHBOARD_URL, SUPERVISOR_DASHBOARD_URL } from "@/config/route";
import api from "@/utils/axiosInstance";
import { LoginFormValues } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (user: LoginFormValues) => {
      return api.post("/auth/signin", user);
    },
    onSuccess: ({ data }) => {
      const userToken = data.access;
      const refreshToken = data.refresh;
      const role = data.role;
      const plan = data.plan;

      setCookie("token", JSON.stringify(userToken));
      setCookie("refreshToken", JSON.stringify(refreshToken));
      setCookie("role", JSON.stringify(role));
      setCookie("plan", JSON.stringify(plan));

      sessionStorage.setItem("token", userToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("plan", plan);

      if (role === "client") {
        router.push(DASHBOARD_URL);
      } else {
        router.push(SUPERVISOR_DASHBOARD_URL);
      }
      toast.success("Login Successful");
    },
    onError: (error: { response: { data: { error: string } } }) => {
      const errorMsg = error.response.data.error;
      toast.error(errorMsg);
    },
  });
};

export default useLoginMutation;
