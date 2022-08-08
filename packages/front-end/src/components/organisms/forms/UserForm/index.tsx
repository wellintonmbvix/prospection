import React, { FormEventHandler } from "react";
import { Control, Controller } from "react-hook-form";
import { Button, Form, Grid, Input } from "../../../";
import { IUser } from "../../../../types";

const { Row, Col } = Grid;

export type UserFormProps = {
  control: Control<IUser, object>;
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
        <Form onSubmit={onSubmit}>
          <Row>
            <Col sm={18} md={6}>
              <div className="relative z-0 mb-6 w-full group">
                <Form.Item label="Nome" nameInput="name">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} error={errors.name?.message} />
                    )}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Button type="submit" className="mt-2">
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </Form>
      
    </>
  );
}
