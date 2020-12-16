import { toBeArrayOfWithLength } from '../../src';

class Dev {}

class Manager {}

const devs = [new Dev(), new Dev(), new Dev()];
const mixed = [new Dev(), new Manager()];

describe('toBeValid', () => {
  test('fails', () => {
    expect(toBeArrayOfWithLength(undefined, Manager, 1)).toFailWith('Subject is undefined.');
    expect(toBeArrayOfWithLength(new Manager(), Manager, 1)).toFailWith('Subject is not an array.');
    expect(toBeArrayOfWithLength(devs, Dev, 1)).toFailWith('Subject does not have 1 elements, but 3.');
    expect(toBeArrayOfWithLength(devs, Manager, devs.length)).toFailWith("Not all elements are of type 'Manager'.");
    expect(toBeArrayOfWithLength(mixed, Manager, mixed.length)).toFailWith("Not all elements are of type 'Manager'.");
  });

  test('passes', () => {
    expect(toBeArrayOfWithLength(devs, Dev, devs.length)).toPassWith("Subject has 3 elements, which are all of type 'Dev', which we did not expect.");
  });
});
