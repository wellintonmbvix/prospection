/* eslint-disable react-hooks/rules-of-hooks */
import {
  Snackbar,
  Grid,
  Button,
  Form,
  Spinner,
  Input,
  Select,
  Checkbox,
  TextArea,
} from "../../components";
import { Controller, useForm } from "react-hook-form";
import { Prospeccao, Seguimento } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../hooks/useApi";
import { AxiosError } from "axios";
import InputMask from "react-input-mask";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
  useEffect,
} from "react";
import { useAuth } from "../../contexts/Auth/useAuth";

const { Row, Col } = Grid;
const { useSnackbar } = Snackbar;

export default function ProspeccaoCriar() {
  const auth = useAuth();
  const snackbar = useSnackbar();
  const [uf, setUf] = useState("ES");
  const [listaUf, setListaUf] = useState<any>([]);
  const [cidade, setCidade] = useState("");
  const [listaCidade, setListaCidade] = useState<any>([]);

  function loadUf() {
    let url = "https://servicodados.ibge.gov.br/";
    url = url + "api/v1/localidades/estados";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.sort((a: { nome: string }, b: { nome: any }) =>
          a.nome.localeCompare(b.nome)
        );
        setListaUf([...data]);
      });
  }

  function loadCidade(id: string) {
    api.get(`/cities?uf=${id}`).then((results) => {
      results?.data.sort((a: any, b: any) =>
        a.nomeCidade.localeCompare(b.nomeCidade)
      );
      setListaCidade([...results.data]);
    });
  }

  const { handleSubmit, control, reset } = useForm<Prospeccao>({
    defaultValues: {
      ativo: true,
      cidade: "",
      email1: "",
      email2: "",
      estado: "",
      id_seguimento: "",
      id_usuario: "",
      nomeContato: "",
      nomeEmpresa: "",
      nomeSistema: "",
      observacao: "",
      proximoContato: "",
      telefone1: "",
      telefone2: "",
    },
  });

  const { data: seguimentos } = useQuery<Seguimento[] | any>(
    ["seguimentos"],
    async () => {
      const response = await api.get("/ratings");

      return response.data;
    }
  );

  const options = seguimentos?.map((d: Seguimento) => ({
    seguimentoId: d.seguimentoId,
    descricao: d.descricao,
  }));

  const [seguimento, setSeguimento] = useState(options);

  const postProspeccao = async (prospeccao: Prospeccao) => {
    const response = await api.post("/prospects/create", prospeccao);
    return response.statusText;
  };

  const mutation = useMutation(postProspeccao, {
    onSuccess: () => {
      snackbar.success("Prospecção criada com sucesso!");
      reset({
        ativo: true,
        cidade: "",
        email1: "",
        email2: "",
        estado: "",
        id_seguimento: "",
        id_usuario: "",
        nomeContato: "",
        nomeEmpresa: "",
        nomeSistema: "",
        observacao: "",
        proximoContato: "",
        telefone1: "",
        telefone2: "",
      });
    },
    onError: (error: AxiosError) => {
      snackbar.error(
        `Erro na criação de prospecção. ${JSON.stringify(error.response?.data)}`
      );
    },
  });

  const { isLoading } = mutation;

  const onSubmit = (values: Prospeccao, _: any) => {
    values.id_usuario = auth.usuarioId;
    values.cidade = cidade;
    values.id_seguimento = seguimento.seguimentoId;
    values.estado = uf;
    mutation.mutate(values);
  };

  useEffect(() => {
    loadUf();
  }, []);

  useEffect(() => {
    if (uf) {
      loadCidade(uf);
    }
  }, [uf]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="nomeEmpresa"
              control={control}
              render={({ field }) => (
                <Input {...field} labelInput="Empresa" type="text" />
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="nomeContato"
              control={control}
              render={({ field }) => (
                <Input {...field} labelInput="Contato" type="text" />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="telefone1"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputMask
                  mask="(99) 9999-9999"
                  value={value}
                  onChange={onChange}
                >
                  <Input labelInput="Tel. Fixo" type="text" />
                </InputMask>
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="telefone2"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputMask
                  mask="(99) 99999-9999"
                  value={value}
                  onChange={onChange}
                >
                  <Input labelInput="Tel. Cel." type="text" />
                </InputMask>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="email1"
              control={control}
              render={({ field }) => (
                <Input labelInput="Email de Contato 1" type="text" {...field} />
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="email2"
              control={control}
              render={({ field }) => (
                <Input labelInput="Email de Contato 2" type="text" {...field} />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={6} xl={6}>
            <Controller
              name="id_seguimento"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  selectLabel="Seguimento"
                  value={value}
                  onChange={(e) => {
                    onChange();
                    setSeguimento(e);
                  }}
                  options={options}
                  mapOptionToLabel={(seguimento: any) => seguimento?.descricao}
                  mapOptionToValue={(seguimento: any) =>
                    seguimento?.seguimentoId
                  }
                />
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <Controller
              name="estado"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <select
                    {...field}
                    id="select_uf"
                    value={uf}
                    onChange={(e) => setUf(e.target.value)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  >
                    {listaUf.map(
                      (
                        a: {
                          id: string | number | readonly string[] | undefined;
                          sigla:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | ReactFragment
                            | ReactPortal
                            | null
                            | undefined;
                          nome:
                            | string
                            | number
                            | boolean
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | ReactFragment
                            | ReactPortal
                            | null
                            | undefined;
                        },
                        b: any
                      ) => (
                        <option value={`${a.sigla}`}>{a.sigla}</option>
                      )
                    )}
                  </select>
                  <label
                    htmlFor="select_uf"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                  >
                    Estado
                  </label>
                </div>
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <Controller
              name="cidade"
              control={control}
              render={({ field: { onChange } }) => (
                <div className="relative">
                  <select
                    id="select_cidade"
                    value={cidade}
                    onChange={(e) => {
                      setCidade(e.target.value);
                      onChange();
                    }}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  >
                    {listaCidade.map(
                      (
                        a: {
                          counter:
                            | string
                            | number
                            | readonly string[]
                            | undefined;
                          nomeCidade:
                            | string
                            | number
                            | boolean
                            | ReactFragment
                            | ReactPortal
                            | ReactElement<
                                any,
                                string | JSXElementConstructor<any>
                              >
                            | null
                            | undefined;
                        },
                        b: any
                      ) => (
                        <option value={a.counter} key={`${a.counter}`}>
                          {a.nomeCidade}
                        </option>
                      )
                    )}
                  </select>
                  <label
                    htmlFor="select_cidade"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                  >
                    Cidade
                  </label>
                </div>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <Controller
              name="proximoContato"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputMask mask="99/9999" value={value} onChange={onChange}>
                  <Input
                    id="proximoContato"
                    name="proximoContato"
                    labelInput="Próx. Contato"
                    type="text"
                  />
                </InputMask>
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={4} xl={4}>
            <Controller
              name="nomeSistema"
              control={control}
              render={({ field }) => (
                <Input
                  id="nomeSistema"
                  labelInput="Nome Sistema"
                  type="text"
                  {...field}
                />
              )}
            />
          </Col>
          <Col xs={12} sm={12} md={12} lg={2} xl={2}>
            <Controller
              name="ativo"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  idCheckbox="ativo"
                  textCaption="Ativo"
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Controller
              name="observacao"
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  itemRef="observacao"
                  nameComponent="observacao"
                  textCaption="Observação"
                />
              )}
            />
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
