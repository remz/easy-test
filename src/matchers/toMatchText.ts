import CustomMatcherResult = jest.CustomMatcherResult;
import { match } from './Match';

export const toMatchText = (value?: unknown, text?: unknown): CustomMatcherResult =>
  match<unknown>(value)
    .undefined(v => v, 'Subject is undefined.')
    .undefined(() => text, 'Text to match with is undefined.')
    .not(
      v => v.toString() === text.toString(),
      v => `Text '${v}' does not match with text '${text}'.`
    )
    .else(v => `Text '${v}' matches`);

expect.extend({
  toMatchText: toMatchText,
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R, T> {
      toMatchText(text?: unknown): R;
    }
  }
}
