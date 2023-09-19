const path = require('path');
const paths = require('./paths');
const fs = require('fs-extra');
const generator = require('./generator');
const chokidar = require('chokidar');
const {parse} = require('@kne/md-doc');

const readmeParse = async () => {
    const readmeString = await fs.readFile(path.resolve(paths.projectDir, './README.md'), 'utf8');
    const readmeJsonData = parse(readmeString);
    await fs.writeFile(path.resolve(paths.exampleDir, './components-doc.js'), generator(readmeJsonData));
};

const start = () => {
    chokidar.watch([path.resolve(paths.projectDir, './README.md'), path.resolve(process.cwd(), 'package.json')]).on('all', (event, path) => {
        readmeParse().catch((e) => {
            console.error(e);
        });
    });
};

module.exports = {start, build: readmeParse};
