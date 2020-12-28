const reduceFunctionCall    = require('reduce-function-call');
const get                   = require('lodash/get');

module.exports = (opts = {}) => {
    const theme = opts.theme || {};

    return {
        postcssPlugin: 'postcss-mui-theme',
        Once (root, { result }) {
            root.walkDecls(
                decl => {
                    if(decl.value) {
                        for(;;)
                        {
                            const idxTheme = decl.value.indexOf('mui-theme(');
                            const idxSpace = decl.value.indexOf('mui-spacing(');

                            if(idxTheme === -1 && idxSpace === -1)
                                break;

                            if(idxTheme !== -1) {
                                decl.value = reduceFunctionCall(
                                    decl.value,
                                    'mui-theme',
                                    body => get(theme, body.replace(/-/g, '.'))
                                );
                            }

                            if(idxSpace !== -1) {
                                decl.value = reduceFunctionCall(
                                    decl.value,
                                    'mui-spacing',
                                    body => `${theme.spacing(Number.parseFloat(body))}px`
                                )
                            }
                        }
                    }
                }
            );
        }
    }
}

module.exports.postcss = true;
