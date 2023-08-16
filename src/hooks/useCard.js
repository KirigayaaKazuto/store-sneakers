import { useContext } from "react";
import { Context } from "../components/Context";


export const useCard = () => {
  const {cardBasket, setCardBasket} = useContext(Context)

  const totalPrice = cardBasket.reduce((sum, obj) => obj.price + sum, 0)
  const taxPrice = totalPrice * 0.05
  
  return {cardBasket, setCardBasket, totalPrice, taxPrice}
}