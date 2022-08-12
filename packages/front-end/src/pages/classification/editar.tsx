import { useSearchParams } from "react-router-dom";
import { Card, PageHeader } from "../../components"
import SeguimentoAtualizar from "../../features/seguimentos/SeguimentoAtualizar"

export default function Page() {  
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
      <PageHeader title="Editar Seguimento" showGoBack />
       <Card elevation="md">
          <SeguimentoAtualizar
            seguimentoId={searchParams.get("id")}
          />
       </Card>        
      </div>
    </div>
  );
}
