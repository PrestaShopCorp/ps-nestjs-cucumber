const common = {
  paths: ['test/acceptance/features/**/*.feature'],
  require: ['test/acceptance/features/**/*.ts', 'src/@types'],
  requireModule: ['ts-node/register', 'tsconfig-paths/register'],
  formatOptions: {
    snippetInterface: 'async-await',
  },
};

module.exports = {
  default: {
    ...common,
    format: ['progress', 'html:report/cucumber-report.html'],
  },
};
