export interface OrdersResponse {
  ordersExtendSearch?:{
    currencies: {
      currencyCode: string
      quantity: number
      value: number
    }
    paging:{
      total: number
      perPage: number
      pages: number
      currentPage: number
    }
    list: Order[]
    reportRecordsLimit: number
  }
}

export interface Order {
  clientEmail: string,
  creationDate: string,
  totals: Total[]
  sellerNames: string[]
  totalValue: number
  __typename: string
}

export interface Total {
  id: string
  name: string
  value: number
}
