import * as dotenv from 'dotenv'
dotenv.config()
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID
export const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID
export const AWS_REGION = process.env.AWS_REGION
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
