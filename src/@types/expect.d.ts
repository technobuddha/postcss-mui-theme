// 🚨
// 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
// 🚨
import { type JestExtended, type JestMatcherDeepCloseTo } from '@technobuddha/project';

declare module 'vitest' {
  interface Assertion<T = unknown> extends JestExtended<T>, JestMatcherDeepCloseTo<T> {
    /**/
  }
  interface AsymmetricMatchersContaining<T = unknown>
    extends JestExtended<T>, JestMatcherDeepCloseTo<T> {}
  interface ExpectStatic extends JestExtended, JestMatcherDeepCloseTo {}
}
