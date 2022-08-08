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
          <Button className="mr-2 stroke-gray-700 dark:stroke-gray-50" icon={ArrowLeftIcon} onClick={onGoBack} />
        )}
        <Typography variant="h1">{title}</Typography>
        <span className="flex-1" />
        {actions}
      </div>
      <hr className="mt-3 mb-8" />
    </>
  );
}
