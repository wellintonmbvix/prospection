import React from "react";
import UserForm, { UserFormProps } from "../../../organisms/forms/UserForm";
import { Card, PageHeader } from "../../../";

type UsersFormProps = {
  title: string;
  form: UserFormProps;
};

export default function Form({ title, form }: UsersFormProps) {
  return (
    <div className="flex flex-col m-4 md:m-8">
      <PageHeader title={title} showGoBack />
      <Card>
        <UserForm {...form} />
      </Card>
    </div>
  );
}
