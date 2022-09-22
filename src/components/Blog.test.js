import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'React testing',
    author: 'Santeri',
    url: 'www.testingReact.fi',
    likes: 5
  }

test('renders title AND author', () => {
  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.titleAndAuthor')
  expect(div).toHaveTextContent('React testing Santeri')}
)
