const express = require('express')
const mongodb = require('mongodb')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []

    await req.user.save()
    res.send(req.user.tokens)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const _id = req.user._id
  const ObjectID = mongodb.ObjectId

  if (ObjectID.isValid(_id) === false) {
    return res.status(404).send()
  }

  const updates = Object.keys(req.body)
  const updatesAllowed = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) =>
    updatesAllowed.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!!!' })
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]))

    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()
    res.send(user)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
