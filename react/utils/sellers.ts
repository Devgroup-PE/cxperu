import { Order } from "../types/orders"

export const getTotalOrdersBySeller = (id: string, orders: Order[] | undefined): number => {
  return orders ? orders.filter(order => order.sellerNames.includes(id)).length : 0
}

export const getTotalBySeller = (id: string, orders: Order[] | undefined): number => {
  let total = 0
  orders?.filter(order => order.sellerNames.includes(id))?.forEach(order => {
    total += order.totalValue
  })
  return total
}
