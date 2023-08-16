import { useContext } from "react";
import Card from "../../components/card/CardItem";

import styles from './Home.module.scss'
import { Context } from "../../components/Context.jsx";

export const Home = ({ loading, onAddToBasket, addFavorite, searchValue, setSearchValue, onChangeValue }) => {
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
  const {card} = useContext(Context)
  return ( 
    <div className={styles.content}>
        <div className={styles.contentBlock}>
          <h1 className={styles.contentTitleSneakers}>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
          <label className={styles.contentSearch}>
            <img className={styles.contentSearchImages} src="/img/card/search.svg" alt="search" />
            <input value={searchValue} onChange={onChangeValue} placeholder="Поиск..." type="text" />
            {searchValue && <img onClick={()=> setSearchValue('')} className={styles.contentSearchClose} src="/img/basket/remove.svg" alt="Clear"/>}
          </label>
        </div>
        <div className={styles.sneakers}>

          {
            (loading 
            ? loadingItem
            : card.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())))            
            .map(obj => (
              <Card 
                key={obj.id}
                id={obj.id}
                parentId={obj.parentId}
                loading={loading}
                name={obj.name} 
                img={obj.img} 
                price={obj.price}
                addFavorite={(objFavorite) => addFavorite(objFavorite)}
                onAddToBasket={(objBasket) => onAddToBasket(objBasket)}
              />
            ))
          }

        </div>
    </div>
   );
}
 