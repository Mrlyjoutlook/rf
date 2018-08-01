# rf-scripts

> rewired react-scripts config

Create React App为开发者提供一套不错的配置，上手即用，并且提供了'eject'功能，可以自定义配置。
但当Create React App变化或者升级时，特别是它使用的react-scripts包变化时，可能会导致我们的配置出现不兼容的bug。
故Create React App的作者们也是强调若非必要请不要这么做！（即使用'eject'功能）可实际开发情况，我们都需要进行定制化配置修改。

Create React App的重点在于react-scripts包，其提供链接webpack配置功能，来助开发者们进行开发，打包，测试。rf-scripts是基于react-scripts包上再做一层封装，提供一些方便的功能。使用rewire模块来创建补丁，即运行时动态修改webpack配置的变量，使得我们可以对webpack进行定制。

## use guide

### install

```shell
$ yarn add rf-script --dev
# or
$ npm install rf-script --save-dev
```

create **.rf.js** file in your root dir.

**eg**

### config file

|
|--||

## change log

## LICENSE

[MIT](https://github.com/Mrlyjoutlook/rf/blob/master/LICENSE)
