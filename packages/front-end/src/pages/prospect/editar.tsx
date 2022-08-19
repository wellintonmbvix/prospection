import { useSearchParams } from "react-router-dom";
import { Card, PageHeader } from "../../components"
import ProspeccaoAtualizar from "../../features/prospeccoes/ProspeccaoAtualizar"

export default function Page() {  
  const [searchParams] = useSearchParams();

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
      <PageHeader title="Editar Prospecção" showGoBack />
       <Card elevation="md">
          <ProspeccaoAtualizar
            prospeccaoId={searchParams.get("id")}
          />
       </Card>        
      </div>
    </div>
  );
}
