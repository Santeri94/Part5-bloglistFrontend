import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>  // haetaan hookeilla dataa servulta
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')  // haetaan serveriltä tietoja hookkien avulla
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      event.preventDefault()
      window.localStorage.clear()
      setUser(null)
      setErrorMessage('Logged out!') 
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    } catch (exception){
      setErrorMessage('Cannot logout')
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    }
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  const addBlog = () => (
    <form onSubmit={handleNewBlog}>
      <div>
        title:
          <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>      
  )

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        user: user,
        title: title,
        author: author,
        url: url
      }
      const authenticate = user.token
      blogService.create(blogObject,authenticate).then(blog => {
        setBlogs(blogs.concat(blog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage(`A new blog ${title} by ${author} added`) 
      })
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    } catch (exception){
      setErrorMessage('Could not add blog') 
      setTimeout(() =>{
        setErrorMessage(null)
      },5000)
    }
    }

  
  if (user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}    
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br></br>
      <h2>Create new blog</h2>
      <Notification message={errorMessage} />
      <br></br>
      {addBlog()}
      <br></br>
      {blogForm()}
    </div>
  )
}

export default App // untill 5.4 tehty
