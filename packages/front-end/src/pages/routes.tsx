import type { ComponentProps, FC, ReactNode } from "react";
import Users from "./user";
import Classifications from "./classification";
import Prospects from "./prospect/indext";

import { HiCollection, HiHome, HiUsers, HiBookOpen } from "react-icons/hi";
import { ProtectedLayout } from "../components/ProtectedLayout";

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
    component: (
      <ProtectedLayout>
        <Users />
      </ProtectedLayout>
    ),
    group: false,
  },
  {
    title: "Classificação",
    icon: HiCollection,
    href: "/classification",
    component: (
      <ProtectedLayout>
        <Classifications />
      </ProtectedLayout>
    ),
    group: false,
  },
  {
    title: "Prospecções",
    icon: HiBookOpen,
    href: "/prospects",
    component: (
      <ProtectedLayout>
        <Prospects />
      </ProtectedLayout>
    ),
    group: false,
  },
];
