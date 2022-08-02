/** @format */

import express from "express"
import createHttpError from "http-errors"
import BlogPostsModel from "./model.js"

const blogPostsRouter = express.Router()

blogPostsRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new BlogPostsModel(req.body) // here it happens the validation (thanks to Mongoose) of request body, if it is not ok Mongoose will throw an error (if it is ok it is NOT saved yet)
    const { _id } = await newUser.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.get("/", async (req, res, next) => {
  try {
    const users = await BlogPostsModel.find()
    res.send(users)
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await BlogPostsModel.findById(req.params.postId)
    if (user) {
      res.send(user)
    } else {
      next(createHttpError(404, `User with id ${req.params.postId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.put("/:postId", async (req, res, next) => {
  try {
    const updatedUser = await BlogPostsModel.findByIdAndUpdate(
      req.params.postId, // WHO you want to modify
      req.body, // HOW you want to modify
      { new: true, runValidators: true } // OPTIONS. By default findByIdAndUpdate returns the record pre-modification. If you want to get back the newly update record you should use the option new: true
      // By default validation is off here --> runValidators: true
    )
    // ************************************************* ALTERNATIVE METHOD *******************************************************

    // const user = await BlogPostsModel.findById(req.params.userId) // when you do a findById, findOne, etc,... you get back a MONGOOSE DOCUMENT which is NOT a normal object but an object with some superpowers (like the .save() method) that will be useful in the future

    // user.firstName = "Diego"

    // await user.save()

    // res.send(user)

    if (updatedUser) {
      res.send(updatedUser)
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

blogPostsRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await BlogPostsModel.findByIdAndDelete(
      req.params.userId
    )
    if (deletedUser) {
      res.status(204).send()
    } else {
      next(createHttpError(404, `User with id ${req.params.userId} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default blogPostsRouter
