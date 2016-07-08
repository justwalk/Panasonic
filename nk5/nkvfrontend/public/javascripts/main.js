require.config({
  //enforceDefine: true,
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
    rsvp:       'vendor/rsvp-latest.amd',

    translations_en: 'translations_en',
    translations_ja: 'translations_ja',
    msgFactory: 'msgFactory',


    
    templates: 'templates/',
    datatable: 'vendor/datatable/jquery.Datatable',
    zeroClipboard: 'vendor/datatable/ZeroClipboard',
    tableTools: 'vendor/datatable/TableTools',
    columnFilter: 'vendor/datatable/jquery.dataTables.columnFilter',
    iobind: 'vendor/iobind/backbone.iosync',
    iosync: 'vendor/iobind/backbone.iobind',
    modelBinder:'vendor/modelbinder/Backbone.ModelBinder',
    collectionBinder:'vendor/modelbinder/Backbone.CollectionBinder',
    bootstrapDatatables: '/stylesheets/vendor/bootstrap/js/bootstrap-datatables',
  },
  
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      //These script dependencies should be loaded before loading
      //backbone.js
      deps: ['underscore', 'jquery'],
      //Once loaded, use the global 'Backbone' as the
      //module value.
      exports: 'Backbone'
    },
    'socketio':{
      exports: 'io'
    },
    'jqueryUI'   :['jquery'],
    'bootstrap'  :['jquery'],
    'iobind'     :['underscore', 'backbone'],
    'touchPunch' :['jquery', 'jqueryUI'],
    'iosync'     :['underscore', 'backbone'],
    'zeroClipboard': ['jquery', 'jqueryUI'],
    'tableTools' :[ 'zeroClipboard'],
    'columnFilter': ['jquery', 'jqueryUI'],
    'bootstrapDatatables' :['jquery', 'datatable', 'tableTools', 'columnFilter', 'bootstrap']
  }
});
define([
  'jquery',
  'underscore',
  'backbone',
  'nk5',
  'domReady',
], function($, _, Backbone, App, domReady){

  domReady(function () {
    
    window.msgFactory = App.msgFactory = underi18n.MessageFactory(locale);
    
    //This function is called once the DOM is ready.
    //It will be safe to query the DOM and manipulate
    //DOM nodes in this function.
    window.socket = io.connect();
    
    window.socket.old$Emit = window.socket.$emit;
    window.socket.$emit = function (name) {

    var args = _.toArray(arguments);
    window.socket.old$Emit.apply(socket, ['*'].concat(args));
    window.socket.old$Emit.apply(socket, args);
  };

    window.socket.oldEmit = window.socket.emit;

    window.socket.emit = function() {
      var args = _.toArray(arguments);

      var oldCallBack = args[2];

      if (!_.isArray(args[1])) {
        _.defaults(args[1], {
          user_$: App.user || 'none',
          password_$: App.pass || 'none'
        });
      } else {
        args[1] = {
          data: args[1],
          user_$: App.user || 'none',
          password_$: App.pass || 'none'
        };
      }
      var override = function(err, data) {
        if (err) {
          App.vent.trigger('error', JSON.stringify(err), data);
        }
        oldCallBack.apply(this, arguments);
      };

      if (_.isFunction(args[2])) {
        args[2] = override;
      }

      window.socket.oldEmit.apply(socket, args);
    };

    socket.on('*', function(ev, data) {
    });
    
    App.start();
  });
});