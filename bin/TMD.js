#!/usr/bin/env node

const exec = require("child_process").exec;
exec('node ../index.js').stdout.pipe(process.stdout);