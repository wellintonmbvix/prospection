import { useNavigate } from "react-router-dom";
import { PlusSmIcon } from "@heroicons/react/solid";
import SeguimentoListar from "../../features/seguimentos/SeguimentoListar";
import { Button, Card, PageHeader } from "../../components";

export default function Classification() {
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
                navigate("/classification/novo");
              }}
              color="primary"
            >
              Novo
            </Button>
          }
        />
        <Card elevation="md">
          <SeguimentoListar />
        </Card>
      </div>
    </div>
  );
}
