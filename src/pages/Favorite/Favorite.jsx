import { useContext } from "react";
import Card from "../../components/card/CardItem.jsx";

import styles from './Favorite.module.scss'
import { Context } from "../../components/Context.jsx";

export const Favorite = ({ addFavorite, onAddToBasket}) => {
  const {favorite} = useContext(Context)
  return ( 
    <div className={styles.favorite}>
        <div className={styles.favoriteBlock}>
          <h1 className={styles.favoriteName}>{'Мои закладки'}</h1>
          
        </div>
        <div className={styles.sneakers}>

          {
            favorite.map(obj => (
              <Card 
                onAddToBasket={(objBasket) => onAddToBasket(objBasket)}
                key={obj.id}
                id={obj.id}
                name={obj.name}
                img={obj.img}
                price={obj.price}
                favorited={true}
                addFavorite={addFavorite}
              />
            ))
          }

        </div>
    </div>
   );
}
 