import './App.css'
import AuthContextProvider from './contexts/AuthContext'
import { themeChange } from 'theme-change'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import { useAppDispatch } from './app/hooks'
import { setActiveUser, setLogoutState } from './features/user/userSlice'
import { useCookies } from "react-cookie"
import Masonry from 'react-masonry-css'

type Card = { name: string, description?: string, activeOption: 1 | 2, ingredients: string[], image?: string, position?: number }

function App() {
  useEffect(() => {
    themeChange(false)
    _persistUser()
  }, [])
  const dispatch = useAppDispatch()
  const [cookies] = useCookies(['user'])
  const [cards, setCards] = useState<Card[]>([
    { name: 'Shampoo 1', description: 'Description 1', activeOption: 1, ingredients: ['Agua', 'Sandía', 'Aceite'], image: 'https://placeimg.com/400/225/arch', position: 1 },
    { name: 'Shampoo 2', activeOption: 1, ingredients: ['Melón', 'Sal', 'Carbón'], image: 'https://placeimg.com/400/625/arch', position: 2 },
    { name: 'Shampoo 1', description: 'Description 1', activeOption: 1, ingredients: ['Agua', 'Sandía', 'Aceite'], image: 'https://placeimg.com/600/425/arch', position: 3 },
    { name: 'Shampoo 1', description: 'Description 1', activeOption: 1, ingredients: ['Agua', 'Sandía', 'Aceite'], image: 'https://placeimg.com/300/325/arch', position: 4 },
    { name: 'Shampoo 2', description: 'Description 2', activeOption: 1, ingredients: ['Melón', 'Sal', 'Carbón'], image: 'https://placeimg.com/400/625/arch', position: 5 },
    { name: 'Shampoo 3 no position', description: 'Description 3', activeOption: 1, ingredients: ['Manzana', 'Limón', 'Espuma'] },
    { name: 'Shampoo 3', description: 'Description 3', activeOption: 1, ingredients: ['Manzana', 'Limón', 'Espuma'], position: 6 },
  ])
  const breakpointColumnsObj = { default: 4, 1536: 4, 1280: 3, 1024: 3, 768: 2, 640: 2, 540: 1 }

  /**
   * Toggles the card's text between ingredients and description
   * @param index The card index to identify it
   */
  const _toggleIngredients = (index: number) => {
    cards[index].activeOption = cards[index].activeOption === 1 ? 2 : 1
    setCards([...cards])
  }

  /**
   * @description If the user is logged in and saved in the cookie, then the user is set in the redux store
   */
  function _persistUser() {
    cookies.user
      ? dispatch(setActiveUser({
        displayName: cookies.user.displayName,
        photoURL: cookies.user.photoURL
      }))
      : dispatch(setLogoutState())
  }

  return <AuthContextProvider>
    <Header />
    <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-24">
      <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">{
        cards.sort((a, b) => (a.position || Infinity) - (b.position || Infinity)).map((item, index) => {
          return <div key={index} className="card bg-base-100">
            {item.image ? <figure><img className='w-full' src={item.image} alt="Shoes" /></figure> : <></>}
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              {item.activeOption === 1 ? <p>{item.description}</p> :
                <ul className="list-disc">
                  {item.ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                </ul>
              }
              <div className="card-actions justify-end">
                <button className={item.activeOption === 1 ? 'btn btn-neutral' : 'btn btn-primary'} onClick={() => _toggleIngredients(index)}>
                  Ingredientes
                </button>
              </div>
            </div>
          </div>
        })
      }</Masonry>
    </div>
  </AuthContextProvider>
}

export default App