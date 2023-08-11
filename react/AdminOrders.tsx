import React, { FC } from 'react'
import './styles.global.css'
import UsersTable from './components/Table'
import Header from './components/Header'
import Summary from './components/Summary'
import Orders from './OrdersContext'
import { ToastProvider } from 'vtex.styleguide'
import Chart from './components/Summary/Chart'

const AdminSeller: FC = () => {
  return (
    <ToastProvider>
      <Orders>
        <Header />
        <div>
          <Summary />
          <Chart />
          <UsersTable />
        </div>
      </Orders>
    </ToastProvider>
  )
}

export default AdminSeller
