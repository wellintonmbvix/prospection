import { getUserLocalStorage } from "../contexts/Auth/util";
import { api } from "../hooks/useApi";
import { useQuery } from "@tanstack/react-query";

const user = getUserLocalStorage();

export function GetUsersAll() {
  const { data, isFetching, isLoading, error } = useQuery(
    ["users"],
    async () => {
      const response = await api.get("/users", {
        headers: { Authorization: `${user.token}` },
      });

      return response.data;
    });

  return { data, isFetching, isLoading, error };
}

export function GetUsersById(id: string | null) {
  const { data, isFetching, isLoading, error } = useQuery(
    ["users"],
    async () => {
      const response = await api.get(`/users/${id}`, {
        headers: { Authorization: `${user.token}` },
      });

      return response.data;
    }
  );

  return { data, isFetching, isLoading, error };
}
