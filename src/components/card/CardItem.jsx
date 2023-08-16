import { useContext, useState } from 'react';
import styles from './Card.module.scss'
import ContentLoader from 'react-content-loader';

import { Context } from '../Context';


const Card = ({id, parentId, name, price, img, onAddToBasket, addFavorite, favorited=false, added=false, loading = false}) => {
  const {addedOnCard} = useContext(Context)
  const [isFavorite, setIsFavorite] = useState(favorited)

  const obj = {id, parentId: id,  name, price, img}
 
  const onClickBasket = () => {
    onAddToBasket(obj)
  }

  const onClickFavorite = () => {
    addFavorite(obj)
    setIsFavorite(prev => !prev)
  }


  return ( 
    <div className={styles.card}>
      {
        loading ? (
          <ContentLoader 
            speed={2}
            width={155}
            height={265}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            
            <rect x="1" y="0" rx="10" ry="10" width="150" height="155" /> 
            <rect x="0" y="167" rx="5" ry="5" width="150" height="15" /> 
            <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
            <rect x="1" y="217" rx="5" ry="5" width="80" height="25" /> 
            <rect x="116" y="215" rx="10" ry="10" width="30" height="30" /> 
            
          </ContentLoader>
        ) : (
          <>
            { addFavorite &&     
              <button onClick={onClickFavorite} className={styles.cardBtn}>
                <img alt="favorite" src={isFavorite ? "/img/card/liked.svg" : "/img/card/unliked.svg"}/>
              </button>
            }
            <img className={styles.cardImgCard} src={img} alt="cardImg" />
            <p className={styles.cardTitleCard}>{name}</p>
            <div className={styles.cardItem}>
              <div className={styles.cardPrice}>
                <p>Цена:</p>
                <b>{price +" руб."}</b>
              </div>
              {onAddToBasket && <img className={styles.plusBtn} onClick={onClickBasket} width={32} height={32} src={addedOnCard(id) ? "/img/card/checked.svg" : "/img/card/plus.svg"} alt="Plus"/>}
            </div>
          </>
        )
      }
    </div>
   );
}
 
export default Card;