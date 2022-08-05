import * as React from "react";
import Col from "./Col";
import Row from "./Row";

type GridProps = {
  children: React.ReactNode;
};

export default function Grid({ children }: GridProps) {
  return <div className="grid grid-flow-row gap-4">{children}</div>;
}

Grid.Row = Row;
Grid.Col = Col;

export { Row, Col };
