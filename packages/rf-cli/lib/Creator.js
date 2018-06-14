const EventEmitter = require("events").EventEmitter;
const execa = require("execa");
// const chalk = require("chalk");
const prompts = require("prompts");
const LoadPrompt = require("./LoadPrompt");
const fetchRemoteTemplate = require("./fetchRemoteTemplate");
const clearConsole = require("./utils/clearConsole");
const Queue = require("./utils/queue");

module.exports = class Creator extends EventEmitter {
  constructor(name, context, promptModules) {
    super();
    this.name = name;
    this.context = context;
    this.featurePrompt = []; // 特性功能
    this.injectedPrompts = []; // 添加功能
    this.promptCompleteCbs = []; // 编译回调函数
    this.promptFunCbs = []; // 开发功能
    const prompts = new LoadPrompt(this);
    promptModules.forEach(m => m(prompts));
  }

  async create() {
    const answers = await this.prompt();
    console.log(answers);
    // let preset;
    this.generatorTemplate(answers.base);
  }

  // 提示选项
  async prompt() {
    await clearConsole();
    const promptQueue = new Queue(this.injectedPrompts);
    const answers = {
      base: {},
      complete: [],
      features: []
    };
    for (let i = 0; i <= promptQueue.size(); i++) {
      const p = promptQueue.shift();
      const result = await prompts(p.prompt);
      if (p.type === "complete") {
        Array.isArray(result.value)
          ? answers.complete.push(...result.value)
          : answers.complete.push(result.value);
      } else if (p.type === "features") {
        answers.features.push(result.value);
      } else {
        answers.base[p.type] = result.value;
      }
    }
    this.promptCompleteCbs.forEach(cb => cb(answers));
    return answers;
  }

  // 获取远程版本
  async generatorTemplate() {
    const bool = await fetchRemoteTemplate();
    if (bool) {
      console.log(bool);
      this.run("npm install rf-template@lastest --peer");
    }
  }

  // 运行命令
  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }
};
