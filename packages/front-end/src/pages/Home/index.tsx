import { Button } from "../../components";
import mydocumentPDF from "./mydocument";

export default function Home() {
  return (
    <div>
      <span className="text-xl font-semibold dark:text-white">Home</span>
      <Button onClick={(e) => mydocumentPDF()} color="primary" >Gerar PDF</Button>
    </div>
  );
}
