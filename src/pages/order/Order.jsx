import React, { useEffect, useState } from 'react'
import styles from './Order.module.scss'

import Card from '../../components/card/CardItem'
import axios from 'axios'

export const Order = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadingItem = [
    {
      "id": 1,
     },
     {
      "id": 2,
     },
     {
      "id": 3,
     },
     {
      "id": 4,
     },
     {
      "id": 5,
     },
     {
      "id": 6,
     },
     {
      "id": 7,
     },
     {
      "id": 8,
     }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(`https://64d26339f8d60b174361fa51.mockapi.io/orders`)
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.card], []))
        setLoading(false)
      } catch (error) {
          console.warn(error) 
          alert('Произошла ошибка при загрузке закладок')
      }
    }
    fetchData()
  }, [])

  return (
    <div className={styles.order}>
        <div className={styles.orderBlock}>
          <h1 className={styles.orderName}>{'Мои заказы'}</h1>
          
        </div>
        <div className={styles.sneakers}>

          {
            
            (loading 
              ? loadingItem
              : orders)            
              .map(obj => (
                <Card 
                  key={obj.id}
                  id={obj.id}
                  loading={loading}
                  name={obj.name} 
                  img={obj.img} 
                  price={obj.price}
                />
              ))
          }

        </div>
    </div>
  )
}
