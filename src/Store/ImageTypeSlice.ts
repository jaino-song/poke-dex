// Import PayloadAction type for action payload type definition
import type { PayloadAction } from '@reduxjs/toolkit'
// Import createSlice to create a Redux slice with reducers and actions
import { createSlice } from '@reduxjs/toolkit'
// Import constants for Pokémon image types
import { POKEMON_IMAGE_TYPE } from '../Constants/index'

// Pokemon 이미지 키 타입을 선언 (POKEMON_IMAGE_TYPE의 값들 중 하나)
export type PokemonImageKeyType = typeof POKEMON_IMAGE_TYPE[keyof typeof POKEMON_IMAGE_TYPE]

// 이미지 상태의 타입 선언 (state의 구조를 정의)
export interface ImageTypeState {
  // 현재 이미지 타입을 나타내는 필드
  type: PokemonImageKeyType 
}

// 초기 상태 선언 (초기 이미지 타입 설정)
const initialState: ImageTypeState = {
  // 기본 이미지 타입을 FRONT_DEFAULT로 설정
  type: POKEMON_IMAGE_TYPE.FRONT_DEFAULT, 
}

// imageType을 조정하기 위한 Slice 생성 (슬라이스는 상태와 리듀서 로직을 결합)
export const imageTypeSlice = createSlice({
  name: 'imageType', // Slice의 이름 정의 (액션 타입을 구분하기 위해 사용됨)
  initialState,      // 초기 상태 설정
  reducers: {
    // 이미지 타입을 변경하는 리듀서 정의 (상태를 변경하기 위해 사용)
    changeImageType: (state, action: PayloadAction<ImageTypeState>) => {
      // action.payload에서 전달된 새로운 타입으로 이미지 타입을 변경
      state.type = action.payload.type 
    }
  },
})

// 각 리듀서 함수에 대한 액션 생성기 생성 (컴포넌트에서 사용할 수 있는 액션 생성)
export const { changeImageType } = imageTypeSlice.actions

// imageType 리듀서를 export 하여 스토어에서 사용 가능하도록 설정
export const imageTypeReducer = imageTypeSlice.reducer
