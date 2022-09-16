
const Blog = ({ blog,handleLikes,handleRemove }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    handleLikes(blog.id,updatedBlog)
  }

  const remove = () => {
    const question = window.confirm(`Remove ${blog.title} from ${blog.author}?`)
    if(question){
      handleRemove(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {blog.likes} <button onClick={like}>like</button>
      <button onClick={remove}>delete</button>
    </div>)
}

export default Blog