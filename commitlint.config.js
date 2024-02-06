module.exports = {
  extends: ['gitmoji'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'initial',
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'chore',
        'wip',
        'mv',
        'delete',
        'ui',
        'up',
        'down',
        'docker'
      ]
    ]
  }
}
