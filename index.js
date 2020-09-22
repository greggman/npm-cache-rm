'use strict';

const { ls } = require('cacache');
const cacache = require('cacache');
const childProcess = require('child_process');
const { verify } = require('crypto');
const path = require('path');

const preArgs = process.argv.slice(2);
if (preArgs.length < 0 || preArgs.length > 2) {
  printHelp();
}
const args = preArgs.filter(v => v !== '--dry-run');
const dryRun = args.length !== preArgs;
if (args.length !== 1) {
  printHelp();
}

function printHelp() {
  console.error(`removes matching entries from npm cache
usage:
  npm-cache-rm [--dry-run] regular-expression`);
  process.exit(1);
}

const cachePath = childProcess.execSync('npm config get cache').toString().trim();
const cacachePath = path.join(cachePath, '_cacache');

const realAPI = {
  ls: () => cacache.ls(cacachePath),
  rm: (key) => cacache.rm.entry(cacachePath, key),
  verify: () => cacache.verify(cacachePath),
};

const fakeAPI = {
  ls: realAPI.ls,
  rm: () => Promise.resolve(),
  verify: () => Promise.resolve(),
};

const api = dryRun ? fakeAPI : realAPI;

const re = new RegExp(args[0]);

api.ls().then((entries) => {
  const keys = Object.keys(entries).filter(k => re.test(k));
  return keys.reduce((p, key) => {
    console.log(`rm ${key}`);
    return p.then(() => api.rm(key));
  }, Promise.resolve());
}).then(() => {
  console.log('--cleaning up--');
  return api.verify();
}).then(() => {
  console.log('--done--');
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
