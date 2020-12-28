const tasks = t => t.join(' && ')

module.exports = {
  hooks: {
    'pre-commit': tasks([
      'terraform fmt -recursive -check ./terraform/',
      "npm run lint",
    ])
  }
}
