define([
  'jquery',
  'underscore',
  'backbone',
  'views/computers/computer',
  'text!templates/computers/grid_view.html',
  'text!templates/computers/list_view.html',
  'touchPunch',
  'bootstrapDatatables'
], function($, _, Backbone, ComputerView, gridTemplate, listTemplate) {
  ComputersView = Backbone.View.extend({
    template: this.template,

    events: {
      'click': 'clickClose',
      'click .switch-view': 'switchView'
    },

    initialize: function() {
      var self = this;
      _.bindAll(this, 'switchView');
      this.list = false;
      this.clickedComputer = new Backbone.Collection();
      this.collection.bind('reset', function() {
        self.clickedComputer.reset();
      });
      self.selected = self.options.selected;
     this.collection.bind('add reset',function(){
      if(!this.list){
        this.render();
      }else{
        setTimeout(function(){
          self.render();
        },500)
      }
     }, this);
      //this.collection.bind('clicked', this.resetClickedComputer, this);
      this.clickedComputer.bind('reset', function(computers) {
        $('.computer-logo', this.el).removeClass('detailed');
      });
      this.computerViews = [];

      App.vent.on('computers:render', function() {
        self.refreshData();
      });
    },
    clickClose: function() {

      if ($('.computer-logo').attr('no-hide') == 'true') {
        return;
      } else {
        $('.computer-logo', this.model).removeClass('detailed');
      }
    },
    resetClickedComputer: function(computer) {

      if (this.clickedComputer.get(computer.id)) {

        this.clickedComputer.reset([]);
      } else {

        this.clickedComputer.reset([computer]);
      }
    },

    switchView: function(ev) {
      this.list = !this.list;
      //$('a#switch-grid, #switch-list').toggleClass('hidden');
      this.render();

      return this.list;
    },

    setGroupid: function(group_id) {
      this.collection.fetchWithGroupId(group_id);
      if (group_id === 0) {

        this.isAll = false;

      } else {
        this.isAll = false;
      }
      //this.render();
    },
    refreshData: function() {
      var cookieValue = localStorage.getItem('selectCookieGroup');
      this.collection.fetchWithGroupId(cookieValue);
    },
    render: function() {
      var self = this;
      var count = 0;
      self.template = self.list ? _.template(underi18n.template(listTemplate, msgFactory)) : _.template(gridTemplate);

      $(self.el).html(self.template());

      _.forEach(self.computerViews, function(computerView) {
        computerView.close();
      });
      $('.computer-logo').draggable('destroy');
      $('.computer-logo').droppable('destroy');

      self.computerViews = [];
      var isPostion = true;
      if (self.selected) {
        isPostion = false;
      }

      this.collection.each(function(computer) {
        var computerView;
        if (self.isAll === false) {
          computerView = new ComputerView({
            model: computer,
            list: self.list,
            tagName: self.list ? 'tr' : 'div',
            ignoreLock: false
          });
          computerView.isPostion = isPostion;
          $('#computers-container', self.el).append(computerView.render().el);
          self.computerViews.push(computerView);
        } else {
          //判断此对象是否 computer template
          if (computer.get('id') != 1) {
            computerView = new ComputerView({
              model: computer,
              list: self.list,
              ignoreLock: true,
              changedPositionX: count % 11 * 95,
              changedPositionY: Math.floor(count / 11) * 75,
              tagName: self.list ? 'tr' : 'div'
            });
            computerView.isPostion = isPostion;
            $('#computers-container', self.el).append(computerView.render().el);
            self.computerViews.push(computerView);
            count++;
          }

        }
        for (var x in self.selected) {
          if (computer.get('id').toString() === self.selected[x]) {
            computer.toggleSelected(true);
          }
        }

      });

      if (self.list) {
        $('#table-view', self.el).dataTable({
          'sDom': 'R<\'row-fluid table-data-search\'<\'datatable-part pull-left\'l><\'datatable-part pull-right\'f>r> t <\'row-fluid\'<\'datatable-part-medium pull-left\'i><\'datatable-part-medium padding-remove-a pull-right\'p>>',
          'sPaginationType': 'bootstrap',
          'oLanguage': {
            'sUrl': '/dt.' + App.locale + '.js'
          },
          'bDestroy': true
        });
      }
    }
  });
  return ComputersView;
});