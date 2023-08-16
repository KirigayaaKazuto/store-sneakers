import { Outlet } from "react-router-dom";
 import { Basket } from "./basket/Basket";
import { Header } from "./header/HeaderContent";

const Layout = ({ basketOpened, cardBasket, onCloseBasket, onDeleteBasket, onClickBasket}) => {
  return (
    <>
        <Basket 
          opened={basketOpened}
          cardBasket={cardBasket} 
          onCloseBasket={onCloseBasket} 
          onDeleteBasket={onDeleteBasket}
        />
      <Header onClickBasket={onClickBasket}/>
      <Outlet />
    </>
  );
}
 
export {Layout};