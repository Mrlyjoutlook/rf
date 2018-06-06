const EventEmitter = require("events");
const execa = require("execa");

module.exports = class Creator extends EventEmitter {
  constructor() {
    super();
  }

  async create() {
    await this.prompt();
  }

  async prompt(answers = null) {
    // if (!answers) {
    //   await
    // }
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.context });
  }
};
