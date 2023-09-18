const path = require('path');

const projectDir = path.resolve(process.cwd()), projectNodeModules = path.resolve(projectDir, 'node_modules'),
    exampleDir = path.resolve(projectDir, 'example'), projectPackage = path.resolve(projectDir, 'package.json'),
    examplePackage = path.resolve(exampleDir, 'package.json'), currentDir = path.resolve(__dirname),
    tempDir = path.resolve(currentDir, './temp'), dotExampleDir = path.resolve(currentDir, '.example');

module.exports = {
    projectDir, projectNodeModules, exampleDir, projectPackage, examplePackage, currentDir, tempDir, dotExampleDir
};
