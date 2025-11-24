function prepareGame(randomFn = Math.random) {
  const doors = new Map([
    [1, false],
    [2, false],
    [3, false],
  ]);
  const winningDoor = Math.floor(randomFn() * 3) + 1;
  doors.set(winningDoor, true);
  return { doors, winningDoor };
}

function playerChooses(randomFn = Math.random) {
  return Math.floor(randomFn() * 3) + 1;
}

function pickLosingDoor(
  doors: Map<number, boolean>,
  winning: number,
  guess: number
) {
  return [...doors.keys()].find((d) => d !== winning && d !== guess)!;
}

function pickOtherDoor(
  doors: Map<number, boolean>,
  losing: number,
  guess: number
) {
  return [...doors.keys()].find((d) => d !== losing && d !== guess)!;
}

export function simulateOneGame(randomFn = Math.random) {
  const { doors, winningDoor } = prepareGame(randomFn);
  const guess = playerChooses(randomFn);
  const losing = pickLosingDoor(doors, winningDoor, guess);
  const other = pickOtherDoor(doors, losing, guess);

  const winStick = doors.get(guess) === true;
  const winSwitch = doors.get(other) === true;

  return { winStick, winSwitch };
}

export function simulateManyGames(times: number, randomFn = Math.random) {
  if (times < 0) throw new Error("cannot play a negative number of times");

  let wonSticking = 0;
  let wonChanging = 0;

  for (let i = 0; i < times; i++) {
    const result = simulateOneGame(randomFn);
    if (result.winStick) wonSticking++;
    if (result.winSwitch) wonChanging++;
  }

  return { wonSticking, wonChanging };
}

export function play(times: number) {
  const { wonSticking, wonChanging } = simulateManyGames(times);

  console.log(`played ${times} times`);
  console.log(`won ${wonSticking} times by sticking to the initial choice`);
  console.log(`won ${wonChanging} times by changing the initial choice`);

  const f = Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
  console.log(
    `sticking wins ${f.format((wonSticking / times) * 100)}% of games`
  );
  console.log(
    `changing wins ${f.format((wonChanging / times) * 100)}% of games`
  );
}
