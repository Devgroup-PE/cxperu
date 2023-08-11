import React from 'react'
import Totals from './Totals'
import styles from './index.css'
import Sellers from './Sellers'

const Summary = () => {
  return (
    <div className={styles['branchoffices-stores']}>
      <div className={`${styles['branchoffices-stores__chart']} pl0 pr0`}>
        <Totals />
      </div>
      <div className={styles['branchoffices-stores__sellers']}>
        <Sellers />
      </div>
    </div>
  )
}

export default Summary
