import { Stats } from "@/types/stats";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdQuestionMark } from "react-icons/md";

export const stats: Stats[] = [
  {
    id: "1",
    icon: IoIosPeople,
    statNumber: "0 of 20",
    statLabel: "PARTICIPANTS",
  },
  {
    id: "2",
    icon: MdQuestionMark,
    statNumber: "1 of 28",
    statLabel: "QUESTIONS",
  },
  {
    id: "3",
    icon: FaCheck,
    statNumber: "1",
    statLabel: "ANSWERS",
  },
  {
    id: "4",
    icon: FaRegCheckCircle,
    statNumber: "1",
    statLabel: "Q1 ANSWERS",
  },
];
