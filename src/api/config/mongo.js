module.exports = {
  production: {
    port: 27017,
    host:'127.0.0.1',
    db:'momsbloom'
  },
  test: {
    port: 27017,
    host: '127.0.0.1',
    db:'momsbloomtest'
  },
  get: function(key) {
    var dict = this[process.env.NODE_ENV] || this.production;
    return dict[key];
  }
};
