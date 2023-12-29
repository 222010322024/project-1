const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');
const _ = require('lodash');

module.exports = {
  signUpUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const isUserAlreadyExists = await User.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        status: 'fail',
        msg: 'User already exists',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const returnUser = _.pick(newUser, ['email', '_id']);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      msg: 'User created successfully',
      data: {
        user: returnUser,
      },
    });
  }),

  signInUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: 'fail',
        msg: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        status: 'fail',
        msg: 'Invalid password',
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    const returnUser = _.pick(user, ['email', '_id']);

    res.status(httpStatus.OK).json({
      status: 'success',
      msg: 'User signed in successfully',
      data: {
        user: returnUser,
        token,
      },
    });
  }),
};
