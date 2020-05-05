import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Loginform from './components/Loginform'
import ShowBlogs from './components/ShowBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('wrong credentials')
    }
  }

  return (
    <div>
      {user === null
      ? <Loginform
          handleLogin={ handleLogin }
          username={ username }
          setUsername={ setUsername } 
          password={ password }
          setPassword={ setPassword }
        />
      : <ShowBlogs blogs={ blogs } user={ user } />
      }
    </div>
  )
}

export default App