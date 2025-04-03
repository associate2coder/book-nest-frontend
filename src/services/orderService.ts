import { apiClient } from "./apiClient"

const postOrder = () => {
  return apiClient.post('/orders');
}

export const orderServce = {
  postOrder,
};
