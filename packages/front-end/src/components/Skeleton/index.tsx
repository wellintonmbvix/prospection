import * as React from "react";

type SkeletonProps = {
  variant?: "text" | "input" | "retangle" | "circle";
  width?: number | "full";
  height?: number | "full";
};

function Skeleton({
  variant = "retangle",
  height,
  width = "full",
}: SkeletonProps) {
  const variants = {
    text: "rounded-lg",
    input: "rounded",
    retangle: "",
    circle: "rounded-full",
  };

  return (
    <div
      className={`${variants[variant]} animate-pulse bg-gray-300`}
      style={{
        height: height !== "full" ? `${height}px` : "100%",
        width: width !== "full" ? `${width}px` : "100%",
      }}
    />
  );
}

export default Skeleton;
