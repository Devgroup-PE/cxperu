import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import styles from './index.css'
import { Helmet, useRuntime } from 'vtex.render-runtime'
//@ts-ignore
import { CSVLink } from 'react-csv';
import { OrdersContext } from '../../OrdersContext'
import { ToastConsumer } from 'vtex.styleguide'

const cleanData = (data: any) => {
  const newData: any[] = []


  data.forEach((reg: any) => {
    delete reg.__typename
    delete reg.totals

    newData.push(reg)
  })

  return newData
}

const Header = () => {
  const { account } = useRuntime()
  const FILENAME = `report-${account}`
  const ordersContext = useContext(OrdersContext)

  const {
    loading
  } = ordersContext![1]

  const handleExport = (showToast: ({ }) => void) => {

    if (!cleanData(ordersContext?.[2]).length) {
      showToast({
        message: 'No hay ordenes por exportar',
        duration: 5000,
        horizontalPosition: 'right'
      })
      return false
    }

    return true
  }

  return (
    <>
      <Helmet>
        <script src="https://cdn.rawgit.com/abdennour/react-csv/6424b500/cdn/react-csv-latest.min.js" type="text/javascript"></script>
      </Helmet>
      <header className={styles['branchoffices-header']}>
        <FormattedMessage id="admin-branchoffices.hello-world" />
        <div>
          <Button isLoading={loading}>
            <ToastConsumer>
              {
                ({ showToast }: { showToast: ({ }) => void }) => (
                  <CSVLink
                    data={cleanData(ordersContext?.[2] || [])}
                    filename={FILENAME}
                    onClick={() => handleExport(showToast)}
                  >
                    Exportar
                  </CSVLink>
                )
              }
            </ToastConsumer>
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header
