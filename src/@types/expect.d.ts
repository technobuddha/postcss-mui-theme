import type JestExtended from 'jest-extended';
import type JestMatcherDeepCloseTo from 'jest-matcher-deep-close-to';

declare module 'vitest' {
  interface Assertion<T = unknown> extends JestExtended<T>, JestMatcherDeepCloseTo<T> {
    /**/
  }
  interface AsymmetricMatchersContaining<T = unknown>
    extends JestExtended<T>,
      JestMatcherDeepCloseTo<T> {}
  interface ExpectStatic extends JestExtended, JestMatcherDeepCloseTo {}
}
