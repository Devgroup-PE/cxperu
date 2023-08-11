import React, { useContext } from 'react'
import {
  Table,
  Tag,
} from 'vtex.styleguide'
import { OrdersContext } from '../../OrdersContext'
import { Total } from '../../types/orders'
import styles from './index.css'
import { FormattedPrice } from 'vtex.formatted-price'
import { useSellers } from '../../hooks/useSellers';

const UserTable = () => {

  const { sellers, loading } = useSellers()
  const ordersContext = useContext(OrdersContext)

  if(!ordersContext?.[2].length || loading) return <>Cargando...</>

  const schema = {
    properties: {
      clientEmail: {
        title: 'Email',
        width: 320,
      },
      totals:{
        title: "Total de los items",
        width: 175,
        cellRenderer: ({cellData: totals}: {cellData: Total[]}) => {
          const price = totals?.find(total=> total.id === 'Items')?.value
          return (
            <>
              {price && <FormattedPrice value={price}/>}
            </>
          )
        }
      },
      creationDate: {
        title: 'Fecha de compra',
        width: 250,
        cellRenderer: ({cellData: date}: {cellData: string}) => {
          const datePurchase = new Date(date)
          const day = datePurchase.getDate()
          let month: string | number = datePurchase.getMonth() + 1
          const year = datePurchase.getFullYear();

          (month && month<10)
            ? month = `0${month}`
            : month = `${month}`

          return (
            <>
              {`${day}/${month}/${year}`}
            </>
          )
        }
      },
      sellerNames: {
        title: 'Franquicia',
        cellRenderer: ({ cellData }: any) => {
          return (
            <Tag
              bgColor={sellers.find(seller=> seller.Name == cellData[0])?.color}
              color="#fff"
            >
              <span className="nowrap">{cellData[0]}</span>
            </Tag>
          )
        },
      },
    },
  }

  return (
    <div className={styles['table-data']}>
      <Table
        fullWidth
        schema={schema}
        items={ordersContext[2]}
        indexColumnLabel="Index"
        onRowClick={({ rowData }: any) => {
          alert(`you just clicked the row with ${rowData}`)
        }}
      />
    </div>
  )
}

export default UserTable
