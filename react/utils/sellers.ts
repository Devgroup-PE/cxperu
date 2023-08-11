import { Order } from "../types/orders"

export const getTotalOrdersBySeller = (id: string, orders:Order[] | undefined):number => {
  return orders?orders.filter(order=> order.sellerNames.includes(id)).length:0
}
