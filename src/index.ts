import * as postcss from 'postcss';
import reduceFunctionCall from 'reduce-function-call';
import { get } from 'lodash-es';
import { type Theme } from '@mui/material/styles';

type Options = {
  theme: Theme;
};

export const plugin = ({ theme }: Options): postcss.AcceptedPlugin => {
  return {
    postcssPlugin: 'postcss-mui-theme',
    Once(root) {
      root.walkDecls((decl) => {
        if (decl.value) {
          for (;;) {
            const idxTheme = decl.value.indexOf('mui-theme(');
            const idxSpace = decl.value.indexOf('mui-spacing(');

            if (idxTheme === -1 && idxSpace === -1) break;

            if (idxTheme !== -1) {
              decl.value = reduceFunctionCall(decl.value, 'mui-theme', (body) =>
                get(theme, body.replace(/-/gu, '.')),
              );
            }

            if (idxSpace !== -1) {
              decl.value = reduceFunctionCall(
                decl.value,
                'mui-spacing',
                (body) => `${theme.spacing(Number.parseFloat(body))}`,
              );
            }
          }

          for (;;) {
            const idxContrast = decl.value.indexOf('contrastText(');

            if (idxContrast === -1) break;

            decl.value = reduceFunctionCall(
              decl.value,
              'contrastText',
              (body) => `${theme.palette.getContrastText(body)}`,
            );
          }
        }
      });
    },
  };
};

plugin.postcss = true;

export default plugin;
