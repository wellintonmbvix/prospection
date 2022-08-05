import * as React from "react";

export type GriColProps = {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  children: React.ReactNode | React.ReactNode[];
};

export default function Col({
  span = 12,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
}: GriColProps) {
  const getSpan = () => {
    const colSpan = new Array<string>();

    switch (xs || span) {
      case 1:
        colSpan.push("col-span-1");
        break;
      case 2:
        colSpan.push("col-span-2");
        break;
      case 3:
        colSpan.push("col-span-3");
        break;
      case 4:
        colSpan.push("col-span-4");
        break;
      case 5:
        colSpan.push("col-span-5");
        break;
      case 6:
        colSpan.push("col-span-6");
        break;
      case 7:
        colSpan.push("col-span-7");
        break;
      case 8:
        colSpan.push("col-span-8");
        break;
      case 9:
        colSpan.push("col-span-9");
        break;
      case 10:
        colSpan.push("col-span-10");
        break;
      case 11:
        colSpan.push("col-span-11");
        break;
      case 12:
        colSpan.push("col-span-12");
        break;
      default:
        colSpan.push("col-span-12");
        break;
    }

    switch (sm || xs || span) {
      case 1:
        colSpan.push("sm:col-span-1");
        break;
      case 2:
        colSpan.push("sm:col-span-2");
        break;
      case 3:
        colSpan.push("sm:col-span-3");
        break;
      case 4:
        colSpan.push("sm:col-span-4");
        break;
      case 5:
        colSpan.push("sm:col-span-5");
        break;
      case 6:
        colSpan.push("sm:col-span-6");
        break;
      case 7:
        colSpan.push("sm:col-span-7");
        break;
      case 8:
        colSpan.push("sm:col-span-8");
        break;
      case 9:
        colSpan.push("sm:col-span-9");
        break;
      case 10:
        colSpan.push("sm:col-span-10");
        break;
      case 11:
        colSpan.push("sm:col-span-11");
        break;
      case 12:
        colSpan.push("sm:col-span-12");
        break;
    }

    switch (md || sm || xs || span) {
      case 1:
        colSpan.push("md:col-span-1");
        break;
      case 2:
        colSpan.push("md:col-span-2");
        break;
      case 3:
        colSpan.push("md:col-span-3");
        break;
      case 4:
        colSpan.push("md:col-span-4");
        break;
      case 5:
        colSpan.push("md:col-span-5");
        break;
      case 6:
        colSpan.push("md:col-span-6");
        break;
      case 7:
        colSpan.push("md:col-span-7");
        break;
      case 8:
        colSpan.push("md:col-span-8");
        break;
      case 9:
        colSpan.push("md:col-span-9");
        break;
      case 10:
        colSpan.push("md:col-span-10");
        break;
      case 11:
        colSpan.push("md:col-span-11");
        break;
      case 12:
        colSpan.push("md:col-span-12");
        break;
      default:
        colSpan.push("md:col-span-12");
        break;
    }

    switch (lg || md || sm || xs || span) {
      case 1:
        colSpan.push("lg:col-span-1");
        break;
      case 2:
        colSpan.push("lg:col-span-2");
        break;
      case 3:
        colSpan.push("lg:col-span-3");
        break;
      case 4:
        colSpan.push("lg:col-span-4");
        break;
      case 5:
        colSpan.push("lg:col-span-5");
        break;
      case 6:
        colSpan.push("lg:col-span-6");
        break;
      case 7:
        colSpan.push("lg:col-span-7");
        break;
      case 8:
        colSpan.push("lg:col-span-8");
        break;
      case 9:
        colSpan.push("lg:col-span-9");
        break;
      case 10:
        colSpan.push("lg:col-span-10");
        break;
      case 11:
        colSpan.push("lg:col-span-11");
        break;
      case 12:
        colSpan.push("lg:col-span-12");
        break;
      default:
        colSpan.push("lg:col-span-12");
        break;
    }

    switch (xl || lg || md || sm || xs || span) {
      case 1:
        colSpan.push("xl:col-span-1");
        break;
      case 2:
        colSpan.push("xl:col-span-2");
        break;
      case 3:
        colSpan.push("xl:col-span-3");
        break;
      case 4:
        colSpan.push("xl:col-span-4");
        break;
      case 5:
        colSpan.push("xl:col-span-5");
        break;
      case 6:
        colSpan.push("xl:col-span-6");
        break;
      case 7:
        colSpan.push("xl:col-span-7");
        break;
      case 8:
        colSpan.push("xl:col-span-8");
        break;
      case 9:
        colSpan.push("xl:col-span-9");
        break;
      case 10:
        colSpan.push("xl:col-span-10");
        break;
      case 11:
        colSpan.push("xl:col-span-11");
        break;
      case 12:
        colSpan.push("xl:col-span-12");
        break;
      default:
        colSpan.push("xl:col-span-12");
        break;
    }

    switch (xxl || xl || lg || md || sm || xs || span) {
      case 1:
        colSpan.push("xxl:col-span-1");
        break;
      case 2:
        colSpan.push("xxl:col-span-2");
        break;
      case 3:
        colSpan.push("xxl:col-span-3");
        break;
      case 4:
        colSpan.push("xxl:col-span-4");
        break;
      case 5:
        colSpan.push("xxl:col-span-5");
        break;
      case 6:
        colSpan.push("xxl:col-span-6");
        break;
      case 7:
        colSpan.push("xxl:col-span-7");
        break;
      case 8:
        colSpan.push("xxl:col-span-8");
        break;
      case 9:
        colSpan.push("xxl:col-span-9");
        break;
      case 10:
        colSpan.push("xxl:col-span-10");
        break;
      case 11:
        colSpan.push("xxl:col-span-11");
        break;
      case 12:
        colSpan.push("xxl:col-span-12");
        break;
      default:
        colSpan.push("xxl:col-span-12");
        break;
    }

    return colSpan.join(" ").trim();
  };

  return <div className={`h-fit ${getSpan()}`}>{children}</div>;
}
