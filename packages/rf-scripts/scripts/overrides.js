#!/usr/bin/env node

const paths = require('../lib/env/paths');
const rewireModule = require('../lib/utils/rewireModule');
const { webpack, config } = require(paths.configOverrides);
const compose = require('../lib/utils/compose')(
  process.env.NODE_ENV,
  config,
  paths
);

rewireModule(
  'react-scripts/scripts/' + process.argv[2],
  compose(
    webpack,
    require('../rf.default.js')
  )
);
