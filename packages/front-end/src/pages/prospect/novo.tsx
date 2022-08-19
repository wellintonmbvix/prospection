import { Card, PageHeader } from "../../components"
import ProspeccaoCriar from "../../features/prospeccoes/ProspeccaoCriar"

export default function Page() { 

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
       <PageHeader title="Nova Prospecção" showGoBack />
       <Card elevation="md">
          <ProspeccaoCriar />
       </Card>
      </div>
    </div>
  );
}
