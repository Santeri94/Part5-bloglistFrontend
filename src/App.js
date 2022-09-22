import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlog from './components/AddBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
      window.localStorage.clear()
      setUser(null)
      setErrorMessage('Logged out!')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    } catch (exception){
      setErrorMessage('Cannot logout')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const blogForm = () => (
    <div>
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLikes={handleLikes} handleRemove={handleRemove} />)}
    </div>
  )
  const handleNewBlog = async (blogObject) => {
    try{
      blogFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const returnedBlog = await blogService.getAll()
      setBlogs(returnedBlog)
      setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception)  {
      setErrorMessage('Error when creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id,blogToUpdate)
      const newblogs = blogs.map((blog) => blog.id === id ? updatedBlog : blog)
      setBlogs(newblogs)
      setErrorMessage(`You liked ${updatedBlog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception) {
      setErrorMessage('Error when updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleRemove = async (id) => {
    try {
      blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setErrorMessage('Blog has been deleted')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }catch(exception) {
      setErrorMessage('Error when deleting blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null){
    return(
      <div>
        <Notification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br></br>
      <Notification message={errorMessage} />
      <br></br>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <AddBlog createBlog={handleNewBlog}/>
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      {blogForm()}
    </div>
  )
}

export default App

