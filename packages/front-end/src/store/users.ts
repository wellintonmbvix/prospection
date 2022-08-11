import { api } from "../hooks/useApi";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Usuario } from "../types";
import { useState } from "react";
import { AxiosError } from "axios";

export function GetUsersAll() {
  const { data, isFetching, isLoading, error } = useQuery(
    ["users"],
    async () => {
      const response = await api.get("/users");

      return response.data;
    });

  return { data, isFetching, isLoading, error };
}

export function GetUsersById(id: string | null) {
  const { data, isFetching, isLoading, error } = useQuery(
    ["users"],
    async () => {
      const response = await api.get(`/users/${id}`);

      return response.data;
    }
  );

  return { data, isFetching, isLoading, error };
}

export function useAddUser(usuario: Usuario){
  const [postResult, setPostResult] = useState({}); 

  const { isLoading, isSuccess, mutate: postUsuario }   = useMutation(
    async () => {
      return await api.post("/users/create", usuario)
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data,
        };
        setPostResult(JSON.stringify(result));
      },
      onError: (err: AxiosError) => {
        setPostResult(JSON.stringify(err.response?.data))
      }
    }
  )

  return {isLoading, postUsuario, postResult, isSuccess}
}