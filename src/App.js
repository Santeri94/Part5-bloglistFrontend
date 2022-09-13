import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import AddBlog from './components/AddBlog'


const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
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

  const blogForm = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}
    </div>
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
        <Notification message={errorMessage} />
        <Togglable buttonlabel='login'>
        <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({target}) => setUsername(target.value)}
        handlePasswordChange={({target}) => setPassword(target.value)} 
        handleSubmit={handleLogin}/>
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <br></br>
      <Notification message={errorMessage} />
      <br></br>
      <Togglable buttonLabel="new blog">
      <AddBlog
      title={title}
      author={author}
      url={url}
      handleAuthorChange={({ target }) => setAuthor(target.value)}
      handleTitleChange={({ target }) => setTitle(target.value)}
      handleUrlChange={({ target }) => setUrl(target.value)}
      onSubmit={handleNewBlog}/>
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      {blogForm()}
    </div>
  )
}

export default App // untill 5.4 tehty
