import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/client";
import { auth as firebaseAuth, googleProvider, signInWithPopup, signOut as firebaseSignOut } from "../../../lib/firebase";

export function useAuth() {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const stored = localStorage.getItem("nola_builts_user");
      if (!stored) return null;
      try {
        const user = JSON.parse(stored);
        if (!user || !user.token) return null;
        
        // Optionally verify token with backend
        const response = await apiClient.get("/auth/profile");
        return { ...response.data, token: user.token };
      } catch (e) {
        localStorage.removeItem("nola_builts_user");
        localStorage.removeItem("nola_builts_lead_data");
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiClient.post("/auth/login", credentials);
      return response.data.user;
    },
    onSuccess: (user) => {
      localStorage.setItem("nola_builts_user", JSON.stringify(user));
      if (user.leadData) {
        localStorage.setItem("nola_builts_lead_data", JSON.stringify(user.leadData));
      }
      queryClient.setQueryData(["currentUser"], user);
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post("/auth/signup", userData);
      return response.data.user;
    },
    onSuccess: (user) => {
      localStorage.setItem("nola_builts_user", JSON.stringify(user));
      if (user.leadData) {
        localStorage.setItem("nola_builts_lead_data", JSON.stringify(user.leadData));
      }
      queryClient.setQueryData(["currentUser"], user);
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const response = await apiClient.put("/auth/profile", profileData);
      return response.data;
    },
    onSuccess: (updatedUser) => {
      const stored = localStorage.getItem("nola_builts_user");
      let token = "";
      if (stored) {
        try {
          token = JSON.parse(stored).token || "";
        } catch {}
      }
      const userWithToken = { ...updatedUser, token };
      localStorage.setItem("nola_builts_user", JSON.stringify(userWithToken));
      if (updatedUser.leadData) {
        localStorage.setItem("nola_builts_lead_data", JSON.stringify(updatedUser.leadData));
      }
      queryClient.setQueryData(["currentUser"], userWithToken);
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: async () => {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      const idToken = await result.user.getIdToken();
      const response = await apiClient.post("/auth/firebase-login", { idToken });
      return response.data.user;
    },
    onSuccess: (user) => {
      localStorage.setItem("nola_builts_user", JSON.stringify(user));
      if (user.leadData) {
        localStorage.setItem("nola_builts_lead_data", JSON.stringify(user.leadData));
      }
      queryClient.setQueryData(["currentUser"], user);
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });

  const logout = () => {
    localStorage.removeItem("nola_builts_user");
    localStorage.removeItem("nola_builts_lead_data");
    firebaseSignOut(firebaseAuth).catch((err) => console.error("Firebase SignOut error:", err));
    queryClient.setQueryData(["currentUser"], null);
    queryClient.clear();
  };

  return {
    user: userQuery.data || null,
    isLoading: userQuery.isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error ? (loginMutation.error as any).response?.data?.message || "Login failed" : null,
    signup: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error ? (signupMutation.error as any).response?.data?.message || "Signup failed" : null,
    loginWithGoogle: googleLoginMutation.mutateAsync,
    isLoggingInWithGoogle: googleLoginMutation.isPending,
    googleLoginError: googleLoginMutation.error ? (googleLoginMutation.error as any).response?.data?.message || "Google Login failed" : null,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending,
    logout,
  };
}
