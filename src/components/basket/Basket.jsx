import { useState } from 'react';
import styles from './Basket.module.scss';
import {BasketInfo} from './../basketInfo/BasketInfo'
import axios from 'axios';
import { useCard } from '../../hooks/useCard';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const Basket = ({onCloseBasket, onDeleteBasket, opened}) => {
  const {cardBasket, setCardBasket, totalPrice, taxPrice} = useCard()
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const {data} = await axios.post("https://64d26339f8d60b174361fa51.mockapi.io/orders", {card: cardBasket})
      
      setOrderId(data.id)
      setOrderComplete(true)
      setCardBasket([])
      for(let i = 0; i < cardBasket.length; i++) {
        const item = cardBasket[i]
        await axios.delete('https://64c8d72da1fe0128fbd64f49.mockapi.io/basket/' + item.id)
        await delay(1000)
      }
    } catch (error) {
      console.warn(error)
      alert('Не удалось создать заказ')
    }
    setIsLoading(false)
  }
  return ( 
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : styles.overlayHidden}`}>
          <div className={styles.basket}>
            
            <div className={styles.basketColumn}>
              <h2 className={styles.basketName}>
                Корзина
              </h2>
              <button onClick={onCloseBasket}>
                <img src="/img/basket/remove.svg" alt="Remove" />
              </button>
            </div>

            
            {cardBasket.length> 0 ? (
              <>
                <div className={styles.basketItems}>
                
                
                {
                
                cardBasket.map((obj)=> (
                  
                  <div key={obj.id} className={styles.basketItem}>
              
                    <img className={styles.basketItemImages} src={obj.img} alt="card" />
                    <div className={styles.basketInfo}>
                      <h3 className={styles.basketInfoName}>
                        {obj.name}
                      </h3>
                      <b className={styles.basketInfoPrice} >
                        {obj.price} руб.
                      </b>
                    </div>
                    <button onClick={() => onDeleteBasket(obj.id)} className={styles.basketItemBtn}>
                      <img src="/img/basket/remove.svg"  alt='plus'/>
                    </button>
  
                  </div>
                ))
  
                }

                </div>

                <div className={styles.basketTotalBlock}>
                  <ul className={styles.basketPrice}>
                    <li >
                      <span>
                        Итого:
                      </span>
                      <div></div>
                      <b>
                        {totalPrice + taxPrice} руб.
                      </b>
                    </li>

                    <li className={styles.basketPrice}>
                      <span>
                        Налог 5%: 
                      </span>
                      <div></div>
                      <b>
                        {taxPrice} руб.
                      </b>
                    </li>
                  </ul>

                  <button disabled={isLoading} onClick={onClickOrder}>
                    Оформить заказ
                  </button>
                </div>
              </>
              

            ) : (
              <BasketInfo
                title={orderComplete ? 'Заказ оформлен!' : 'Корзина пустая'} 
                img={orderComplete ? '/img/basket/order.jpg' : '/img/basket/empty.jpg'}
                description={orderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.' }
              />
            )}
            
            
            

            


          </div>
        </div>
   );
}