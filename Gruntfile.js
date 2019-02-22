module.exports = function (grunt) {
  const releaseTasks = require('datacoral-deploy-utils').releaseTasks;

  grunt.loadNpmTasks('grunt-env');

  var packageName = require('./package.json').name;
  var params = {
    forcePush: grunt.option('FORCE_PUSH'),
    env: grunt.option('DATACORAL_ENV'),
    bucket: grunt.option('DATACORAL_BUCKET'),
    packageScope: 'private',
    packageType: 'lib',
    packageName: packageName,
    packageVersion: require('./package.json').version,
    publisher: 'datacoral',
    buildDir: 'build',
    ext: 'tgz',
    cwdPath: __dirname
  };

  grunt.registerTask('build', 'Building deploy-utils', function () {
    var done = this.async();
    releaseTasks.build(params,
      function (err) {
        if (err) {
          return done(false);
        }
        return done(true);
      });
  });

  grunt.registerTask('push', 'push deploy-utils', function () {
    var done = this.async();
    releaseTasks.push(params,
      function (err) {
        if (err) {
          return done(false);
        }
        return done(true);
      });
  });

  grunt.registerTask('release', 'release deploy-utils', function () {
    var done = this.async();
    releaseTasks.release(params,
      function (err) {
        if (err) {
          return done(false);
        }
        return done(true);
      });
  });

  grunt.registerTask('default', ['build', 'push', 'release']);
};
