module.exports = function(grunt) {
  // for livereload
  var path = require('path');
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };

  grunt.initConfig({
    // for livereload
    connect: {
      livereload: {//{{{
        options: {
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }//}}}
    },
    // 监控文件变化, 然后 打包/刷新浏览器
    regarde: {
      assets: {//{{{
        files: ['html/index.html', 'assets/teeter/*'],
        tasks: ['livereload']
      }//}}}
    }
  });

  //{{{
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');//}}}

  // livereload, 监控文件修改, 然后刷新浏览器
  grunt.registerTask('default', ['livereload-start', 'connect', 'regarde']);
};

// vim: set fdm=marker:

