import { FaPeopleGroup } from 'react-icons/fa6';

import { PiBuildingsBold } from "react-icons/pi";


export const ROUTES = {
  home: "/",
  login: "/auth/login",
  resetPassword: "/auth/reset-password",
  forgotPassword: "/auth/forgot-password",
  verifyOTP: "/auth/verify-otp",
  registration: "/auth/register",
  create_experience: "/app/admin/create-experience",
  my_experience: "/app/admin/my-experiences",
  participant: "/app/participant",
};

export const NAV_LINKS = [
  {
    key: 1,
    name: "Create Experience",
    Icon: FaPeopleGroup,
    route: ROUTES.create_experience,
  },
  {
    key: 2,
    name: "My Experience",
    Icon: PiBuildingsBold,
    route: ROUTES.my_experience,
  },
  // {
  //   key: 2,
  //   name: "Licenced Artisans",
  //   Icon: MdOutlineReceiptLong,
  //   route: ROUTES.create_experience,
  // },
 
];

