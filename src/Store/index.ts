// Import Redux Toolkit's configureStore function to create the Redux store
import { configureStore } from '@reduxjs/toolkit'
// Import useDispatch hook from react-redux
import { useDispatch } from 'react-redux'
// Import the reducer for managing image type state
import { imageTypeReducer } from './ImageTypeSlice'
// Import the reducer for managing Pokémon detail state
import { pokemonDetailReducer } from './pokemonDetailSlice'
// Import the reducer for managing list of Pokémon
import { pokemonsReducer } from './pokemonsSlice'

// Create the Redux store and add the different reducers to handle different parts of the state
export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,    // Reducer for managing image type state
    pokemons: pokemonsReducer,      // Reducer for managing Pokémon list
    pokemonDetail: pokemonDetailReducer // Reducer for managing detailed Pokémon information
  },
})

// Define types for the RootState (entire store state) and AppDispatch (dispatch function)
export type RootState = ReturnType<typeof store.getState> // Type for the root state of the Redux store
export type AppDispatch = typeof store.dispatch // Type for the dispatch function used by the Redux store

// Custom hook to use the typed dispatch function throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>()
