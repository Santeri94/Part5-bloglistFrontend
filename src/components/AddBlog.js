const AddBlog = ({ onSubmit,handleAuthorChange,handleTitleChange,handleUrlChange,title,author,url }) => {
    return (
      <div>
        <h2>Create a new blog</h2>
  
        <form onSubmit={onSubmit}>
        <div>
        title:
          <input
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
          <button type="submit">save</button>
        </form>
      </div>
    )
  }
  
  export default AddBlog