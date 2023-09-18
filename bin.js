#!/usr/bin/env node

const install = require('./install');

process.on('unhandledRejection', err => {
    throw err;
});

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(x => x === 'install' || x === 'start' || x === 'build');
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

if (['install', 'start', 'build'].includes(script)) {
    install().catch((e)=>{
        console.error(e);
    });
} else {
    console.log('未知的命令 "' + script + '".');
}
