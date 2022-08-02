import Head from "../Head";
import Rodape from "../Footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-screen h-screen">
      <Head />
      {children}
      <div className="absolute bottom-0 left-0">
        <Rodape />
      </div>
    </div>
  );
}
