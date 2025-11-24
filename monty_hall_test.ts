import { expect } from "jsr:@std/expect";
import { simulateOneGame, simulateManyGames } from "./monty_hall.ts";

Deno.test("test monty hall", () => {
  expect(1 + 1).toBe(2);
});

Deno.test("simulateOne: win by sticking", () => {
  function pickDoor() {
    return 0.0;
  }
  const result = simulateOneGame(pickDoor);
  expect(result.winStick).toBe(true);
  expect(result.winSwitch).toBe(false);
});

Deno.test("simulateOne: win by switching", () => {
  const doorSequence = [0.66, 0.0];
  let index = 0;
  function pickDoor() {
    const value = doorSequence[index];
    index++;
    return value;
  }

  const result = simulateOneGame(pickDoor);
  expect(result.winStick).toBe(false);
  expect(result.winSwitch).toBe(true);
});

Deno.test("simulateMany: counts wins correctly", () => {
  function pickDoor() {
    return 0.0;
  }
  const result = simulateManyGames(5, pickDoor);
  expect(result.wonSticking).toBe(5);
  expect(result.wonChanging).toBe(0);
});

Deno.test("simulateMany: negative times throws", () => {
  expect(() => simulateManyGames(-1)).toThrow();
});

Deno.test("simulateMany: mixed deterministic", () => {
  const doorSequence = [0.0, 0.66, 0.66, 0.0];
  let index = 0;
  function pickDoor() {
    const value = doorSequence[index];
    index++;
    return value;
  }

  const result = simulateManyGames(4, pickDoor);
  expect(result.wonSticking + result.wonChanging).toBe(4);
});
