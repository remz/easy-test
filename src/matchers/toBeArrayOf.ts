import CustomMatcherResult = jest.CustomMatcherResult;
import { Constructor } from '../utils/Types';
import { match } from './Match';

export const toBeArrayOf = <T>(items: unknown, ctor: Constructor<T>): CustomMatcherResult =>
  match<[]>(items as [])
    .undefined(it => it, 'Subject is undefined.')
    .not(it => it instanceof Array, 'Subject is not an array.')
    .not(it => (it as []).every((i: any) => i instanceof ctor), `Not all elements are of type '${ctor.name}'.`)
    .else(`All elements in array are of type '${ctor.name}'`);

expect.extend({
  toBeArrayOf,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T> {
      toBeArrayOf<Z>(ctor: Constructor<Z>): R;
    }
  }
}
