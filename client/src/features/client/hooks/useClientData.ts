import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/client";
import { SavedEstimate } from "../../../types";

export function useClientData() {
  const queryClient = useQueryClient();

  const estimatesQuery = useQuery({
    queryKey: ["estimates"],
    queryFn: async () => {
      const response = await apiClient.get<SavedEstimate[]>("/estimates");
      return response.data;
    },
    enabled: !!localStorage.getItem("nola_builts_user"),
    staleTime: 1000 * 60, // 1 minute
  });

  const saveEstimateMutation = useMutation({
    mutationFn: async (estimate: Omit<SavedEstimate, "id" | "date">) => {
      const response = await apiClient.post<SavedEstimate>("/estimates", estimate);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });

  const deleteEstimateMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.delete(`/estimates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estimates"] });
    },
  });

  const aiDesignMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiClient.post("/ai/suggestion", { prompt });
      return response.data;
    },
  });

  return {
    estimates: estimatesQuery.data || [],
    isLoadingEstimates: estimatesQuery.isLoading,
    saveEstimate: saveEstimateMutation.mutateAsync,
    isSavingEstimate: saveEstimateMutation.isPending,
    deleteEstimate: deleteEstimateMutation.mutate,
    isDeletingEstimate: deleteEstimateMutation.isPending,
    generateAIDesign: aiDesignMutation.mutateAsync,
    isGeneratingAIDesign: aiDesignMutation.isPending,
  };
}
