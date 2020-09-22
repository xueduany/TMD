#!/usr/bin/env node

const exec = require("child_process").exec;
exec('node '+__dirname+'/../index.js').stdout.pipe(process.stdout);