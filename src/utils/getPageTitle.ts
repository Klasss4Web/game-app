import { ROUTES } from "@/constants/pageRoutes";

export const getComponentTitle = (pathname: string) => {
  switch (pathname) {
    case ROUTES.artisans:
      return "Artisans";

    case ROUTES.licencedArtisans:
      return "Licensed Artisans";

    case ROUTES.roles:
      return "Roles and Permissions";

    case ROUTES.employers:
      return "Employers";
    case ROUTES.artisanHome:
      return "Home";
    case ROUTES.artisanUpdates:
      return "Notifications";

    case ROUTES.artisanProjects:
      return "Projects/Gigs";

    case ROUTES.userProfile:
      return "User Profile";

    case ROUTES.artisanMore:
      return "Others";
    default:
      return "Welcome";
  }
};
