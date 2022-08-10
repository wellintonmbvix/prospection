import { Snackbar, Grid, Button, Form } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../hooks/useApi";
import { useState } from "react";

const { Row, Col } = Grid;
const { useSnackbar } = Snackbar;

export default function UsuarioCriar() {
  const snackbar = useSnackbar();
  const [isError, setIsError ] = useState(false);


  const { handleSubmit, control, reset } = useForm<IUser>({
    defaultValues: {
      name: "",
      password: "",
      accessusers: false,
      accessclassific: false,
      accessprospect: false,
    },
  });

  const postUsuario = async (usuario: IUser) => {
    const response = await api.post("/users/create", usuario)
    return response.status
  }

  const mutation = useMutation( postUsuario, {
    onError: () => {
        setIsError(true);
    }
  } );

  const { isLoading } = mutation;

  const onSubmit = (values: IUser, _: any) => {        
    mutation.mutate(values);
    if (!isError) {
      snackbar.success("Usuário criado com sucesso!");
      reset({
        name: "",
        password: "",
        accessusers: false,
        accessclassific: false,
        accessprospect: false,
      })
    }
    if (isError) {
      snackbar.error(`Erro ao criar usuário: ${mutation.error}`);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="relative">
              <Controller
                name="name"
                control={control}
                rules={{ required: `Nome de usuário é obrigatório` }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    name="name"
                    id="name"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                )}
              />
              <label
                htmlFor="name"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Nome de usuário
              </label>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                )}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Senha de acesso
              </label>
            </div>
          </Col>
        </Row>
        <Row>          
            <Col xs={12} sm={12} md={12} lg={6} xl={4}>
            <div className="flex mt-4">
              <div className="flex items-center mr-4">
                <Controller
                  name="accessusers"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="accessusers"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="accessusers"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Usuários
                </label>
              </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} xl={4}>
            <div className="flex mt-4">
              <div className="flex items-center mr-4">
                <Controller
                  name="accessclassific"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="accessclassific"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="accessclassific"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Classificação
                </label>
              </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={4}>
            <div className="flex mt-4">
              <div className="flex items-center mr-4">
                <Controller
                  name="accessprospect"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="accessprospect"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-1 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="accessprospect"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Prospecção
                </label>
              </div>
              </div>
            </Col>          
        </Row>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={1}>
            <Button type="submit" className="mt-4 px-6" color="success">
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
