import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchPokemonsAPI, PokemonListResponseType } from '../Service/pokemonService'

// First, create the thunk
const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (nextUrl?:string) => {
    const response = await fetchPokemonsAPI(nextUrl)
    return response 
  },
)

interface PokemonsState {
  pokemons: PokemonListResponseType
}

const initialState = {
  pokemons: {
    count: 0,
    next: '',
    results: []
  },
} as PokemonsState

// Then, handle actions in your reducers:
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    })
  },
})

// Later, dispatch the thunk as needed in the app
dispatch(fetchUserById(123))