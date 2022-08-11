import { Card, PageHeader } from "../../components"
import UsuarioCriar from "../../features/usuarios/UsuarioCriar"

export default function Page() { 

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
       <PageHeader title="Novo Usuário" showGoBack />
       <Card elevation="md">
          <UsuarioCriar />
       </Card>
      </div>
    </div>
  );
}
