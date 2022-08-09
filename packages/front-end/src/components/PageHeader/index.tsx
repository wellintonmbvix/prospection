import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Button from "../Button";
import Typography from "../Typography";

type PageHeaderProps = {
  title: string;
  showGoBack?: boolean;
  onGoBack?: () => void;
  actions?: React.ReactNode;
};

export default function PageHeader({
  title,
  showGoBack,
  onGoBack,
  actions,
}: PageHeaderProps) {
  const navigate = useNavigate();
  onGoBack = () => navigate(-1);

  return (
    <>
      <div className="flex items-center">
        {showGoBack && (
          <ArrowLeftIcon className="w-5 h-5 fill-gray-700 stroke-gray-700 dark:fill-gray-50 dark:stroke-gray-50 hover:cursor-pointer mr-2 mt-2" onClick={onGoBack} />
        )}
        <Typography variant="h1">{title}</Typography>
        <span className="flex-1" />
        {actions}
      </div>
      <hr className="mt-3 mb-8" />
    </>
  );
}
