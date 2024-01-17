import { IconType } from "react-icons";

export type NavProps = {
  setShowSidebar: (arg: boolean) => void;
  setTabWidth: (arg: string) => void;
};

export type SidebarProps = NavProps & {
  tabWidth: string;
  showSidebar: boolean;
};

export type NavLinksType = {
  key: number;
  name: string;
  Icon: IconType;
  route: string;
};
