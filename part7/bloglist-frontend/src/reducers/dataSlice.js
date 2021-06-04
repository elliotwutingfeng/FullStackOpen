import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    username: '',
    password: '',
    user:null,
    blogs:[],
    errorMessage:{ message:null,success:false },
    title:'',
    author:'',
    url:'',
  },
  reducers: {
    setUsername: (state,action) => {
      state.username = action.payload
    },
    setPassword: (state,action) => {
      state.password = action.payload
    },
    setUser: (state,action) => {
      state.user = action.payload
    },
    setBlogs: (state,action) => {
      state.blogs = action.payload
    },
    setErrorMessage: (state,action) => {
      state.errorMessage = action.payload
    },
    setTitle: (state,action) => {
      state.title = action.payload
    },
    setAuthor: (state,action) => {
      state.author = action.payload
    },
    setURL: (state,action) => {
      state.url = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setPassword,setUser,setBlogs,setErrorMessage ,setTitle,setAuthor,setURL } = dataSlice.actions

export default dataSlice.reducer