export const formartPrice = (price: number): string => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
