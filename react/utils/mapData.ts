import { Order } from "../types/orders";
import { compareDate } from "./date";
import { Seller } from '../types/sellers';
import { getTotalOrdersBySeller } from './sellers';

interface Data {
  date: string,
  total: number,
  average?: number,
  max?: number
  [key:string]: any
}

export const mapData = (data:Order[], sellers: Seller[]) => {
  let newData:Data[] = []

  if(data){
    for (let i=0; i < 31; i++){
      const date = new Date()
      date.setDate(date.getDate() - i)

      const orders: Order[] = data?.filter(order=> compareDate(order.creationDate, date))

      let reg: Data = {
        date: `${date.getDate()} ${date.toLocaleString('default',{month: 'long'})}`,
        total: orders?.length
      }

      let max: number = 0

      sellers?.forEach(seller => {
        reg[seller.Name] = getTotalOrdersBySeller(seller.Name, orders)
        if(reg[seller.Name] > max) max = reg[seller.Name]
      })

      reg.max = max

      reg.average = Math.round(orders.length / sellers.length)

      newData.push(reg)
    }
  }
  return newData
}
