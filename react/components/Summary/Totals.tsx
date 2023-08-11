import React, { useContext, useMemo } from 'react'
import { OrdersContext } from '../../OrdersContext';
import { FormattedPrice } from "vtex.formatted-price"
import { useSellers } from '../../hooks/useSellers';

const Totals = () => {
  const ordersContext = useContext(OrdersContext)
  const { sellers, loading } = useSellers()

  const averageOrders = useMemo(() => {
    return ((ordersContext?.[2]?.length || 0) / sellers?.length) || 0
  }, [ordersContext?.[2], sellers])

  const total = useMemo(() => {
    let total = 0
    ordersContext?.[2].forEach(order => total += order.totalValue)
    return total
  }, [ordersContext?.[2]])


  if (loading) return null

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div>
        <h3>Total facturado</h3>
        <p>
          <FormattedPrice value={total} />
        </p>
        <span>+15% <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12.6667L8 3.33333" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.33337 8L8.00004 3.33333L12.6667 8" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      </div>
      <div>
        <h3>Total pedidos</h3>
        <p>{ordersContext?.[2].length || 0}</p>
        <span>+15% <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12.6667L8 3.33333" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.33337 8L8.00004 3.33333L12.6667 8" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      </div>
      <div>
        <h3>Alertas</h3>
        <p>25</p>
        <span>+15% <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12.6667L8 3.33333" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.33337 8L8.00004 3.33333L12.6667 8" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      </div>
      <div>
        <h3>Promedio de pedidos</h3>
        {averageOrders}
        <span>+15% <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12.6667L8 3.33333" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /><path d="M3.33337 8L8.00004 3.33333L12.6667 8" stroke="#0C2448" stroke-linecap="round" stroke-linejoin="round" /></svg></span>
      </div>
    </div>
  )
}

export default Totals
