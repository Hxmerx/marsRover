const Command = require("../command.js");
const Message = require("../message.js");

describe("message class", function () {
  it("throws an error if name is not passed", function () {
    expect(function () {
      new Message();
    }).toThrow(new Error("Name is required."));
  });
  it("sets the name ", function () {
    let msg = new Message("test");
    expect(msg.name).toEqual("test");
  });
  it("contains a commands array passed into the constuctor as 2nd argument", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let message = new Message("Test message with two commands", commands);
    expect(message.commands).toEqual(commands);
  });
});
