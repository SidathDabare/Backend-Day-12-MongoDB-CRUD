/** @format */

import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
//import posts from "../../../data/posts.json"
import BlogItem from "../blog-item/BlogItem"

const BlogList = (props) => {
  const [blogPosts, setBlogPosts] = useState([])
  console.log(blogPosts)
  const getBlogPosts = async () => {
    let url = `${process.env.REACT_APP_URL}/blogPosts`
    try {
      let res = await fetch(url)
      let data = await res.json()
      return data
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBlogPosts().then((posts) => {
      setBlogPosts(posts)
      //console.log(post)
    })
  }, [])

  return (
    <Row>
      {blogPosts.map((post, i) => (
        <Col
          key={i}
          md={4}
          style={{
            marginBottom: 50,
          }}>
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  )
}

export default BlogList
