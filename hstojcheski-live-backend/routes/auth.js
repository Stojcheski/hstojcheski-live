import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).send('User not found')
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).send('Invalid password')
    }

    res.status(200).json({ message: 'Login successful', user })
  } catch (err) {
    res.status(500).send('Server error ' + err)
  }
})

export default router
