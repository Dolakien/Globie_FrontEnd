export const formatPrice = (val) => {
  if (!val) return 0;

  return new Intl.NumberFormat("de-DE").format(val);
};
