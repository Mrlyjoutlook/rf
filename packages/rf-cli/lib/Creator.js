const EventEmitter = require("events").EventEmitter;
const execa = require("execa");
const chalk = require("chalk");
const prompts = require("prompts");
const LoadPrompt = require("./LoadPrompt");
const clearConsole = require("./utils/clearConsole");
const Queue = require("./utils/queue");

module.exports = class Creator extends EventEmitter {
  constructor(name, context, promptModules) {
    super();
    this.name = name;
    this.context = context;
    this.injectedPrompts = []; // 选项添加功能
    this.featurePrompt = []; // 直接添加功能
    this.promptCompleteCbs = []; // 编译回调函数
    this.promptFunCbs = []; // 开发功能
    const prompts = new LoadPrompt(this);
    promptModules.forEach(m => m(prompts));
  }

  async create() {
    await this.prompt();
  }

  async prompt() {
    await clearConsole();
    const promptQueue = new Queue(this.injectedPrompts);
    for (let i = 0; i <= promptQueue.size(); i++) {
      const p = promptQueue.shift();
      const result = await prompts(p.prompt);
      switch (p.type) {
        case "plan":
          console.log(chalk.green(result.value));
          break;
        case "complete":
          console.log("b");
          break;
        default:
          console.log("no");
          break;
      }
    }
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }
};
