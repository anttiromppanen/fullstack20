import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

import blogService from './services/blogs'
import loginService from './services/login'

import Loginform from './components/Loginform'
import ShowBlogs from './components/ShowBlogs'
import NewBlog from './components/NewBlog'
import ShowUser from './components/ShowUser'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs.length])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      blogService.setToken(user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('wrong username or password')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const decodedToken = jwtDecode(user.token)
    const blogToAdd = {
      title,
      author,
      url,
      user: decodedToken.id,
    }

    blogService.setToken(user.token)

    try {
      const response = await blogService
       .create(blogToAdd)

      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')

      setMessage(`a new blog ${title} by ${author} added`)
    } catch (error) {
      setMessage('adding of new blog failed')
    }
  }

  return (
    <div>
      <Message message={ message } setMessage={ setMessage } />
      {user === null
      ? <Loginform
          handleLogin={ handleLogin }
          username={ username }
          setUsername={ setUsername } 
          password={ password }
          setPassword={ setPassword }
        />
      : <div>
          <ShowUser user={ user } />
          <NewBlog
            title={ title }
            setTitle={ setTitle }
            author={ author }
            setAuthor={ setAuthor }
            url={ url }
            setUrl={ setUrl }
            handleSubmit={ addBlog }
          /> <br />
          <ShowBlogs blogs={ blogs } user={ user } />
        </div>
      }
    </div>
  )
}

export default App