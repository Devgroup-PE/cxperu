import React from 'react'
import Totals from './Totals'
import styles from './index.css'
import Comissions from './Comissions'

const Summary = ({ sellerId }: { sellerId: string }) => {
  return (
    <div className={styles['branchoffices-stores']}>
      <div className={`${styles['branchoffices-stores__chart']} pl0 pr0`}>
        <Totals />
      </div>
      <div className={styles['branchoffices-stores__sellers']}>
        <Comissions sellerId={sellerId} />
      </div>
    </div>
  )
}

export default Summary
