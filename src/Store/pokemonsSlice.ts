// Import functions from Redux Toolkit
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Import API service function and type for Pokémon list
import { fetchPokemonsAPI, PokemonListResponseType } from '../Service/pokemonService'

// Create a thunk to asynchronously fetch Pokémon list
export const fetchPokemons = createAsyncThunk(
  // Action type string for tracking actions
  'pokemon/fetchPokemons', 
  // Async function that optionally takes a URL for pagination
  async (nextUrl?: string) => { 
    // Call API to fetch Pokémon list, either initial or from nextUrl
    const response = await fetchPokemonsAPI(nextUrl) 
    // Return the response data
    return response 
  },
)

// Define the interface for the state of Pokémon list
interface PokemonsState {
  // Define the shape of the Pokémon list state
  pokemons: PokemonListResponseType 
}

// Define the initial state for Pokémon list
const initialState = {
  pokemons: {
    count: 0,        // Initial count of Pokémon, starting with zero
    next: '',        // Next URL for pagination, initially empty
    results: []      // Results array to hold Pokémon list, initially empty
  },
  // Typecast initialState to match PokemonsState interface
} as PokemonsState 

// Create a slice to manage Pokémon list state
const pokemonsSlice = createSlice({
  name: 'pokemons', // Name of the slice
  initialState,     // Set the initial state
  reducers: {},     // No synchronous reducers needed
  // Use builder to add cases for async actions
  extraReducers: (builder) => { 
    // Handle the fulfilled state of the fetchPokemons thunk
    builder.addCase(fetchPokemons.fulfilled, (state, action: PayloadAction<PokemonListResponseType>) => {
      // Check if there are already Pokémon in the current state (for pagination)
      if (state.pokemons.results.length > 0) {
        // If there are existing results, merge new Pokémon data with existing state
        state.pokemons = {
          // Spread new payload properties (e.g., count, next)
          ...action.payload, 
          // Append new results to existing results array
          results: [...state.pokemons.results, ...action.payload.results] 
        }
      } else {
        // If there are no existing results, directly set the state with new payload
        state.pokemons = action.payload;
      }
    })
  },
})

// Export the reducer function for use in the Redux store
export const pokemonsReducer = pokemonsSlice.reducer
