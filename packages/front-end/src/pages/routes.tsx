import type { ComponentProps, FC, ReactNode } from "react";
import Users from "./user/Users";
import Classifications from "./classification";
import Prospects from "./prospect/Prospects";

import { HiCollection, HiHome, HiUsers, HiBookOpen } from "react-icons/hi";

export type ComponentCardItem = {
  className: string;
  images: { light: string; dark: string };
};

export type RouteProps = {
  title: string;
  icon: FC<ComponentProps<"svg">>;
  href: string;
  component: ReactNode;
  group: boolean;
  card?: ComponentCardItem;
};

export const routes: RouteProps[] = [
  {
    title: "Home",
    icon: HiHome,
    href: "/",
    component: "",
    group: false,
  },
  {
    title: "Usuários",
    icon: HiUsers,
    href: "/users",
    component: <Users />,
    group: false,
  },
  {
    title: "Classificação",
    icon: HiCollection,
    href: "/classification",
    component: <Classifications />,
    group: false,
  },
  {
    title: "Prospecções",
    icon: HiBookOpen,
    href: "/prospects",
    component: <Prospects />,
    group: false,
  },
];
