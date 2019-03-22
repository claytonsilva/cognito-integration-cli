import { AuthClass } from '@aws-amplify/auth'

import * as nodeFetch from 'node-fetch'
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID, AWS_REGION } from './config'
global.fetch = nodeFetch

const AuthOptions = {
  userPoolId: COGNITO_USER_POOL_ID,
  userPoolWebClientId: COGNITO_CLIENT_ID,
  authenticationFlowType: 'USER_PASSWORD_AUTH',
  region: AWS_REGION
}

export const callChallenge = (username, password, name) => {
  const auth = new AuthClass(AuthOptions)
  return auth
    .signIn(username, password)
    .then(user => {
      switch (user.challengeName) {
        case 'NEW_PASSWORD_REQUIRED':
          return auth
            .completeNewPassword(user, password, {
              name: name || username
            })
            .then(userLogged => {
              console.log('SUCCESS')
              return userLogged
            })
            .catch(err => {
              console.error(err)
              return null
            })
        default:
          return user
      }
    })
    .catch(err => {
      console.error(err)
      return null
    })
}
