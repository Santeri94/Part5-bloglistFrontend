
const Blog = ({ blog,handleLikes,handleRemove }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonDelete = {
    color: 'red',
    border: 'solid'
  }

  const buttonLike = {
    color: 'green',
    border: 'solid',
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
    <div style={blogStyle} className='blog'>
      <div className="titleAndAuthor">
        {blog.title} {blog.author}
      </div>
        likes: {blog.likes} <button className="likeButton" style={buttonLike} onClick={like}>like</button> {' '}
      <button style={buttonDelete} onClick={remove}>delete</button>
    </div>)
}

export default Blog