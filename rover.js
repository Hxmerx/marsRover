class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }
  recieveMessage(msg) {
    let res = [];
    for (let cmd of msg.commands) {
      if (cmd.commandType === "MODE_CHANGE") {
        res.push({
          completed: true,
        });
        this.mode = cmd.value;
      } else if (cmd.commandType === "MOVE") {
        if (this.mode === "NORMAL") {
          this.position = cmd.value;
          res.push({ completed: true });
        } else
          res.push({
            completed: false,
          });
      } else {
        res.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      }
    }
    return {
      message: msg.name,
      results: res,
    };
  }
}
module.exports = Rover;
