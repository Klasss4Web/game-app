import { IconType } from "react-icons";

export type Stats = {
  id: string;
  key: string | number;
  icon: IconType;
  statNumber: string;
  statLabel: string;
};
