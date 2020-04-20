import axios from 'axios'
const baseURL = '/api/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const create = newPerson => {
  return axios.post(baseURL, newPerson)
}

const deletePerson = id => {
  return axios.delete(`${baseURL}/${id}`);
}

const updatePerson = (id, person) => {
  return axios.put(`${baseURL}/${id}`, person)
}

export default { getAll, create, deletePerson, updatePerson }
