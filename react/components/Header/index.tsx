import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button } from 'vtex.styleguide'
import styles from './index.css'
import { Helmet } from 'vtex.render-runtime'
//@ts-ignore
import { CSVLink } from 'react-csv';
import { OrdersContext } from '../../OrdersContext'
import { useFetch } from '../../hooks/useFetch'

const cleanData = (data:any) => {
  const newData: any[] = []


  data.forEach((reg:any)=> {
    delete reg.__typename
    delete reg.totals

    newData.push(reg)
  })

  return newData
}

const Header = () => {

  const FILENAME = 'reporte-ordenes-tiendademascotas'
  const { data, loading:loadingNewsletter } = useFetch('/api/dataentities/CL/scroll?_where=store%20is%20not%20null&_fields=email,store')
  const ordersContext = useContext(OrdersContext)

  const {
    loading
  } = ordersContext![1]

  console.log(data)

  return (
    <>
      <Helmet>
        <script src="https://cdn.rawgit.com/abdennour/react-csv/6424b500/cdn/react-csv-latest.min.js" type="text/javascript"></script>
      </Helmet>
      <header className={styles['branchoffices-header']}>
        <FormattedMessage id="admin-branchoffices.hello-world" />
        <div>
          <div className='mr-5'>
            <Button variation="secondary">
              <CSVLink
                data={!data?[]:data}
                filename={"Suscritos al newsletter"}
              >
                {(loadingNewsletter) ? 'Cargando...' : 'Suscritos al newsletter'}
              </CSVLink>
            </Button>
          </div>
          <Button>
            <CSVLink
              data={cleanData(ordersContext?.[2] || [])}
              filename={FILENAME}
            >
              {loading ? 'Cargando...' : 'Exportar'}
            </CSVLink>
          </Button>
        </div>
      </header>
    </>
  )
}

export default Header
