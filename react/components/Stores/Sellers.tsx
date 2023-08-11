import React, { useContext } from 'react'
import { OrdersContext } from '../../OrdersContext'
import { Seller } from '../../types/sellers'
import { getTotalOrdersBySeller } from '../../utils/sellers'
import { useSellers } from '../../hooks/useSellers';

const Sellers = () => {

  const {sellers, loading} = useSellers()
  const ordersContext = useContext(OrdersContext)

  if(loading) return null

  return (
    <div>
      <h3>Franquicias</h3>
      <ul>
        {sellers && sellers.map((seller:Seller)=>(
          <li>{seller.Name} ({getTotalOrdersBySeller(seller.Name, ordersContext?.[2])})</li>
        ))}
      </ul>
    </div>
  )
}

export default Sellers
