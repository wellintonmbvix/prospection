import { useSearchParams } from "react-router-dom";
import { Card, PageHeader } from "../../components"
import UsuarioAtualizar from "../../features/usuarios/UsuarioAtualizar"

export default function Page() {  
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
      <PageHeader title="Editar Usuário" showGoBack />
       <Card elevation="md">
          <UsuarioAtualizar
            usuarioId={searchParams.get("id")}
          />
       </Card>        
      </div>
    </div>
  );
}
