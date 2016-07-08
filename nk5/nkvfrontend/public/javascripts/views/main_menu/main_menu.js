define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main_menu/main_menu.html',
  'text!links.txt',
  'msgFactory',
  'views/home/home',
  'collection/various_setting',
  'views/various_setting/various_setting'
], function ($, _, Backbone, menuTemplate, links, msgFactory, HomeView, VariousSettingCollection, VariousSettingView) {
    var MainMenu = Backbone.View.extend({
        tagName: 'nav',
        id: 'top-navbar',
        el: this.el,

        className: 'navbar navbar-fixed-top',

        events: {
            'click a': 'select',
            'click #menu-various_setting': 'openSetting',
            'click #menu-home': 'homeRefresh'
        },
        homeRefresh: function () {
            this.homeView = new HomeView({ router: this });
            $('#content-body').html(this.homeView.el);
            this.homeView.delegateEvents();
        },

        openSetting: function (event) {
            this.variousSettingView.openSettings();
        },

        template: _.template(underi18n.template(menuTemplate, msgFactory)),

        initialize: function () {
            _.bindAll(this, 'render');
            var self = this;
            App.vent.on('change:user', function () {
                self.render();
            });

            var variousSetting = new VariousSettingCollection();
            this.variousSettingView = new VariousSettingView({ collection: variousSetting });
        },

        reloadTemplate: function () {
            this.template = _.template(underi18n.template(menuTemplate, App.msgFactory));
            return this;
        },

        getLinks: function () {

            var strHtml = '';
            var elms = links.split('\n');
            /*
            if(elms.length == 4)
            return '<li><a class="menu-logs" target="_blank" href="' + elms[1] + '">' + elms[0] + '</a></li>' + '<li><a class="menu-logs" target="_blank" href="' + elms[3] + '">' + elms[2] + '</a></li>';
            else if(elms.length == 2)
            return '<li><a class="menu-logs" target="_blank" href="' + elms[1] + '">' + elms[0] + '</a></li>'
            else
            App.vent.trigger('error', '<%_Invalid%> links.txt');
            */
            if (elms.length > 0) {
                var j = 1;
                while(elms.length > j) {
                    strHtml = strHtml + '<li><a class="menu-logs" target="_blank" href="' + elms[j] + '">' + elms[j - 1] + '</a></li>';
                    j = j + 2;
                }
                return strHtml;
            }
            else {
                App.vent.trigger('error', '<%_Invalid%> links.txt');
            }
        },

        render: function () {
            $(this.el).html(this.template({ user: App.user, links: this.getLinks() }));

            return this;
        },

        select: function (evt) {
            var url = evt.target.id.replace('menu-', '');
            Backbone.history.navigate(url, true);
            this.highlight(url);

        },

        highlight: function (route) {
            var elem = $('#menu-' + route);
            if (!elem.parent().hasClass('active')) {
                $('li.active').removeClass('active');
                elem.parent().addClass('active');
            }
        }
    });
    return MainMenu;
});
