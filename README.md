# postcss-mui-theme

PostCSS plugin that transforms MUI theme into CSS values.

This plugin processes CSS declarations and replaces custom function calls with their
corresponding values from the MUI theme:

- `mui-theme()`: Resolves theme paths (e.g., `mui-theme(palette-primary-main)` becomes the primary color)
- `mui-spacing()`: Converts spacing values (e.g., `mui-spacing(2)` becomes the theme's spacing calculation)
- `contrastText()`: Gets the contrast text color for a given background color

## Example

```typescript
import { createTheme } from '@mui/material/styles';
import postcss from 'postcss';
import muiThemePlugin from 'postcss-mui-theme';

const theme = createTheme();
const result = await postcss([muiThemePlugin({ theme })]).process(css);
```

## Sample CSS Input and Output

```css
/* Input CSS */
.button {
  background-color: mui-theme(palette-primary-main);
  padding: mui-spacing(2);
  color: contrastText(#ff0000);
}
/* Output CSS */
.button {
  background-color: #1976d2;
  padding: 16px;
  color: #fff;
}
```
