// Import Route and Routes components for defining app routes
import { Route, Routes } from 'react-router-dom'
// Import the component for displaying Pokémon details
import PokemonDetail from './Detail/PokemonDetail'
// Import the component for displaying a list of Pokémon cards
import PokeCardList from './List/PokeCardList'

// Component to define and handle page navigation within the app
const PageNavigator = () => {
  return (
    <Routes>
      {/* Route for the main Pokémon list page */}
      <Route path="/" element={<PokeCardList />} />
      {/* Route for displaying detailed information about a specific Pokémon */}
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  )
}
// Export the PageNavigator component as default export
export default PageNavigator 
