const path = require('path');
const paths = require('./paths');
const fs = require('fs-extra');
const transform = require('lodash/transform');
const applyTemplate = require('@kne/apply-template');
const spawn = require("cross-spawn-promise");

const MUST_PACKAGES = ['@tarojs/taro', 'react'];

const ENSURE_PACKAGES = ['@babel/runtime', '@kne/lodash-wechat', '@kne/antd-taro', '@kne/mini-core'];

const TARO_PACKAGES = ['@tarojs/helper', '@tarojs/plugin-framework-react', '@tarojs/plugin-platform-weapp', '@tarojs/react', '@tarojs/runtime', '@tarojs/shared', '@tarojs/cli', '@tarojs/mini-runner', '@tarojs/plugin-http', '@tarojs/taro-loader', '@tarojs/webpack5-runner', 'babel-preset-taro', 'eslint-config-taro'];

const install = async () => {
    console.log('-----------------开始执行初始化example--------------------');
    const projectPackageJSON = await fs.readJson(paths.projectPackage);
    console.log('1.初始化example文件夹');
    await fs.emptyDir(paths.exampleDir);
    console.log('2.确认项目已经安装必要包的版本');
    const versions = await (async () => {
        try {
            const versions = transform(await Promise.all(MUST_PACKAGES.map(async (name) => {
                const packageJSON = await fs.readJson(path.resolve(paths.projectNodeModules, name, './package.json'));
                return packageJSON.version;
            })), (result, value, index) => {
                result[MUST_PACKAGES[index]] = value;
            }, {});
            console.log(Object.keys(versions).map((key) => `${key}:${versions[key]}`).join('\n'));
            return versions;
        } catch (e) {
            console.error('请检查当前项目中@tarojs/taro或react是否已经正确安装后重试执行该程序');
            return null;
        }
    })();
    if (!versions) {
        return;
    }

    console.log('3.检查项目依赖');
    const taroVersion = versions['@tarojs/taro'];
    console.log(`当前Taro版本${taroVersion}`);
    const packageLinks = [], installPackages = [];
    await Promise.all(TARO_PACKAGES.map(async (packageName) => {
        if (!await fs.exists(path.resolve(paths.projectNodeModules, packageName, 'package.json'))) {
            installPackages.push(`${packageName}@${taroVersion}`);
        } else {
            packageLinks.push({
                name: packageName,
                version: `file:${path.relative(paths.exampleDir, paths.projectDir).split(path.sep).join('/')}/${packageName}`
            });
        }
    }));
    await Promise.all(ENSURE_PACKAGES.map(async (packageName) => {
        if (!await fs.exists(path.resolve(paths.projectNodeModules, packageName, 'package.json'))) {
            installPackages.push(packageName);
        } else {
            packageLinks.push({
                name: packageName,
                version: `file:${path.relative(paths.exampleDir, paths.projectDir).split(path.sep).join('/')}/${packageName}`
            });
        }
    }));
    console.log(`需要安装：${installPackages.join(',')}，项目已安装需要软连接:${packageLinks.map(({name}) => name).join(',')}`);
    packageLinks.push({
        name: projectPackageJSON.name, version: `file:${path.relative(paths.exampleDir, paths.projectDir)}`
    });

    console.log('4.创建临时目录，初始化模板');
    const tempOptions = {
        name: projectPackageJSON.name, dependencies: packageLinks
    };
    await fs.emptyDir(paths.dotExampleDir);

    await applyTemplate(paths.tempDir, paths.dotExampleDir, tempOptions);

    if (await fs.exists(path.resolve(paths.projectDir, 'temp'))) {
        console.log('当前项目存在自定义模板，执行自定义模板覆盖');
        await applyTemplate(path.resolve(paths.projectDir, 'temp'), paths.dotExampleDir, tempOptions);
    }

    console.log('执行额外包安装');
    await spawn("npm", ["i", '--legacy-peer-deps'], {stdio: 'inherit', cwd: paths.dotExampleDir});
    await spawn("npm", ["i", '--legacy-peer-deps', '--save', ...installPackages], {
        stdio: 'inherit', cwd: paths.dotExampleDir
    });
    console.log('5.创建example软连接');
    await fs.ensureSymlink(paths.dotExampleDir, paths.exampleDir);
    console.log('-----------------初始化example完成--------------------');
};

module.exports = install;

