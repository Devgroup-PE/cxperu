import React, { FC } from 'react'
import './styles.global.css'
import UsersTable from './components/Table'
import Header from './components/Header'
import Summary from './components/SummaryDetail'
import Orders from './OrdersContext'
import { ToastProvider } from 'vtex.styleguide'

const AdminSellerDetail: FC<any> = ({ params }) => {

    return (
        <ToastProvider>
            <Orders>
                <Header />
                <div>
                    <Summary sellerId={params.id} />
                    <UsersTable />
                </div>
            </Orders>
        </ToastProvider>
    )
}

export default AdminSellerDetail
