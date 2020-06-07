const postcss               = require('postcss');
const reduceFunctionCall    = require('reduce-function-call');
const get                   = require('lodash/get')

module.exports = postcss.plugin(
    'postcss-mui-theme',
    opts => {
        opts        = opts || {};
        const theme = opts.theme || {};

        return css => {
            css.walkDecls(
                decl => {
                    if(decl.value) {
                        if(decl.value.indexOf('mui-theme(') !== -1) {
                            decl.value = reduceFunctionCall(
                                decl.value,
                                'mui-theme',
                                body => get(theme, body.replace(/-/g, '.'))
                            );
                        } else if (decl.value.indexOf('mui-spacing(') !== -1) {
                            decl.value = reduceFunctionCall(
                                decl.value,
                                'mui-spacing',
                                body => `${theme.spacing(Number.parseFloat(body))}px`
                            )
                        }
                    }
                }
            );
        }
    }
);