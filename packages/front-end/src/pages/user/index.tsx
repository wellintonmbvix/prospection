import { useNavigate } from "react-router-dom";
import { PlusSmIcon } from "@heroicons/react/solid";
import UsuarioListar from "../../features/usuarios/UsuarioListar";
import { Button, Card, PageHeader } from "../../components";

export default function Page() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
        <PageHeader
          title="Usuários"
          actions={
            <Button
              icon={PlusSmIcon}
              onClick={() => {
                navigate("/users/novo");
              }}
              color="primary"
            >
              Novo
            </Button>
          }
        />
        <Card elevation="md">
          <UsuarioListar />
        </Card>
      </div>
    </div>
  );
}
