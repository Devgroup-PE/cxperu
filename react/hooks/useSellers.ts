import { useEffect, useState } from "react"
import { Seller } from "../types/sellers"
import { useFetch } from "./useFetch"

const NOTALLOWED = ['1']


export const useSellers = () => {
  const { data, loading } = useFetch('/api/catalog_system/pvt/seller/list')
  const [sellers, setSellers] = useState<Seller[]>([])

  useEffect(() => {
    const newSellers: Seller[] = data?.map((seller: Seller) => {
      return {
        ...seller
      }
    })

    const filterSellers: Seller[] = newSellers?.filter(seller => !NOTALLOWED.includes(seller.SellerId))
    setSellers(filterSellers)
  }, [data])

  return {
    sellers,
    loading
  }
}
