import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../../api/client";

export function useAdminData() {
  const queryClient = useQueryClient();

  const leadsQuery = useQuery({
    queryKey: ["adminLeads"],
    queryFn: async () => {
      const response = await apiClient.get("/projects/leads");
      return response.data;
    },
    staleTime: 1000 * 30, // 30 seconds
  });

  const createLeadMutation = useMutation({
    mutationFn: async (lead: any) => {
      const response = await apiClient.post("/projects/leads", lead);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeads"] });
    },
  });

  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/projects/leads/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeads"] });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete(`/projects/leads/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminLeads"] });
    },
  });

  const projectsQuery = useQuery({
    queryKey: ["adminProjects"],
    queryFn: async () => {
      const response = await apiClient.get("/projects/projects");
      return response.data;
    },
    staleTime: 1000 * 30,
  });

  const createProjectMutation = useMutation({
    mutationFn: async (project: any) => {
      const response = await apiClient.post("/projects/projects", project);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
    },
  });

  const useProjectDetail = (id: string) => {
    return useQuery({
      queryKey: ["adminProject", id],
      queryFn: async () => {
        const response = await apiClient.get(`/projects/projects/${id}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiClient.put(`/projects/projects/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["adminProjects"] });
      queryClient.invalidateQueries({ queryKey: ["adminProject", data.id] });
    },
  });

  const eventsQuery = useQuery({
    queryKey: ["adminEvents"],
    queryFn: async () => {
      const response = await apiClient.get("/projects/events");
      return response.data;
    },
    staleTime: 1000 * 30,
  });

  const createEventMutation = useMutation({
    mutationFn: async (event: any) => {
      const response = await apiClient.post("/projects/events", event);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminEvents"] });
    },
  });

  return {
    leads: leadsQuery.data || [],
    isLoadingLeads: leadsQuery.isLoading,
    createLead: createLeadMutation.mutate,
    isCreatingLead: createLeadMutation.isPending,
    updateLead: updateLeadMutation.mutate,
    isUpdatingLead: updateLeadMutation.isPending,
    deleteLead: deleteLeadMutation.mutate,
    isDeletingLead: deleteLeadMutation.isPending,
    
    projects: projectsQuery.data || [],
    isLoadingProjects: projectsQuery.isLoading,
    useProjectDetail,
    createProject: createProjectMutation.mutate,
    isCreatingProject: createProjectMutation.isPending,
    updateProject: updateProjectMutation.mutate,
    isUpdatingProject: updateProjectMutation.isPending,

    events: eventsQuery.data || [],
    isLoadingEvents: eventsQuery.isLoading,
    createEvent: createEventMutation.mutate,
    isCreatingEvent: createEventMutation.isPending,
  };
}
