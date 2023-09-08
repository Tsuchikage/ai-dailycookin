import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type State = {
	before: any | null
	after: any | null
	background: string
	description: string | null
	tags: string[]
}

const initialState = {
	file: null,
	after: null,
	before: null,
	background: '#FFFFFF',
	description: null,
	tags: []
} as State

const slice = createSlice({
	name: 'slice',
	initialState,
	reducers: {
		setAfter: (state, action: PayloadAction<string | null>) => {
			state.after = action.payload
		},
		setBefore: (state, action: PayloadAction<string | null>) => {
			state.before = action.payload
		},
		setBackground: (state, action: PayloadAction<string>) => {
			state.background = action.payload
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload
		},
		setTags: (state, action: PayloadAction<string[]>) => {
			state.tags = action.payload
		},
		reset: () => initialState
	}
})

export const { setAfter, setBefore, setBackground, setTags, setDescription } =
	slice.actions
export default slice.reducer
