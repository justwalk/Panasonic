define([
  'jquery',
  'underscore',
  'backbone',
  'models/message',
  'views/main_menu/main_menu',
  'views/modals/error_prompt',
  'views/modals/pass_prompt',
  'views/modals/message_modal',
  'routers/servers_router',
  'routers/clients_router',
  'routers/storages_router',
  'routers/schedules_router',
  'routers/logs_router',
  'routers/home_router',
  'routers/users_router',
  'routers/variousSetting_router',
  'bootstrap',
  'underi18n',
  'iobind',
  'iosync',
  'helpers/helper',
], function($, _, Backbone, Message,  MainMenu, ErrorPrompt, PassPrompt, MessageModal, ServerRouter, ClientRouter, StorageRouter, ScheduleRouter, LogRouter, HomeRouter,UsersRouter, VariousSettingRouter){
  locale =  require('translations_' + ((localStorage && localStorage.getItem('locale')) || 'en'));
    App = {
        vent: _.extend({}, Backbone.Events),
        
        start: function(){
          App.pass = '';
          App.locale = localStorage.getItem('locale');
          var errorPrompt = new ErrorPrompt();
          App.vent.on('error', function (error, data){
            
            var parsedError = $.parseJSON(error);
            console.log(parsedError);
            parsedError.error.replace(' <%_failed due to%>', ':');
            parsedError.error.replace('<%_', '');
            parsedError.error.replace('%>', '');
            
            var translatedError = App.msgFactory(parsedError.error);
            var translatedParameter = '';
            if (!_.isUndefined(parsedError.parameter)) {
              translatedParameter = App.msgFactory(parsedError.parameter);
            }

            if ( typeof $('.submit') != 'undefined' ) {
              var buttonName = $('.submit').first().attr('alt');
              $('.submit').first().removeAttr('disabled').val(buttonName);
            }

            if (error == '"Invalid password"') {
              Backbone.history.stop();
              passPrompt.show();
              errorPrompt.render(translatedError, translatedParameter).$el.modal('show');
              } else {
                errorPrompt.render(translatedError, translatedParameter).$el.modal('show');
              }
          });
          
          var passPrompt = new PassPrompt();
          $('body').append(passPrompt.render().el);
         

          var mainMenu = new MainMenu();
          $('header').html(mainMenu.render().el);

          App.vent.on('change:locale', function(e) {
            localStorage.setItem('locale', App.locale);
            requirejs.undef('locale');
            requirejs.config({paths: {
              'locale': '/translations_' + App.locale
            }
            });
            require(['locale'], function(locale) {
              msgFactory = App.msgFactory = underi18n.MessageFactory(locale);
              mainMenu.reloadTemplate().render();
            });
            document.location.reload();

          });
          App.vent.on('change:pass', function() {


            var message = new Message();
            var messageModal = new MessageModal(message);
            message.on('change:msg', function() {
              messageModal.render();
            });

            if(App.menu['5']){
              App.clientRouter = new ClientRouter();
              App.clientRouter.bind('all', function(route) {
                mainMenu.highlight('clients');
              });
		        }
            if(App.menu['3']){
              App.serverRouter = new ServerRouter();
              App.serverRouter.bind('all', function(route) {
                 mainMenu.highlight('servers');
              });
		        }
           if(App.menu['4']){
              var storageRouter = new StorageRouter();
              storageRouter.bind('all', function(route) {
                mainMenu.highlight('storages');
              });
            }
            if(App.menu['6']){
              var scheduleRouter = new ScheduleRouter();
              scheduleRouter.bind('all', function(route) {
                mainMenu.highlight('schedule');
              });
            }
          if(App.menu['7']){
              var logRouter = new LogRouter();
              logRouter.bind('all', function(route) {
                mainMenu.highlight('logs');
              });
          }
           if(App.menu['2']){
                var homeRouter = new HomeRouter();
                 homeRouter.bind('all', function(route) {
                  mainMenu.highlight('home');
                });
            }
          if(App.menu['8']){
            var userRouter = new UsersRouter();
             userRouter.bind('all', function(route) {
              mainMenu.highlight('users');
            });
           }
            if(App.menu['21']){
              var variousSettingRouter = new VariousSettingRouter();
              variousSettingRouter.bind('all', function(route) {
                mainMenu.highlight('various_setting');
              });
            }
            
            Backbone.history.start();
          });
        },
        menu:{}
    };
    return App;
});
