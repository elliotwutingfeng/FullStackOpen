import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
describe('<Blog />',() => {
  let component
  let likesHandlerMock
  const blog = {
    title: 'The Title',
    author: 'The Author',
    url: 'The URL',
    likes: 42,
    user:{ name:'The User Name' }
  }
  beforeEach(() => {
    likesHandlerMock = jest.fn()
    component = render(
      <Blog blog={blog} incrementLike={likesHandlerMock} />
    )
  })
  test('Render blog title and author, but not url or likes by default', () => {
    let div = component.container.querySelector('.blogContent')
    expect(div).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(div).not.toHaveTextContent(`${blog.url}`)
    expect(div).not.toHaveTextContent(`${blog.likes}`)
  })

  test('blog\'s url and number of likes are shown when the button controlling the shown details has been clicked',() => {
    const button = component.getByText('view')
    fireEvent.click(button)
    let div = component.container.querySelector('.blogContent')
    expect(div).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(div).toHaveTextContent(`${blog.url}`)
    expect(div).toHaveTextContent(`${blog.likes}`)
  })


  test('if the like button is clicked twice, the event handler the component received as props is called twice',() => {
    // Expand blog details to reveal the like button
    let button = component.getByText('view')
    fireEvent.click(button)
    // Click the like button twice
    button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    // Like event handler should be called twice
    expect(likesHandlerMock.mock.calls).toHaveLength(2)
  })
})