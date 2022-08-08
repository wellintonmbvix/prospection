import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../types";
import { GetUsersById } from "../../store/users";
import UserForm from "../../components/templates/Usuarios/Form";

export default function EditarUsers() {
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
            title="Editar cor"
            form={{
              control,
              errors,
              saving: true,
              onSubmit: handleSubmit(onSubmit),
            }}
          />
        )}
      </div>
    </div>
  );
}
