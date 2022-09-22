import { useState } from 'react'

const AddBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,

    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleNewBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder='write title here'
          />
        </div>
        <div>
        author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='write author here'
          />
        </div>
        <div>
        url:
          <input
            id='url'
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder='write url here'
          />
        </div>
        <button id='save' type="submit">save</button>
      </form>
    </div>
  )
}

export default AddBlog