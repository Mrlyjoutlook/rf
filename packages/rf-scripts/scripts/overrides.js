#!/usr/bin/env node

const paths = require("./utils/paths");
const rewireModule = require("./utils/rewireModule");
const compose = require("./utils/compose")(process.env.NODE_ENV);

rewireModule(
  "react-scripts/scripts/" + process.argv[2],
  compose(
    require(paths.configOverrides).webpack,
    require("../rf.default.js")
  )
);
