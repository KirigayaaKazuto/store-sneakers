import {Home} from "./pages/home/Home";

import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Favorite } from "./pages/Favorite/Favorite";
import { Context } from "./components/Context";
import { Order } from "./pages/order/Order";
 


  function App() {

    const [card, setCard] = useState([])
    const [cardBasket, setCardBasket] = useState([])
    const [favorite, setFavorite] = useState([])

    const [loading, setLoading] = useState(true)
    const [basketOpened, setBasketOpened] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    

    useEffect(() => {
      async function fetchData() {
        try {
          const [basketRes, favoriteRes, cardRes] = await Promise.all([
            axios.get(`https://64c8d72da1fe0128fbd64f49.mockapi.io/basket`), 
            axios.get(`https://64d26339f8d60b174361fa51.mockapi.io/favorite`), 
            axios.get(`https://64c8d72da1fe0128fbd64f49.mockapi.io/card`)
          ])
          
          setLoading(false)

          setCardBasket(basketRes.data)
          setFavorite(favoriteRes.data)
          setCard(cardRes.data)
        } catch (error) {
            console.warn(error)
            alert('Ошибка при запросе данных')
          }
        
      }

      fetchData()
    }, [])

    const onAddToBasket = async (obj) => {
      const findBasket = cardBasket.find(item => item.parentId === obj.id)
      try {
        if(findBasket) {
          setCardBasket(prev => prev.filter(item => item.parentId !== obj.id))
          await axios.delete(`https://64c8d72da1fe0128fbd64f49.mockapi.io/basket/${findBasket.id}`)
          
        } else {
          const {data} = await axios.post(`https://64c8d72da1fe0128fbd64f49.mockapi.io/basket`, obj)
          setCardBasket(prev => [...prev, data])
          
        }
      } catch (error){
          console.warn(error)
          alert('Ошибка добавления в корзину')
        }
    }

    const onDeleteBasket = async (id) => {
      try {
        setCardBasket(prev => prev.filter(item => item.id !== id))
        await axios.delete(`https://64c8d72da1fe0128fbd64f49.mockapi.io/basket/${id}`)
      } catch(error) {
          console.warn(error)
          alert('Ошибка при удаление из корзины')
      }
    }

    const addFavorite = async (obj) => {
      try {
        if(favorite.find(item => item.id === obj.id)) {
          setFavorite(prev => prev.filter(item => item.id !== obj.id))
          axios.delete(`https://64d26339f8d60b174361fa51.mockapi.io/favorite/${obj.id}`)
        } else {
           const {data} = await axios.post(`https://64d26339f8d60b174361fa51.mockapi.io/favorite`, obj)
          setFavorite(prev => [...prev, data])
         
        }
      } catch (error) {
        console.warn(error)
        alert('Не удалось добавить в избранные')
      }
    }

    const onChangeValue = (event) => {
      setSearchValue(() => event.target.value)
    }

    const addedOnCard = (id) => {
      console.log(id)
      return cardBasket.some(item => item.parentId === id)
    }

    return (  
      <Context.Provider value={{
        card,
        cardBasket,
        setCardBasket,
        favorite,
        addedOnCard,
        setBasketOpened
      }}>
        <div className="wrapper">
      
          <Routes>
            <Route path="/" element={
              <Layout 
                onClickBasket={() => setBasketOpened(true)} 
                basketOpened={basketOpened}
                onCloseBasket={() => setBasketOpened(false)} 
                onDeleteBasket={onDeleteBasket}
              />}
            >
              <Route index element={
                <Home
                  loading={loading}
                  setSearchValue={setSearchValue} 
                  searchValue={searchValue} 
                  onChangeValue={onChangeValue} 
                  addFavorite={addFavorite}
                  onAddToBasket={onAddToBasket} 
                />}   
              />

              <Route path="favorite" element={
                <Favorite
                  onAddToBasket={onAddToBasket}
                  addFavorite={addFavorite}
                />} 
              />

              <Route  path="order" element={
                <Order />
              }
              />

            </Route>
          </Routes>
        </div>
      </Context.Provider>
      
        // {basketOpened ? 
        //   <Basket 
        //     cardBasket={cardBasket} 
        //     onCloseBasket={() => setBasketOpened(false)} 
        //     onDeleteBasket={onDeleteBasket}
        //   /> 
        //     : null
        //  }
        
        
        // <Header 
        //   onClickBasket={() => {setBasketOpened(true)}} 
        // // 

        // <Content 
        //   setSearchValue={setSearchValue} 
        //   searchValue={searchValue} 
        //   onChangeValue={onChangeValue} 
        //   addFavorite={addFavorite}
        //   onAddToBasket={onAddToBasket} 
        //   card={card}
        // /> 
        
      // </div>
    );
  }

export default App;

  