import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IUser } from "../../types";
import UserForm from "../../components/templates/Usuarios/Form";
import { AddUser } from "../../store/users";

export default function Page() {
  const [isSaving, setIsSaving] = useState(false);

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      name: "",
      accessclassific: false,
      accessprospect: false,
      accessusers: false,
      password: "",
    },
  });

  const onSubmit = (value: IUser, _: any) => {
    const { isLoading, isSuccess, postResult, postUsuario } = AddUser(value);
    try {
      postUsuario();
      setIsSaving(isLoading);
      reset({
        name: "",
        password: "",
        accessclassific: false,
        accessprospect: false,
        accessusers: false,
      });
    } catch (erro) {
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center grid justify-items-center">
      <div className="w-1/2">
        <UserForm
          title="Novo Usuário"
          form={{
            control,
            errors,
            saving: isSaving,
            onSubmit: handleSubmit(onSubmit),
          }}
        />
      </div>
    </div>
  );
}
