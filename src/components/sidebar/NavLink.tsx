"use client";

import { APP_CONSTANTS } from "@/constants/appConstants";
import { COLORS } from "@/constants/colors";
import { NavLinksType } from "@/types/navigation";
import { Flex, Text } from "@chakra-ui/react";
/*
 
NavLink: by default the active class is added when the href matches the start of the URL pathname.
Use the exact property to change it to an exact match with the whole URL pathname.
 
*/
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
};

export const NavLink = ({ href, exact, children, ...props }: NavLinkProps) => {
  const active = " font-bold";

  return (
    <Link
      href={href}
      {...props}
      style={{ width: "100%", paddingTop: ".3rem", paddingBottom: ".3rem" }}
    >
      {children}
    </Link>
  );
};

type CustomNavLinkProps = {
  link: NavLinksType;
  tabWidth?: string;
  onClick?: () => void;
};

export const CustomNavLink = ({
  link,
  tabWidth,
  onClick,
}: CustomNavLinkProps) => {
  const pathname = usePathname();
  return (
    <NavLink href={link.route} exact key={link.key}>
      <Flex
        width="100%"
        direction={["column", "column", "row"]}
        bg={pathname === link.route ? COLORS.secondary : ""}
        color={pathname === link.route ? COLORS.u_black : COLORS.white}
        padding={[".3rem", ".4rem", ".9rem"]}
        align="center"
        gap={[".2rem", ".2rem", ".6rem"]}
        fontSize={[".8rem", ".9rem", "1rem"]}
        borderLeft={
          pathname === link.route ? `.5rem solid ${COLORS.darkGrey}` : ""
        }
        borderRadius=".3rem"
        onClick={onClick}
      >
        <link.Icon size={APP_CONSTANTS.iconSize} />
        <Text
          display={
            typeof window !== "undefined" &&
            tabWidth === APP_CONSTANTS.collapsedSideBarWidth
              ? "none"
              : "block"
          }
          textAlign={["center", "center", "left"]}
        >
          {link.name}
        </Text>
      </Flex>
    </NavLink>
  );
};
