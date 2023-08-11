import React, { FC } from 'react'
import './styles.global.css'
import UsersTable from './components/Table'
import Header from './components/Header'
import Summary from './components/Summary'
import Orders from './OrdersContext'
import { ToastProvider } from 'vtex.styleguide'

const AdminExample: FC = () => {
  return (
    <ToastProvider>
      <Orders>
        <Header />
        <div>
          <Summary />
          <UsersTable />
        </div>
      </Orders>
    </ToastProvider>
  )
}

export default AdminExample
