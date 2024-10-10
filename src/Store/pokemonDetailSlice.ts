import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'
import { fetchPokemonDetailAPI, PokemonDetailType } from '../Service/pokemonService'

// Thunk Creation
export const fetchPokemonDetail = createAsyncThunk(
  'pokemon/fetchPokemonDetail',
  async (name:string) => {
    const response = await fetchPokemonDetailAPI(name)
    return response 
  },
  {
    condition: (name, { getState }) => {
      const { pokemonDetail } = getState() as RootState
      const pokemon = pokemonDetail.pokemonDetails[name]
      return !pokemon;
    }
  }
)

interface PokemonDetailState {
  // pokemonDetails: {
  //  '이상해씨': PokemonDetailType,
  //  '피카츄': PokemonDetailType
  // }
  // 앞에 이름은 키 값이 되고, 뒤는 밸류 값이 된다
  pokemonDetails: Record<string, PokemonDetailType>
}

const initialState = {
  pokemonDetails: {}
} as PokemonDetailState

// Then, handle actions in your reducers:
const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchPokemonDetail.fulfilled, (state, action:PayloadAction<PokemonDetailType>) => {
      state.pokemonDetails = {
        ...state.pokemonDetails,
        [action.payload.name]: action.payload
      }
    })
  },
})
export const pokemonDetailReducer = pokemonDetailSlice.reducer