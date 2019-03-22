import cliArgs from 'command-line-args'
import cliUsage from 'command-line-usage'
import R from 'ramda'
const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
    required: false,
    group: 'main'
  },
  {
    name: 'password',
    alias: 'p',
    type: String,
    description: 'Password of the user (required)',
    required: true,
    group: 'main'
  },
  {
    name: 'telephone',
    alias: 't',
    type: String,
    description: 'Telephone of the user (required)',
    required: true,
    group: 'main'
  },
  {
    name: 'email',
    alias: 'e',
    type: String,
    required: true,
    description: 'Email of the user (required)',
    group: 'main'
  },
  {
    name: 'username',
    alias: 'u',
    type: String,
    required: true,
    description: 'Username (required)',
    group: 'main'
  },
  {
    name: 'name',
    alias: 'n',
    type: String,
    required: true,
    description: 'Name of the user',
    group: 'requiredAttributes'
  }
]

const optionsUsage = [
  {
    header: 'Usage',
    content: 'cognito-cli usage'
  },
  {
    header: 'Options',
    optionList: optionDefinitions
  },
  {
    content:
      'Project home: {underline https://github.com/claytonsilva/cognito-integration-cli}'
  }
]

const options = cliArgs(optionDefinitions)

/**
 *
 * @param {Function} func
 * @returns {Promise}
 */
export const call = func => {
  if (options.main.help) {
    const usage = cliUsage(optionsUsage)
    console.log(usage)
  } else if (
    R.pipe(
      R.filter(n => n.required),
      R.any(n => R.isNil(options[n.group][n.name]))
    )(optionDefinitions)
  ) {
    R.pipe(
      R.filter(n => n.required),
      R.filter(n => R.isNil(options[n.group][n.name])),
      R.map(n => console.error(`${n.name} is required`))
    )(optionDefinitions)
    const usage = cliUsage(optionsUsage)
    console.log(usage)
  } else {
    return func(options)
  }
}
