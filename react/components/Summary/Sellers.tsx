import React, { useContext } from 'react'
import { OrdersContext } from '../../OrdersContext'
import { Seller } from '../../types/sellers'
import { getTotalBySeller, getTotalOrdersBySeller } from '../../utils/sellers'
import { useSellers } from '../../hooks/useSellers';
import { FormattedPrice } from "vtex.formatted-price"
import { Order } from '../../types/orders';

const getTopSellers = (sellers: Seller[], orders: Order[]) => {
  const sellerSales: { [key: string]: number } = {}; // Objeto para almacenar las ventas totales de cada vendedor

  // Calcular las ventas totales de cada vendedor
  orders.forEach(order => {
    order.sellerNames.forEach(sellerId => {
      if (sellerSales[sellerId]) {
        sellerSales[sellerId] += order.totalValue; // Supongo que el total de la orden está disponible en order.total
      } else {
        sellerSales[sellerId] = order.totalValue;
      }
    });
  });

  // Convertir el objeto de ventas totales en un array de vendedores con ventas
  const sellersWithSales = sellers.map(seller => ({
    ...seller,
    totalSales: sellerSales[seller.SellerId] || 0,
  }));

  // Ordenar los vendedores por ventas totales de mayor a menor
  sellersWithSales.sort((a, b) => b.totalSales - a.totalSales);

  // Devolver los 5 vendedores con las mayores ventas
  return sellersWithSales.slice(0, 5);
};

const Sellers = () => {

  const { sellers, loading } = useSellers()
  const ordersContext = useContext(OrdersContext)

  if (loading) return null

  return (
    <div>
      <h3>Top Sellers</h3>
      <ul>
        {sellers && getTopSellers(sellers, ordersContext?.[2] || []).map((seller: Seller, i) => (
          <li>
            <div>
              <span>{i + 1}.</span>
              <h4>{seller.Name}</h4>
            </div>
            <span>{getTotalOrdersBySeller(seller.Name, ordersContext?.[2])}</span>
            {getTotalBySeller(seller.Name, ordersContext?.[2])
              ? <FormattedPrice value={getTotalBySeller(seller.Name, ordersContext?.[2])} />
              : 0
            }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sellers
