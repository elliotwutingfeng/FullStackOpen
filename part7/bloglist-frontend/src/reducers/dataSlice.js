import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    username: '',
    password: '',
    user:null,
    usersById:[],
    blogs:[],
    blogsByUserId:{},
    errorMessage:{ message:null,success:false },
    title:'',
    author:'',
    url:'',
    currentUserId:'60b9e3abc2403351c7ade0d5',
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
      state.blogsByUserId = {}
      state.usersById = {}
      for(const blog of state.blogs){
        if(!Object.keys(state.blogsByUserId).includes(blog.user.id)){
          state.blogsByUserId[blog.user.id] = []
          state.usersById[blog.user.id] = blog.user
        }
        state.blogsByUserId[blog.user.id].push(blog)
      }
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