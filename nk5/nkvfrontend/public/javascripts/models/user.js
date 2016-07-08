define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    var Task = Backbone.Model.extend({
      errors: {},
      urlRoot: 'user',
      noIoBind: false,
      initialize: function() {
          this.ioBind('delete', this.serverDelete, this);
		  
		  _.bindAll(this, 'serverDelete');
      },
      
      serverDelete: function(task) {
        if (this.collection) {
          this.collection.remove(this);
        } else {
          this.trigger('remove', this);
        }
        this.modelCleanup();
      },
          
      modelCleanup: function () {
        this.ioUnbindAll();
        return this;
      },
      
      getDate: function(property) {
       var date1 = this.get(property);

        if (isNaN(Date.parse(date1))) {
          return undefined;
        }
        date = new Date(date1);
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strMinutes = date.getMinutes();
          if (strMinutes >= 1 && strMinutes <= 9) {
              strMinutes = "0" + strMinutes;
          }
          return date.getFullYear() + seperator1 + month + seperator1 + date.getDate()
                  + " " + date.getHours() + seperator2 + strMinutes + seperator2 + date.getSeconds();
      },
      
      timeOptions: function() {
        var timeOptions = '';
        for (var ampm=0; ampm < 2; ampm++) {
          var ampmString = ampm ? 'PM':'AM';
          for (var hours=0; hours < 12; hours++) {
            for (var minutes=0; minutes < 60; minutes = minutes+1) {
              var hoursString = hours < 10 ? '0'+hours : hours;
              var minutesString = minutes < 10 ? '0'+minutes : minutes;
              if (ampm===1 && hours===0){hoursString = '12';}
              timeOptions += '<option value="'+(hours+(ampm*12))+':'+minutes+'">'+hoursString+':'+minutesString+' '+ampmString+'</option>';
            }
          }
        }
        return timeOptions;
      },
       toggleSelected: function(bool) {
          if (typeof bool === 'undefined'){
            this.isSelected = !this.isSelected;
          }else{
            this.isSelected = bool;
          }
          //this.trigger('toggleSelected', this.isSelected);
          return this.isSelected;
        },
      dayOptions: function() {
        var dayOptions = '';
        for (var day = 1; day <= 31; day++) {
          dayOptions += '<option value="'+day+'">'+day+'</options>';
        }
        return dayOptions;
      }
    });
    return Task;
});