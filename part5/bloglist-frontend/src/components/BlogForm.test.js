import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, act } from '@testing-library/react'
import BlogForm from './BlogForm'
describe('<BlogForm />',() => {
  let component
  let addBlogHandlerMock
  let setErrorMessageMock

  beforeEach(() => {
    addBlogHandlerMock = jest.fn()
    setErrorMessageMock = jest.fn()
    component = render(
      <BlogForm addBlog={addBlogHandlerMock} setErrorMessage={setErrorMessageMock} />
    )
  })

  test('the form calls the event handler it received as props with the right details when a new blog is created',() => {
    // Fill up form
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
      target: { value: 'The New Author' }
    })
    fireEvent.change(title, {
      target: { value: 'The New Title' }
    })
    fireEvent.change(url, {
      target: { value: 'The New URL' }
    })
    // Submit form
    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    // Verify event handler props
    expect(addBlogHandlerMock.mock.calls).toHaveLength(1)
    expect(addBlogHandlerMock.mock.calls[0][0]['author']).toBe('The New Author')
    expect(addBlogHandlerMock.mock.calls[0][0]['title']).toBe('The New Title')
    expect(addBlogHandlerMock.mock.calls[0][0]['url']).toBe('The New URL')
  })
})