import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const tokenSecret: string = process.env.TOKEN_SECRET as string

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, tokenSecret)
    next()
  } catch (err) {
    res.status(401).json({ err: 'Unauthorized access' })
  }
}

export const createJWTToken = (id: number, user_name: string): string => {
  const payload: JwtPayload = { id, user_name }
  return jwt.sign(payload, tokenSecret)
}
