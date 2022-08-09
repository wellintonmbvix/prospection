import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../types";
import { GetUsersById } from "../../store/users";
import UserForm from "../../components/templates/Usuarios/Form";

export default function Page() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IUser>();
  const [searchParams] = useSearchParams();
  const {
    data: user,
    isLoading,
    isFetching,
  } = GetUsersById(searchParams.get("id"));

  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  const onSubmit = (value: IUser, _: any) => {};

  return (
    <div className="w-full h-full flex items-center grid justify-items-center">
      <div className="w-1/2">
        {user && (
          <UserForm
            title="Edição de Usuário"
            form={{
              control,
              errors,
              saving: false,
              onSubmit: handleSubmit(onSubmit),
            }}
          />
        )}
      </div>
    </div>
  );
}
