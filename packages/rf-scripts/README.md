# rf-scripts

> rewired react-scripts config

only support react-scripts@1.x

Create React App为开发者提供一套不错的配置，上手即用，并且提供了'eject'功能，可以自定义配置。
但当Create React App变化或者升级时，特别是它使用的react-scripts包变化时，可能会导致我们的配置出现不兼容的bug。
故Create React App的作者们也是强调若非必要请不要这么做！（即使用'eject'功能）可实际开发情况，我们都需要进行定制化配置修改。

Create React App的重点在于react-scripts包，其提供链接webpack配置功能，来助开发者们进行开发，打包，测试。rf-scripts是基于react-scripts包上再做一层封装，提供一些方便的功能。使用rewire模块来创建补丁，即运行时动态修改webpack配置的变量，使得我们可以对webpack进行定制。

## How to rewire your create-react-app project

install package

```shell
$ yarn add rf-script --dev
# or
$ npm install rf-script --save-dev
```

create a **.rf.js** file in the root directory

```javascript
module.exports = {
  config: {},
  webpack: (config, paths, env, base) => config
}
```

edit react-scripts in npm scripts

```diff
  /* package.json */

  "scripts": {
-   "start": "react-scripts start",
+   "start": "rf-scripts start",
-   "build": "react-scripts build",
+   "build": "rf-scripts build",
}
```

now, you can run.

## config file

### config Files

- `resolve_alias` 会添加到**webpack resolve -> alias**
- `compiler_vendors` webpack的**DllReferencePlugin**优化功能
- `compiler_commons` webpack的**CommonsChunkPlugin**优化功能

**compiler_vendors**

当进行开发或者打包时，都会对`config`的`compiler_vendors`字段进行校验⁉️

<div>
  <img src="https://github.com/Mrlyjoutlook/rf/blob/master/doc/check.png"/>
</div>

### webpack Files

- value is `function`.
- arguments include `config` `paths` `env` `base`.
  - `config` webpack config
  - `paths` file or directory path
  - `env` environment variables
  - `base` return `config Files` value
- return `config` ⚠️

**config**

webpack config

**paths**

return file and dir path, getProjectPaths and alias fields is help function.

**env**

return [custom environment variables](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables)

## change log

## LICENSE

[MIT](https://github.com/Mrlyjoutlook/rf/blob/master/LICENSE)
