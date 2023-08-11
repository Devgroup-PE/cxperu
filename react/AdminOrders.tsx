import React, { FC } from 'react'
import './styles.global.css'
import UsersTable from './components/Table'
import Header from './components/Header'
import Stores from './components/Stores'
import Orders from './OrdersContext'

const AdminExample: FC = () => {
  return (
    <Orders>
      <Header/>
      <div>
        <Stores/>
        <UsersTable/>
      </div>
    </Orders>
  )
}

export default AdminExample
