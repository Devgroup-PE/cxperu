import React, { createContext, FC, useEffect, useState } from 'react'
import { OperationVariables, QueryResult, useQuery } from 'react-apollo';
import ORDERS from './graphql/getOrders.gql'
import { Order, OrdersResponse } from './types/orders';

type OrdersType = [(options?: any) => void, QueryResult<OrdersResponse, OperationVariables>, Order[]] | undefined

const dateNow = new Date().toISOString()
const lastYearDate = new Date()

lastYearDate.setDate(lastYearDate.getDate() - 30)

const options = {
  page: 1,
  perPage: 100,
  sorts: null,
  filters: {
    f_creationDate: `creationDate:[${lastYearDate.toISOString()} TO ${dateNow}]`
  }
}

export const OrdersContext = createContext<OrdersType>(undefined)

const Orders: FC = ({ children }) => {

  const [orders, setOrders] = useState<Order[]>([])

  const ordersResponse = useQuery<OrdersResponse>(ORDERS, {
    variables: {
      options
    }
  })

  useEffect(() => {
    if (ordersResponse.data?.ordersExtendSearch?.paging.pages == 0) return
    if (ordersResponse.data?.ordersExtendSearch?.paging.currentPage != ordersResponse.data?.ordersExtendSearch?.paging.pages) {
      setOrders([
        ...orders,
        ...(ordersResponse.data?.ordersExtendSearch?.list || [])
      ])
      ordersResponse.refetch({
        options: {
          ...options,
          page: ordersResponse.data?.ordersExtendSearch?.paging.currentPage! + 1
        }
      })
    } else if (orders.length !== ordersResponse.data?.ordersExtendSearch?.paging.total) {
      setOrders([
        ...orders,
        ...(ordersResponse.data?.ordersExtendSearch?.list || [])
      ])
    }
  }, [ordersResponse.data?.ordersExtendSearch?.list])

  console.log("CONSULTANDO ORDENES", ordersResponse.data, ordersResponse.loading)

  return (
    <OrdersContext.Provider value={[ordersResponse.refetch, ordersResponse, orders]}>
      {children}
    </OrdersContext.Provider>
  )
}

export default Orders
