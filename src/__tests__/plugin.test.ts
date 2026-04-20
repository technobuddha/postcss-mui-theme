import { createTheme } from '@mui/material/styles';
import postcss from 'postcss';

import { plugin } from '../plugin.ts';

describe('postcss-mui-theme', () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
        dark: '#115293',
        light: '#42a5f5',
      },
      secondary: {
        main: '#dc004e',
        dark: '#9a0036',
        light: '#e33371',
      },
      error: {
        main: '#f44336',
      },
    },
    spacing: 8,
  });

  const processCSS = async (input: string): Promise<string> => {
    const result = await postcss([plugin({ theme })]).process(input, { from: undefined });
    return result.css;
  };

  describe('mui-theme()', () => {
    test('should resolve simple theme path', async () => {
      const input = '.button { background-color: mui-theme(palette-primary-main); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { background-color: #1976d2; }');
    });

    test('should resolve nested theme path', async () => {
      const input = '.button { color: mui-theme(palette-secondary-dark); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { color: #9a0036; }');
    });

    test('should resolve multiple theme calls in one declaration', async () => {
      const input =
        '.button { border: 1px solid mui-theme(palette-primary-main); background: mui-theme(palette-secondary-main); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { border: 1px solid #1976d2; background: #dc004e; }');
    });

    test('should handle multiple theme calls in different declarations', async () => {
      const input = `
        .button {
          background-color: mui-theme(palette-primary-main);
          color: mui-theme(palette-primary-light);
        }
      `;
      const output = await processCSS(input);
      expect(output).toContain('background-color: #1976d2');
      expect(output).toContain('color: #42a5f5');
    });
  });

  describe('mui-spacing()', () => {
    test('should convert spacing value', async () => {
      const input = '.button { padding: mui-spacing(2); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { padding: 16px; }');
    });

    test('should handle spacing with decimal values', async () => {
      const input = '.button { margin: mui-spacing(1.5); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { margin: 12px; }');
    });

    test('should handle multiple spacing calls', async () => {
      const input = '.button { padding: mui-spacing(1) mui-spacing(2); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { padding: 8px 16px; }');
    });

    test('should handle spacing value of 0', async () => {
      const input = '.button { margin: mui-spacing(0); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { margin: 0px; }');
    });
  });

  describe('contrastText()', () => {
    test('should get contrast text for light background', async () => {
      const input = '.button { color: contrastText(#ffffff); }';
      const output = await processCSS(input);
      expect(output).toContain('color:');
      expect(output).toMatch(/rgba?\(/v);
    });

    test('should get contrast text for dark background', async () => {
      const input = '.button { color: contrastText(#000000); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { color: #fff; }');
    });

    test('should handle multiple contrastText calls', async () => {
      const input = '.button { color: contrastText(#ffffff); background: contrastText(#000000); }';
      const output = await processCSS(input);
      expect(output).toContain('color:');
      expect(output).toContain('background:');
    });
  });

  describe('combined functions', () => {
    test('should handle theme and spacing in same declaration', async () => {
      const input =
        '.button { padding: mui-spacing(2); background: mui-theme(palette-primary-main); }';
      const output = await processCSS(input);
      expect(output).toBe('.button { padding: 16px; background: #1976d2; }');
    });

    test('should handle all three function types', async () => {
      const input = `
        .button {
          background: mui-theme(palette-primary-main);
          padding: mui-spacing(2);
          color: contrastText(#1976d2);
        }
      `;
      const output = await processCSS(input);
      expect(output).toContain('background: #1976d2');
      expect(output).toContain('padding: 16px');
      expect(output).toContain('color:');
    });
  });

  describe('edge cases', () => {
    test('should handle empty declarations', async () => {
      const input = '.button { }';
      const output = await processCSS(input);
      expect(output).toBe('.button { }');
    });

    test('should handle declarations without function calls', async () => {
      const input = '.button { color: red; }';
      const output = await processCSS(input);
      expect(output).toBe('.button { color: red; }');
    });

    test('should handle multiple rules', async () => {
      const input = `
        .button { background: mui-theme(palette-primary-main); }
        .link { color: mui-theme(palette-secondary-main); }
      `;
      const output = await processCSS(input);
      expect(output).toContain('background: #1976d2');
      expect(output).toContain('color: #dc004e');
    });
  });

  describe('error handling', () => {
    test('should throw error when mui-theme() has no arguments', async () => {
      const input = '.button { background: mui-theme(); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for mui-theme(), but got 0',
      );
    });

    test('should throw error when mui-theme() has multiple arguments', async () => {
      const input = '.button { background: mui-theme(palette-primary-main, extra); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for mui-theme(), but got 2',
      );
    });

    test('should throw error when mui-spacing() has no arguments', async () => {
      const input = '.button { padding: mui-spacing(); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for mui-spacing(), but got 0',
      );
    });

    test('should throw error when mui-spacing() has multiple arguments', async () => {
      const input = '.button { padding: mui-spacing(2, 3); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for mui-spacing(), but got 2',
      );
    });

    test('should throw error when contrastText() has no arguments', async () => {
      const input = '.button { color: contrastText(); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for contrastText(), but got 0',
      );
    });

    test('should throw error when contrastText() has multiple arguments', async () => {
      const input = '.button { color: contrastText(#ffffff, #000000); }';
      await expect(processCSS(input)).rejects.toThrow(
        'Expected exactly one argument for contrastText(), but got 2',
      );
    });
  });

  describe('plugin metadata', () => {
    test('should have postcss property set to true', () => {
      expect(plugin.postcss).toBeTrue();
    });
  });
});
