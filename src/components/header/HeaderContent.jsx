import { Link } from 'react-router-dom';
import './header.scss'
import { useCard } from '../../hooks/useCard';

export const Header = ({onClickBasket}) => {
  const {totalPrice} = useCard()
  return ( 
    <header> 
      <Link to='/'>
        <div className="headerLeft">
          <img className="headerLeft-img" src="/img/header/logo.png" alt="logo"/>
          <div className="headerInfo">
            <h3>
              REACT SNEAKERS
            </h3>
            <p>
              Магазин лучших кроссовок
            </p>
          </div>
        </div>
      </Link>
      <ul className="headerRight">
        <li onClick={onClickBasket} className="headerRight-backet">
          <img alt="backet" src="/img/header/backet.svg"/>
          <span className="headerRight-backet__title">{totalPrice} руб</span>
        </li>
        <li>
          <Link to='favorite'>
            <img className='favoriteImg' alt="favorite" src="/img/header/favorite-outline.svg"/>
          </Link>
        </li>
        <li>
          <Link to='order'>
            <img className='orderImg' alt="user" src="/img/header/user.svg"/>  
          </Link>
        </li>
      </ul>
    </header>
   );
}