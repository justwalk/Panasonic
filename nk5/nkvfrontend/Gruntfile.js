module.exports = function (grunt) {
grunt.initConfig({

  requirejs: {
    compile: {
      options: {
        baseUrl: "public/javascripts",
        paths: {
            jquery:     'vendor/jquery/jquery-1.7.2.min',
            jqueryUI:   'vendor/jquery/jquery-ui-1.8.21.custom.min',
            touchPunch: 'vendor/jquery/jquery.ui.touch-punch.min',

            bootstrap:  'vendor/bootstrap/bootstrap',
            underscore: 'vendor/underscore/underscore.min',
            backbone:   'vendor/backbone/backbone',
            text:       'vendor/require/text',
            domReady:   'vendor/require/domReady',
            underi18n:  'vendor/underi18n.js/underi18n',

            translations_en: 'translations_en',
            translations_ja: 'translations_ja',
            msgFactory: 'msgFactory',

            
            templates: 'templates/',
            datatable: 'vendor/datatable/jquery.Datatable',
            colreorder: 'vendor/datatable/datatable-colreorder',
            zeroClipboard: 'vendor/datatable/ZeroClipboard',
            tableTools: 'vendor/datatable/TableTools',
            columnFilter: 'vendor/datatable/jquery.dataTables.columnFilter',
            iobind: 'vendor/iobind/backbone.iosync',
            iosync: 'vendor/iobind/backbone.iobind',
            modelBinder:'vendor/modelbinder/Backbone.ModelBinder',
            collectionBinder:'vendor/modelbinder/Backbone.CollectionBinder',
            bootstrapDatatables: '../stylesheets/vendor/bootstrap/js/bootstrap-datatables',
          },
        mainConfigFile: "build.js",
        out: "public/main-built.js",
        name: "vendor/require/almond",
        include: ["main", 'translations_ja', 'translations_en'],
        insertRequire: ["main"],
        wrap: true
      }
    }
  }
});
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.registerTask('build', 'requirejs');

};
