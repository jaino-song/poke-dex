// Import required functions from Redux Toolkit
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// Import RootState type to use the application's global state
import { RootState } from '.'
// Import API service function and type for Pokémon details
import { fetchPokemonDetailAPI, PokemonDetailType } from '../Service/pokemonService'

// Thunk to asynchronously fetch Pokémon details
export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail', // Name of the action (namespace for async action types)
  // Async function that takes the Pokémon name as a parameter
  async (name: string) => { 
    // Call API to get Pokémon details by name
    const response = await fetchPokemonDetailAPI(name) 
    // Return the response data
    return response 
  },
  {
    // Condition to control whether the API call should proceed or not
    // Callback to determine if the fetch should be executed
    condition: (name, { getState }) => { 
      // Get current state from the Redux store and typecast to RootState
      const { pokemonDetail } = getState() as RootState 
      // Check if Pokémon details are already in the state
      const pokemon = pokemonDetail.pokemonDetails[name] 
      // Only proceed if the details do not already exist in the state
      return !pokemon; 
    }
  }
)

// Interface to define the shape of the Pokémon detail state
interface PokemonDetailState {
  // Record object where key is Pokémon name and value is Pokémon details type
  pokemonDetails: Record<string, PokemonDetailType> 
}

// Initial state for the Pokémon detail slice
const initialState = {
  // Start with an empty object to store Pokémon details
  pokemonDetails: {} 
  // Explicitly type initialState to conform to PokemonDetailState interface
} as PokemonDetailState 

// Create a slice to manage Pokémon detail state
const pokemonDetailSlice = createSlice({
  // Name of the slice
  name: 'pokemonDetail', 
  // Set initial state value
  initialState, 
  // No synchronous reducers needed for this slice
  reducers: {}, 
  // Use builder to add cases for async actions
  extraReducers: (builder) => { 
    // Handle the fulfilled state of fetchPokemonDetail thunk
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action: PayloadAction<PokemonDetailType>) => {
      // Add Pokémon details to state upon successful API call
      // Update pokemonDetails state object
      state.pokemonDetails = { 
        // Keep existing Pokémon details
        ...state.pokemonDetails, 
        // Add new Pokémon details using the name as key
        [action.payload.name]: action.payload 
      }
    })
  },
})

// Export the reducer function to use it in the store configuration
export const pokemonDetailReducer = pokemonDetailSlice.reducer
