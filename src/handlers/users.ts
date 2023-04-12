import { UsersModel } from '../models/users'
import { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { verifyAuthToken } from '../middleware/Auth'

const users = new UsersModel()

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await users.index()
    res.status(200).send(getUsers)
  } catch (err) {
    res.status(500).json(err)
  }
}

const getSingleUser = async (_req: Request, res: Response) => {
  const userId = _req.params.id as unknown as number
  try {
    const user = await users.show(userId)
    if (!user) {
      res.status(404).json(`No user with id ${userId} exists!`)
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json(err)
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { user_name, first_name, last_name, password } = req.body
    const newUser = await users.create(req.body)
    const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string)
    res.status(200).json(token)
  } catch (err) {
    res.status(500).json(err)
  }
}

const editUser = async (req: Request, res: Response) => {
  const userId = req.body.id as unknown as number
  try {
    const user = await users.show(userId)
    if (!user) {
      res.status(404).json(`User with id ${userId} does not exist!`)
    } else {
      const { id, user_name, first_name, last_name, password } = req.body
      const editedUser = await users.edit(req.body)

      res.status(200).json(editedUser)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (_req: Request, res: Response) => {
  const userId = _req.body.id as unknown as number
  try {
    const user = await users.show(userId)
    if (!user) {
      res.status(404).json(`User with id ${userId} doesnot exist!`)
    } else {
      await users.delete(userId)
      res.status(200).json(`User with id ${userId} succesfully deleted`)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

const userRoutes = (app: Application) => {
  app.get('/users', verifyAuthToken, getAllUsers)
  app.get('/user/:id', verifyAuthToken, getSingleUser)
  app.post('/user', createUser)
  app.put('/user', verifyAuthToken, editUser)
  app.delete('/user', verifyAuthToken, deleteUser)
}

export default userRoutes
