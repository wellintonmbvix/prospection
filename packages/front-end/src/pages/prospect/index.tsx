import { useNavigate } from "react-router-dom";
import { PlusSmIcon } from "@heroicons/react/solid";
import ProspeccaoListar from "../../features/prospeccoes/ProspeccaoListar";
import { Button, Card, PageHeader } from "../../components";

export default function Prospects() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
        <PageHeader
          title="Seguimentos"
          actions={
            <Button
              icon={PlusSmIcon}
              onClick={() => {
                navigate("/prospects/novo");
              }}
              color="primary"
            >
              Novo
            </Button>
          }
        />
        <Card elevation="md">
          <ProspeccaoListar />
        </Card>
      </div>
    </div>
  );
}