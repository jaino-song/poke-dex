import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchPokemonsAPI, PokemonListResponseType } from '../Service/pokemonService'

// Thunk Creation
export const fetchPokemons = createAsyncThunk(
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
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemons.fulfilled, (state, action:PayloadAction<PokemonListResponseType>) => {
      // Add user to the state array
      console.log(action.payload.results)
    })
  },
})
export const pokemonsReducer = pokemonsSlice.reducer