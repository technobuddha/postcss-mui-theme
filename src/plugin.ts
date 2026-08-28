import { type Theme } from '@mui/material/styles';
import { fillFunctions, get, toString } from '@technobuddha/library';
import type * as postcss from 'postcss';

/**
 * Configuration options for the PostCSS MUI Theme plugin.
 *
 * @group Postcss
 * @category Plugin
 */
export type Options = {
  /** The MUI theme object to use for resolving theme values */
  theme: Theme;
};

/**
 * PostCSS plugin that transforms MUI theme into CSS values.
 *
 * This plugin processes CSS declarations and replaces custom function calls with their
 * corresponding values from the MUI theme:
 * - `mui-theme()`: Resolves theme paths (e.g., `mui-theme(palette-primary-main)` becomes the primary color)
 * - `mui-spacing()`: Converts spacing values (e.g., `mui-spacing(2)` becomes the theme's spacing calculation)
 * - `contrastText()`: Gets the contrast text color for a given background color
 * @param options - Configuration options containing the MUI theme
 * @returns A PostCSS plugin instance
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
      decl.value = fillFunctions(
        decl.value,
        ['mui-theme', 'mui-spacing', 'contrastText'],
        (args, name) => {
          if (args.length !== 1) {
            throw new Error(`Expected exactly one argument for ${name}(), but got ${args.length}`);
          }
          const [body] = args;

          switch (name) {
            case 'mui-theme': {
              return toString(get(theme, body.replaceAll('-', '.')));
            }

            case 'mui-spacing': {
              return theme.spacing(Number(body));
            }

            case 'contrastText': {
              return theme.palette.getContrastText(body);
            }

            // no default
          }
        },
      );
    });
  },
});
plugin.postcss = true;

export default plugin;
