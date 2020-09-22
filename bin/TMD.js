#!/usr/bin/env node

const exec = require("child_process").exec;
const args = process.argv.slice(2);
exec('node '+__dirname+'/../index.js '+args.join(' ')).stdout.pipe(process.stdout);