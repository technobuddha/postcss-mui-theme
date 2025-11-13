import { type Theme } from '@mui/material/styles';
import { get } from '@technobuddha/library';
import type * as postcss from 'postcss';
import reduceFunctionCall from 'reduce-function-call';

/**
 * Configuration options for the PostCSS MUI Theme plugin.
 *
 * @group Configuration
 * @category Types
 */
type Options = {
  /** The MUI theme object to use for resolving theme values */
  theme: Theme;
};

/**
 * PostCSS plugin that transforms MUI theme function calls into actual CSS values.
 *
 * This plugin processes CSS declarations and replaces custom function calls with their
 * corresponding values from the MUI theme:
 * - `mui-theme()`: Resolves theme paths (e.g., `mui-theme(palette-primary-main)` becomes the primary color)
 * - `mui-spacing()`: Converts spacing values (e.g., `mui-spacing(2)` becomes the theme's spacing calculation)
 * - `contrastText()`: Gets the contrast text color for a given background color
 *
 * @param options - Configuration options containing the MUI theme
 * @returns A PostCSS plugin instance
 *
 * @example
 * ```typescript
 * import { createTheme } from '@mui/material/styles';
 * import postcss from 'postcss';
 * import muiThemePlugin from 'postcss-mui-theme';
 *
 * const theme = createTheme();
 * const result = await postcss([muiThemePlugin({ theme })]).process(css);
 * ```
 *
 * @example
 * ```css
 * // Input CSS
 * .button {
 *   background-color: mui-theme(palette-primary-main);
 *   padding: mui-spacing(2);
 *   color: contrastText(#ff0000);
 * }
 *
 * // Output CSS
 * .button {
 *   background-color: #1976d2;
 *   padding: 16px;
 *   color: #fff;
 * }
 * ```
 *
 * @group Postcss
 * @category Plugin
 */
export const plugin = ({ theme }: Options): postcss.AcceptedPlugin => ({
  postcssPlugin: 'postcss-mui-theme',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Once(root) {
    root.walkDecls((decl) => {
      for (;;) {
        const idxTheme = decl.value.indexOf('mui-theme(');
        const idxSpace = decl.value.indexOf('mui-spacing(');

        if (idxTheme === -1 && idxSpace === -1) {
          break;
        }

        if (idxTheme !== -1) {
          decl.value = reduceFunctionCall(
            decl.value,
            'mui-theme',
            (body) => get(theme, body.replaceAll('-', '.')) as string,
          );
        }

        if (idxSpace !== -1) {
          decl.value = reduceFunctionCall(decl.value, 'mui-spacing', (body) =>
            theme.spacing(Number.parseFloat(body)),
          );
        }
      }

      for (;;) {
        const idxContrast = decl.value.indexOf('contrastText(');

        if (idxContrast === -1) {
          break;
        }

        decl.value = reduceFunctionCall(decl.value, 'contrastText', (body) =>
          theme.palette.getContrastText(body),
        );
      }
    });
  },
});
plugin.postcss = true;

export default plugin;
