const postcss               = require('postcss');
const reduceFunctionCall    = require('reduce-function-call');
const get                   = require('lodash/get')

module.exports = (opts = {}) => {
    //checkOpts(opts);
    const theme = opts.theme || {};
    
    return {
        postcssPlugin: 'postcss-mui-theme',
        Once (root, { result }) {
            root.walkAtRules(
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
};

module.exports.postcss = true;
