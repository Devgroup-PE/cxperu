import React from 'react'
import Chart from './Chart'
import styles from './index.css'
import Sellers from './Sellers'

const Stores = () => {
  return (
    <div className={styles['branchoffices-stores']}>
      <div className={`${styles['branchoffices-stores__chart']} pl0 pr0`}>
        <Chart/>
      </div>
      <div className={styles['branchoffices-stores__sellers']}>
        <Sellers/>
      </div>
    </div>
  )
}

export default Stores
