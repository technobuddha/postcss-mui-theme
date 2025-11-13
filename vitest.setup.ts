// cspell:ignore jematchers, jbdct

import jematchers from 'jest-extended';
import jbdct from 'jest-matcher-deep-close-to';
import { expect } from 'vitest';

expect.extend(jematchers);
expect.extend(jbdct);
