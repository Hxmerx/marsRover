const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

describe("rover constructor", function () {
  it("constructor sets postion and default values for mode and generatorWatts", function () {
    // this variable represents an instance of the Rover class
    let rover = new Rover(100);
    expect(rover.position).toEqual(100);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
  });
});

describe("rover recieved message", function () {
  it("has response containg name of message", function () {
    let jerryRover = new Rover(4356);
    let monoSG = new Message("name of message 2", []);
    let actualResponse = jerryRover.recieveMessage(monoSG);
    let expectedResponse = { message: "name of message 2" };

    expect(actualResponse.message).toEqual(expectedResponse.message);
  });
  it("returns two results if two commands are sent in the message", function () {
    let jennyRover = new Rover(0);
    let testNineMsg = new Message("test nine", [
      new Command("MOVE", 150),
      new Command("STATUS_CHECK"),
    ]);
    let actualResponse = jennyRover.recieveMessage(testNineMsg);

    expect(actualResponse.results.length).toEqual(testNineMsg.commands.length);
  });
  it("returns three results if three commands are sent in the message", function () {
    let jennyRover = new Rover(0);
    let testNineMsg = new Message("test nine", [
      new Command("MOVE", 150),
      new Command("STATUS_CHECK"),
      new Command("MODE_CHANGE", "NORMAL"),
    ]);
    let actualResponse = jennyRover.recieveMessage(testNineMsg);

    expect(actualResponse.results.length).toEqual(testNineMsg.commands.length);
  });
  it("responds correctly status check command", function () {
    let javierRover = new Rover(0);
    let testTenMsg = new Message("test ten", [new Command("STATUS_CHECK")]);
    let actualResponse = javierRover.recieveMessage(testTenMsg);
    let expectedStatusCheck = {
      completed: true,
      roverStatus: {
        mode: "NORMAL",
        generatorWatts: 110,
        position: 0,
      },
    };
    expect(actualResponse.results[0]).toEqual(expectedStatusCheck);
  });

  it("responds correctly status check command", function () {
    let jimmyRover = new Rover(1500);
    jimmyRover.generatorWatts = 20;
    jimmyRover.mode = "LOW_POWER";
    let testTenMsg = new Message("test ten", [new Command("STATUS_CHECK")]);
    let actualResponse = jimmyRover.recieveMessage(testTenMsg);
    let expectedStatusCheck = {
      completed: true,
      roverStatus: {
        mode: "LOW_POWER",
        generatorWatts: 20,
        position: 1500,
      },
    };
    expect(actualResponse.results[0]).toEqual(expectedStatusCheck);
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function () {
    let javierRover = new Rover(0);
    javierRover.mode = "LOW_POWER";
    let testTwelveMsg = new Message("test twelve", [new Command("MOVE", 146)]);
    let actualResponse = javierRover.recieveMessage(testTwelveMsg);
    let expectedMoveResult = {
      completed: false,
    };
    expect(actualResponse.results[0]).toEqual(expectedMoveResult);
    expect(javierRover.position).toEqual(0);
  });

  it("responds with a position for move command", function () {
    let joseph = new Rover(0);
    let testThirteenMsg = new Message("test twelve", [
      new Command("MOVE", 146),
    ]);
    let actualResponse = joseph.recieveMessage(testThirteenMsg);
    let expectedMoveResult = {
      completed: true,
    };
    expect(actualResponse.results[0]).toEqual(expectedMoveResult);
    expect(joseph.position).toEqual(146);
  });
});
