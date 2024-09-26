import { Route, Routes } from 'react-router-dom'
import PokemonDetail from './Detail/PokemonDetail'
import PokeCardList from './List/PokeCardList'

const PageNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<PokeCardList />}></Route>
      <Route path="/pokemon/:name" element={<PokemonDetail />}></Route>
    </Routes>
  )
}

export default PageNavigator