import * as React from "react";
import { Color } from "../types";

export interface TypographyProps {
  style?: React.CSSProperties;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline"
    | undefined;
  color?: Color | "white" | "black" | undefined;
  children: React.ReactNode | string;
}

export default function Typography({
  style,
  variant,
  color,
  children,
}: TypographyProps) {
  const getClassName = (): string => {
    const className = new Array<string>();

    switch (color) {
      case "primary":
        className.push("text-blue-400");
        break;
      case "secondary":
        className.push("text-purple-400");
        break;
      case "success":
        className.push("text-green-400");
        break;
      case "warning":
        className.push("text-yellow-400");
        break;
      case "danger":
        className.push("text-red-400");
        break;
      default:
        className.push(
          variant !== "overline" &&
            variant !== "subtitle1" &&
            variant !== "subtitle2"
            ? "text-black"
            : "text-gray-400"
        );
        break;
    }

    className.push("truncate");

    return className.join(" ");
  };

  switch (variant) {
    case "h1":
      return (
        <h1 className={getClassName()} style={style}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={getClassName()} style={style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={getClassName()} style={style}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={getClassName()} style={style}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={getClassName()} style={style}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={getClassName()} style={style}>
          {children}
        </h6>
      );
    default:
      return (
        <span className={getClassName()} style={style}>
          {children}
        </span>
      );
  }
}
