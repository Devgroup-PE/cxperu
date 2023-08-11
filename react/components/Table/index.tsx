import React, { useContext, useMemo } from 'react'
import {
  Table,
} from 'vtex.styleguide'
import styles from './index.css'
import { FormattedPrice } from 'vtex.formatted-price'
import { useSellers } from '../../hooks/useSellers';
import { OrdersContext } from '../../OrdersContext';
import { getTotalBySeller, getTotalOrdersBySeller } from '../../utils/sellers';

const UserTable = () => {

  const { sellers, loading } = useSellers()
  const ordersContext = useContext(OrdersContext)


  const data = useMemo(() => {
    if (!sellers || !sellers.length) return []
    return sellers.map(seller => {
      return {
        Name: seller.Name,
        ProductCommissionPercentage: seller.ProductCommissionPercentage,
        ProdActive: 600,
        ProdInactive: 30,
        TotalSales: getTotalBySeller(seller.Name, ordersContext?.[2]),
        Orders: getTotalOrdersBySeller(seller.Name, ordersContext?.[2])
      }
    })
  }, [sellers, ordersContext])

  if (loading) return <>Cargando...</>

  const schema = {
    properties: {
      Name: {
        title: 'Seller',
        width: 150,
      },
      Orders: {
        title: 'Pedidos',
        width: 80,
      },
      TotalSales: {
        title: "Ventas",
        width: 175,
        cellRenderer: ({ cellData: totalSales }: { cellData: number }) => totalSales ? <FormattedPrice value={totalSales} /> : 0
      },
      ProductCommissionPercentage: {
        title: "Comision",
        width: 80,
        cellRenderer: ({ cellData: comission }: { cellData: number }) => `${comission}%`
      },
      ProdActive: {
        title: 'Prod. Activos',
        width: 120,
      },
      ProdInactive: {
        title: 'Prod. Inactivos',
        width: 120,
      },
    },
  }

  return (
    <div className={styles['table-data']}>
      <Table
        fullWidth
        schema={schema}
        items={data}
        indexColumnLabel="Index"
        onRowClick={({ rowData }: any) => {
          alert(`you just clicked the row with ${rowData}`)
        }}
      />
    </div>
  )
}

export default UserTable
