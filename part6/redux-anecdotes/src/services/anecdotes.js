import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const generateId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0
  }
}
const createNew = async (content) => { 
  const object = asObject(content)
   const response = await axios.post(baseUrl, object)
    return response.data
}
const updateExisting = async (id, newObject) => {
  const response = await axios.put(baseUrl+'/'+id,newObject)
  return response.data
}
const defaults = { getAll,createNew, updateExisting }
export default defaults