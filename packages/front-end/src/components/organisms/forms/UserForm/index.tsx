import React, { FormEventHandler } from "react";
import { Control, Controller } from "react-hook-form";
import { Button, Grid } from "../../../";
import { Usuario } from "../../../../types";

const { Row, Col } = Grid;

export type UserFormProps = {
  control: Control<Usuario, object>;
  errors?: any;
  saving?: boolean;
  onSubmit?: FormEventHandler<HTMLFormElement>;
};

export default function UserForm({
  control,
  onSubmit,
  errors = {},
  saving,
}: UserFormProps) {
  return (
    <>
      <form className="" onSubmit={onSubmit}>
        <Row>
          <Col sm={18} md={6}>
            <div className="relative">
              <Controller
                name="nomeUsuario"
                control={control}
                rules={{ required: `Nome de usuário é obrigatório`}}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="nomeUsuario"                    
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                )}
              />
              <label
                htmlFor="nomeUsuario"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Nome de usuário
              </label>
            </div>
          </Col>
          <Col sm={18} md={6}>
            <div className="relative">
              <Controller
                name="senhaAcesso"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="senhaAcesso"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                )}
              />
              <label
                htmlFor="senhaAcesso"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-25 top-2 z-10 origin-[0] bg-gray-100 dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Senha de acesso
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={18} md={18}>
            <div className="flex mt-4">
              <div className="flex items-center mr-4">
                <Controller
                  name="acessoUsuarios"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="acessoUsuarios"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="acessoUsuarios"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Usuários
                </label>
              </div>

              <div className="flex items-center mr-4">
                <Controller
                  name="acessoSeguimentos"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="acessoSeguimentos"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="acessoSeguimentos"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Classificação
                </label>
              </div>

              <div className="flex items-center mr-4">
                <Controller
                  name="acessoProspeccao"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <input
                      id="acessoProspeccao"
                      type="checkbox"
                      checked={value}
                      onChange={onChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  )}
                />
                <label
                  htmlFor="acessoProspeccao"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Acesso Prospecção
                </label>
              </div>
            </div>
          </Col>
        </Row>
        <Button type="submit" className="mt-6 px-5" color="success">
          {saving ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </>
  );
}
