import * as AWSCognito from 'amazon-cognito-identity-js'
// import * as AWS from 'aws-sdk'
// import * as request from 'request'
// import * as jwkToPem from 'jwk-to-pem'
// import * as jwt from 'jsonwebtoken'
import * as nodeFetch from 'node-fetch'
import { COGNITO_USER_POOL_ID, COGNITO_CLIENT_ID } from './config'
global.fetch = nodeFetch

const AuthData = {
  Username: '',
  Password: ''
}

const ConfirmationCode = '208544'

const poolData = {
  UserPoolId: COGNITO_USER_POOL_ID,
  ClientId: COGNITO_CLIENT_ID
}

// const pool_region = 'us-east-2'

var userPool = new AWSCognito.CognitoUserPool(poolData)

const userData = {
  Username: AuthData.Username,
  Pool: userPool
}

var user = new AWSCognito.CognitoUser(userData)
var authenticationDetails = new AWSCognito.AuthenticationDetails(AuthData)

// var attributeList = []

// var dataEmail = {
//   Name: 'email',
//   Value: 'email@mydomain.com'
// }

// var dataPhoneNumber = {
//   Name: 'phone_number',
//   Value: '+15555555555'
// }
// var attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail)
// var attributePhoneNumber = new AWSCognito.CognitoUserAttribute(dataPhoneNumber)

// attributeList.push(attributeEmail)
// attributeList.push(attributePhoneNumber)

// userPool.signUp('username', 'password', attributeList, null, function (err, result) {
//   if (err) {
//     console.error(err)
//     return
//   }
//   const cognitoUser = result.user
//   console.log('user name is ' + cognitoUser.getUsername())
// })
// user.resendConfirmationCode(function (err, result) {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log('call result: ' + result)
// })
user.setAuthenticationFlowType('USER_PASSWORD_AUTH')

user.authenticateUser(authenticationDetails, {
  newPasswordRequired: (userAttributes, requiredAttributes) => {
    // userAttributes.name = AuthData.Username
    // delete userAttributes.email_verified
    user.completeNewPasswordChallenge(AuthData.Password, { name: AuthData.Username }, {
      onSuccess: () => {
        // var accessToken = result.getAccessToken().getJwtToken();

        // /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        // var idToken = result.idToken.jwtToken;
        // user.changePassword(AuthData.Password, AuthData.Password, function (err, result) {
        //   if (err) {
        //     console.error(err)
        //     return
        //   }
        //   console.log('call result: ' + result)
        // })
        console.log('SUCCESS')
      },
      onFailure: (err) => {
        console.error(err)
      }
    })
  },
  onSuccess: (result) => {
    // var accessToken = result.getAccessToken().getJwtToken();

    // /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
    // var idToken = result.idToken.jwtToken;
    // user.changePassword(AuthData.Password, AuthData.Password, function (err, result) {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    //   console.log('call result: ' + result)
    // })
    console.log(result)
  },
  onFailure: (err) => {
    if (err.code === 'PasswordResetRequiredException') {
      user.confirmPassword(ConfirmationCode, AuthData.Password, {
        onSuccess: (result) => {
          console.log(result)
        },
        onFailure: (err) => {
          console.error(err)
        }
      })
    } else {
      console.error(err)
    }
  }
})
