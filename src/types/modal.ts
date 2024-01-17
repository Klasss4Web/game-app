export type ReactChildren = {
  children: React.ReactNode;
};

export type ChildrenProps = ReactChildren & {
  icon: React.ReactNode;
  header?: string;
  title?: string;
  cursor?: string;
  color?: string;
  size?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  alignText?: "left" | "right" | "center";
  handleAdd?: () => void;
  isEdit?: boolean;
  editIcon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  addComponent?: React.ReactNode;
  height?: string;
  openModal?: boolean;
};
