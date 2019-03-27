import { call } from './cli'
import { createUser } from './aws'
import { callChallenge } from './cognito'

/**
 *
 * @param {Array<String>} args
 * @returns Promise
 */
const fun = args => {
  return createUser(
    args.main.username,
    args.main.password,
    args.main.email,
    args.main.telephone
  ).then(u =>
    callChallenge(args.main.username, args.main.password, args.main.name)
  )
}

call(fun)
  .then(response => {
    if (response) {
      console.log('criado com sucesso')
    }
  }) // TODO fix to multiple errors output
  .catch(err => console.error(err))
