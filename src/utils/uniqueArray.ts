export const getUniqueArray = (array: any[]) => {
  const uniqueArray = Array.from(new Set(array?.map((item) => item?.id)))?.map(
    (id) => {
      return array?.find((obj) => obj?.id === id);
    }
  );
  return uniqueArray;
};
