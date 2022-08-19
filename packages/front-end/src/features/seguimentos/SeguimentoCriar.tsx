import { Snackbar, Grid, Button, Form, Spinner } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { Seguimento } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";

const { Row, Col } = Grid;
const { useSnackbar } = Snackbar;

export default function SeguimentoCriar() {  
  
  const snackbar = useSnackbar();  

  const { handleSubmit, control, reset } = useForm<Seguimento>({
    defaultValues: {
      descricao: "",
    },
  });

  const postSeguimento = async (seguimento: Seguimento) => {
    const response = await api.post("/ratings/create", seguimento);
    return response.statusText;
  };

  const mutation = useMutation(postSeguimento, {
    onSuccess: () => {
      snackbar.success("Seguimento criado com sucesso!");
      reset({
        descricao: "",
      });
    },
    onError: (error: AxiosError) => {
      snackbar.error(
        `Erro na criação de seguimento. ${JSON.stringify(error.response?.data)}`
      );
    },
  });

  const { isLoading } = mutation;

  const onSubmit = (values: Seguimento, _: any) => {
    mutation.mutate(values);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="relative">
              <Controller
                name="descricao"
                control={control}
                rules={{ required: `Campo seguimento é obrigatório` }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    name="descricao"
                    id="descricao"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    autoFocus
                  />
                )}
              />
              <label
                htmlFor="descricao"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Seguimento
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={1}>
            {isLoading ? (
              <Button type="submit" className="mt-4" color="success">
                <Spinner color="gray" size="xs" />
                Salvando
              </Button>
            ) : (
              <Button type="submit" className="mt-4" color="success">
                Salvar
              </Button>
            )}
          </Col>
        </Row>        
      </Form>
    </>
  );
}
