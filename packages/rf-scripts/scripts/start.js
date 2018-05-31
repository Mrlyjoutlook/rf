#!/usr/bin/env node

"use strict";

process.env.NODE_ENV = "development";

const paths = require("./utils/paths");
const rewireModule = require("./utils/rewireModule");
// const overrides = require("../.rf");
const compose = require("./utils/compose");

rewireModule(
  "react-scripts/scripts/start.js",
  compose(
    // require("../rf.dev.js"),
    // require("../rf.js"),
    require("../rf.default.js")
  )
);
