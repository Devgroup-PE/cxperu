import { useEffect, useState } from "react"
import { Seller } from "../types/sellers"
import { useFetch } from "./useFetch"

const NOTALLOWED = ['1']

const defaultColors:{[key:string]: string} = {
  'tiendademascotasarbariloche': '#6bc950',
  'tiendademascotasarcaletaolivia': '#ffcc00',
  'tiendademascotasarneuquen': '#0ab4ff',
  'tiendademascotasarbahiablanca': '#757575',
  'tiendademascotasartrelew': 'purple',
  'sanmartin': 'black',
  'comodororivadavia': '#f81c07'
}

export const useSellers = () => {
  const { data, loading } = useFetch('/api/catalog_system/pvt/seller/list')
  const [sellers, setSellers] = useState<Seller[]>([])

  useEffect(()=>{
    const newSellers: Seller[] = data?.map((seller:Seller)=>{
      return {
        ...seller,
        color: defaultColors[seller.Name]
      }
    })

    const filterSellers: Seller[] = newSellers?.filter(seller=> !NOTALLOWED.includes(seller.SellerId))
    setSellers(filterSellers)
  },[data])

  return {
    sellers,
    loading
  }
}
