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

function Typography({ style, variant, color, children }: TypographyProps) {
  const getClassName = (): string => {
    const className = new Array<string>();

    switch (variant) {
      case "h1":
        className.push("!text-h1 !font-light");
        break;
      case "h2":
        className.push("!text-h2 !font-light");
        break;
      case "h3":
        className.push("!text-h3 !font-regular");
        break;
      case "h4":
        className.push("!text-h4 !font-regular");
        break;
      case "h5":
        className.push("!text-h5 !font-regular");
        break;
      case "h6":
        className.push("!text-h6 !font-medium");
        break;
      case "subtitle1":
        className.push("!text-subtitle1 !font-regular");
        break;
      case "subtitle2":
        className.push("!text-subtitle2 !font-medium");
        break;
      case "body1":
        className.push("!text-body1 !font-regular");
        break;
      case "body2":
        className.push("!font-regular");
        break;
      case "caption":
        className.push("!text-caption !font-regular");
        break;
      case "overline":
        className.push("!text-overline !font-regular uppercase");
        break;
      default:
        className.push("block");
        break;
    }

    switch (color) {
      case "primary":
        className.push("text-primary-400");
        break;
      case "secondary":
        className.push("text-secondary-400");
        break;
      case "accent":
        className.push("text-accent-400");
        break;
      case "success":
        className.push("text-success-400");
        break;
      case "info":
        className.push("text-info-400");
        break;
      case "warning":
        className.push("text-warning-400");
        break;
      case "danger":
        className.push("text-danger-400");
        break;
      case "black":
        className.push("text-black");
        break;
      case "white":
        className.push("text-white");
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

export default Typography;
