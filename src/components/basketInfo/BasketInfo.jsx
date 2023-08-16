import React, { useContext } from 'react'
import styles from './BasketInfo.module.scss'
import { Context } from '../Context'

export const BasketInfo = ({title, description, img}) => {
  const {setBasketOpened} = useContext(Context)
  return (
    <div className={styles.basketEmpty}>
      <img src={img} alt="Empty" />
      <h4 className={styles.basketEmptyName}>{title}</h4>
      <p className={styles.basketEmptyP}>{description}</p>
      <button onClick={() => setBasketOpened(false)} className={styles.basketEmptyLink}>Вернуться назад</button>
    </div>
  )
}