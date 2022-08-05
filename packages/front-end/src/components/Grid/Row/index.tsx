import * as React from "react";

export type GridRowProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Row({ children }: GridRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 content-evenly">{children}</div>
  );
}
