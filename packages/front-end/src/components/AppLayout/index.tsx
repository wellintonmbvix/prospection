import Head from "../Head";
import Content from "../Content";

import "simplebar-react/dist/simplebar.min.css";

export interface AppLayoutProps {
  children?: React.ReactNode | React.ReactNode[];
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col w-screen h-screen bg-gray-50 dark:bg-gray-600" id="container-geral">
      <Head />
      <Content>{children}</Content>      
    </div>    
  );
}
