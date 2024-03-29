import * as React from "react";
import SimpleBar from "simplebar-react";
import Rodape from "../Footer";

import "simplebar-react/dist/simplebar.min.css";

export interface ContentProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function Content({ children }: ContentProps) {
  return (
    <>
      <div
        className="w-auto h-screen pb-36 flex flex-col overflow-auto scroll-smooth"
        //style={{ overflowY: "auto", height: "100vh" }}
      >
        {children}
      </div>
      <Rodape />
    </>
  );
}
