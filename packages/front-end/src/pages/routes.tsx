import type { ComponentProps, FC, ReactNode } from "react";
import { HiCollection, HiHome, HiUsers, HiBookOpen } from "react-icons/hi";
import { Route } from "react-router-dom";

import Users from "./user";
import Home from "./home";
import Classifications from "./classification";
import Prospects from "./prospect";

import { ProtectedLayout } from "../components/ProtectedLayout";
import { AppLayout } from "../components";

export type ComponentCardItem = {
  className: string;
  images: { light: string; dark: string };
};

export type RouteProps = {
  title: string;
  icon?: FC<ComponentProps<"svg">>;
  href: string;
  component?: ReactNode;
  group?: boolean;
  card?: ComponentCardItem;
};

export const routes: RouteProps[] = [
  {
    title: "Home",
    icon: HiHome,
    href: "/home",
    component: (
      <ProtectedLayout>        
        <Route children={<Home />} />        
      </ProtectedLayout>
    ),
    group: false,
  },
  {
    title: "Usuários",
    icon: HiUsers,
    href: "/users",
    component: (
      <ProtectedLayout>
        <Route children={<Users />} />
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
        <Route children={<Classifications />} />
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
        <Route children={<Prospects />} />
      </ProtectedLayout>
    ),
    group: false,
  },
];
