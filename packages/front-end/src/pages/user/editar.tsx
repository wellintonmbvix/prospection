import { useSearchParams } from "react-router-dom";
import { Card, PageHeader } from "../../components"
import UsuarioAtualizar from "../../features/usuarios/UsuarioAtualizar"

export default function Page() {  
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full h-full flex items-center grid justify-items-center">
      <div className="w-1/2">
      <PageHeader title="Novo Usuário" showGoBack />
       <Card elevation="md">
          <UsuarioAtualizar
            usuarioId={searchParams.get("id")}
          />
       </Card>        
      </div>
    </div>
  );
}
