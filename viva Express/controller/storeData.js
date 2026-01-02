const datas = require('../models/userModels')
const bcrypt = require('bcrypt')

const postData = async (req, res) => {
  try {
    const { name, password, email } = req.body
    const hashPassword = await bcrypt.hash(password, 10)

    const createdUser = await datas.create({
      name,
      email,
      password: hashPassword
    })

    res.status(201).json({
      message: 'User created successfully',
      user: createdUser
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

module.exports = {
  postData
}
