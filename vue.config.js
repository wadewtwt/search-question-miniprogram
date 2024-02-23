const path = require('path');
 
function resolve (dir) {
  return path.join(__dirname, dir)
}
 
module.exports = {
  chainWebpack: (config) => {   
    config.resolve.alias
    .set('$css',resolve('/static/css'))
    .set('$common',resolve('/components'))
    .set('$apis',resolve('/apis'))
    .set('$page',resolve('/pages'))
    .set('$js',resolve('/static/js'))
    .set('$utils',resolve('/utils'));
  }
};