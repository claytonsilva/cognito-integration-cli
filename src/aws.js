import { Config, CognitoIdentityServiceProvider } from 'aws-sdk'
import {
  COGNITO_USER_POOL_ID,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from './config'
var config = new Config({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
})
const cognitoIDP = new CognitoIdentityServiceProvider(config)

/**
 *
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @param {String} telephone
 * @returns {Promise}
 */
export const createUser = (username, password, email, telephone) => {
  var params = {
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: username,
    DesiredDeliveryMediums: ['EMAIL', 'SMS'],
    ForceAliasCreation: true,
    MessageAction: 'SUPPRESS',
    TemporaryPassword: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      },
      {
        Name: 'email_verified',
        Value: 'true'
      },
      {
        Name: 'phone_number',
        Value: telephone
      },
      {
        Name: 'phone_number_verified',
        Value: 'true'
      }
    ]
  }
  return cognitoIDP
    .adminCreateUser(params)
    .promise()
    .then(result => {
      console.log(`User created on console admin`)
      console.log(result.User)
      return result.User
    })
}
