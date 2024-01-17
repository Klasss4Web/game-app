import { FaPeopleGroup } from 'react-icons/fa6';
import { BsPersonAdd, BsPersonCheck } from 'react-icons/bs';
import { MdOutlineNotificationsActive, MdOutlineReceiptLong } from 'react-icons/md';
import { PiStickerBold, PiBuildingsBold } from "react-icons/pi";
import { RiQuestionnaireLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { RiBarChartFill } from 'react-icons/ri';

import { NavLinksType } from '@/types/navigation';

export const ROUTES = {
  home: "/",
  login: "/auth/login",
  resetPassword: "/auth/reset-password",
  forgotPassword: "/auth/forgot-password",
  verifyOTP: "/auth/verify-otp",
  registration: "/registration",
  create_experience: "/admin/create-experience",
  personalInfo: "/registration/personal-details",
  professionalInfo: "/registration/professional-details",
  businessInfo: "/registration/business-information",
  applicationReview: "/registration/application-review",
  artisans: "/dashboard/artisans",
  licencedArtisans: "/dashboard/licenced-artisans",
  questions: "/dashboard/artisan-questions",
  licenseRenewals: "/dashboard/license-renewals",
  roles: "/dashboard/roles-permissions",
  artisanHome: "/dashboard/artisan-home",
  artisanUpdates: "/dashboard/artisan-updates",
  artisanProjects: "/dashboard/artisan-projects",
  artisanMore: "/dashboard/artisan-more",
  employers: "/dashboard/employers",
  contact: "/contact-us",
  programmes: "/programmes",
  marketPlace: "/all-artisans",
  userProfile: "/dashboard/user-profile",
};

export const NAV_LINKS = [
  {
    key: 1,
    name: "Artisans",
    Icon: FaPeopleGroup,
    route: ROUTES.artisans,
  },
  {
    key: 2,
    name: "Licenced Artisans",
    Icon: MdOutlineReceiptLong,
    route: ROUTES.licencedArtisans,
  },
  {
    key: 3,
    name: "Employers",
    Icon: PiBuildingsBold,
    route: ROUTES.employers,
  },
  {
    key: 4,
    name: "Questions",
    Icon: RiQuestionnaireLine,
    route: ROUTES.questions,
  },
  {
    key: 5,
    name: "License Renewals",
    Icon: PiStickerBold,
    route: ROUTES.licenseRenewals,
  },
  {
    key: 6,
    name: "Roles & Permissions",
    Icon: BsPersonCheck,
    route: ROUTES.roles,
  },
];

export const BOTTOM_NAV_LINKS: NavLinksType[] = [
  {
    key: 1,
    name: 'Home',
    Icon: RiBarChartFill,
    route: ROUTES.artisanHome,
  },
  {
    key: 2,
    name: 'Updates',
    Icon: MdOutlineNotificationsActive,
    route: ROUTES.artisanUpdates,
  },
  {
    key: 3,
    name: 'Projects/Gigs',
    Icon: HiOutlineBuildingOffice2,
    route: ROUTES.artisanProjects,
  },
  {
    key: 4,
    name: 'More',
    Icon: BsPersonAdd,
    route: ROUTES.artisanMore,
  },
];
