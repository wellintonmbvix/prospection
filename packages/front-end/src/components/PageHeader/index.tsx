import * as React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Button } from "../../lib";
import Typography from "../Typography";

type PageHeaderProps = {
  title: string;
  showGoBack?: boolean;
  onGoBack?: () => void;
  actions?: React.ReactNode;
};

function PageHeader({ title, showGoBack, onGoBack, actions }: PageHeaderProps) {
  const navigate = useNavigate();
  onGoBack = () => navigate(-1);
  return (
    <>
      <div className="flex items-center">
        {showGoBack && (
          <Button
            onClick={onGoBack}
          >
            <HiArrowLeft className="flex-none hover:scale-125 w-5 h-5 cursor-pointer" />
          </Button>
        )}
        <Typography variant="h6">
          <div className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
          {title}
          </div>
        </Typography>
        <span className="flex-1" />
        {actions}
      </div>
      <hr className="mt-3 mb-8" />
    </>
  );
}

export default PageHeader;
