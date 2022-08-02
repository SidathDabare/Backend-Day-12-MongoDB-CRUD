/** @format */

import React, { useCallback, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./styles.css"
const NewBlogPost = (props) => {
  const [text, setText] = useState("")

  const [postTitle, setPostTitle] = useState("")
  const [postCategory, setPostCategory] = useState("")
  const [postCover, setPostCover] = useState("")
  const [postAuthorName, setPostAuthorName] = useState("")
  const [postAuthorAvatar, setPostAuthorAvatar] = useState("")
  const [postReadTimeValue, setPostReadTimeValue] = useState("")
  const [postReadTimeUnit, setPostReadTimeUnit] = useState("")
  const [postContent, setPostContent] = useState("")

  const addBlogPost = async () => {
    let url = `${process.env.REACT_APP_URL}/blogPosts/`

    try {
      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          title: postTitle,
          category: postCategory,
          cover: postCover,
          author: { name: postAuthorName, avatar: postAuthorAvatar },
          readTime: { value: postReadTimeValue, unit: postReadTimeUnit },
          content: postContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      let data = await res.json()
      console.log(data)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    addBlogPost()
    e.preventDefault()
  }

  return (
    <Container className='new-blog-container'>
      <Form className='mt-5'>
        <Form.Group controlId='blog-form' className='mt-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            size='sm'
            placeholder='Title'
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='blog-category' className='mt-1'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            size='sm'
            as='select'
            onChange={(e) => setPostCategory(e.target.value)}>
            <option>Category</option>
            <option value='Music'>Music</option>
            <option value='Science'>Science</option>
            <option value='Programming'>Programming</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='blog-form' className='mt-1'>
          <Form.Label>Cover</Form.Label>
          <Form.Control
            size='sm'
            placeholder='Cover'
            onChange={(e) => setPostCover(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='blog-form' className='mt-1'>
          <Form.Label>Author name</Form.Label>
          <Form.Control
            size='sm'
            placeholder='Author name'
            onChange={(e) => setPostAuthorName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='blog-form' className='mt-1'>
          <Form.Label>Author avatar</Form.Label>
          <Form.Control
            size='lg'
            placeholder='Author avatar'
            onChange={(e) => setPostAuthorAvatar(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='blog-form' className='mt-1'>
          <Form.Label>Read time</Form.Label>
          <Form.Control
            size='sm'
            placeholder='Read time'
            onChange={(e) => setPostReadTimeValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='blog-form' className='mt-1'>
          <Form.Label>Read time unit</Form.Label>
          <Form.Control
            size='sm'
            placeholder='Read time unit'
            onChange={(e) => setPostReadTimeUnit(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='blog-content' className='mt-1'>
          <Form.Label>Blog Content</Form.Label>
          <ReactQuill
            onChange={(e) => setPostContent(e.target.value)}
            className='new-blog-content'
          />
        </Form.Group>
        <Form.Group className='d-flex mt-3 justify-content-end'>
          <Button type='reset' size='sm' variant='outline-dark'>
            Reset
          </Button>
          <Button
            type='submit'
            size='sm'
            variant='dark'
            style={{
              marginLeft: "1em",
            }}
            onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default NewBlogPost
