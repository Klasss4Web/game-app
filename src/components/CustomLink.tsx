'use client';
import { COLORS } from '@/constants/colors';
import { Link } from '@chakra-ui/next-js';

type LinkProps = {
  to: string;
  text: string;
  color?: string;
  hoverBg?: string;
};

export default function CustomLink({ to, text, color, hoverBg }: LinkProps) {
  return (
    <Link
      href={to}
      // className="link-text"
      color={color || COLORS.u_black}
      style={{ padding: ".5rem 1rem", borderRadius: ".2rem" }}
      _hover={{ color: COLORS.u_black, background: hoverBg || COLORS.white }}
    >
      {text}
    </Link>
  );
}
