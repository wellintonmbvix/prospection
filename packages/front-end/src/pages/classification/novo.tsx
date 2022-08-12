import { Card, PageHeader } from "../../components"
import SeguimentoCriar from "../../features/seguimentos/SeguimentoCriar"

export default function Page() { 

  return (
    <div className="w-full h-full mt-4 flex flex-column items-start grid justify-items-center">
      <div className="w-1/2">
       <PageHeader title="Novo Seguimento" showGoBack />
       <Card elevation="md">
          <SeguimentoCriar />
       </Card>
      </div>
    </div>
  );
}
