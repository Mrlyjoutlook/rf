#!/usr/bin/env node

const paths = require("../lib/env/paths");
const rewireModule = require("../lib/utils/rewireModule");
const compose = require("../lib/utils/compose")(process.env.NODE_ENV);

rewireModule(
  "react-scripts/scripts/" + process.argv[2],
  compose(
    require(paths.configOverrides).webpack,
    require("../rf.default.js")
  )
);
