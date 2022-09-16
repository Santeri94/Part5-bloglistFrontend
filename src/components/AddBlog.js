import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes

    })
    setAuthor('')
    setTitle('')
    setUrl('')
    setLikes('')
  }
  return (
    <div>
      <h2>Create a new blog</h2>

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
        <div>
        likes:
          <input
            type="number"
            value={likes}
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default AddBlog