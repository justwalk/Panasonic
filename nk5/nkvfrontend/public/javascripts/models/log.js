define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
    var Log = Backbone.Model.extend({
      errors: {},
      defaults:{
        execute: 'now',
        cycle: 'once',
        weekdays:'',
        month_days:'',
        time: '0:00',
        date: (new Date()).getDate()+'/'+((new Date()).getMonth()+1)+'/'+(new Date()).getFullYear(),
        update_type: 'Indirect',
        update_mode: 'Undo'
      },
      urlRoot: 'log',
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
          var datestr=date.getDate();
          var hours=date.getHours();
          var seconds=date.getSeconds();
          // if (month >= 1 && month <= 9) {
          //     month = "0" + month;
          // }
          if (datestr >= 1 && datestr <= 9) {
              datestr = "0" + datestr;
          }
          if (hours >= 0 && hours <= 9) {
              hours = "0" + hours;
          }
          if (seconds >= 0 && seconds <= 9) {
              seconds = "0" + seconds;
          }
          if (strMinutes >= 0 && strMinutes <= 9) {
              strMinutes = "0" + strMinutes;
          }
          return date.getFullYear() + seperator1 + month + seperator1 +datestr
                  + " " + hours + seperator2 + strMinutes + seperator2 + seconds;
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
      
      dayOptions: function() {
        var dayOptions = '';
        for (var day = 1; day <= 31; day++) {
          dayOptions += '<option value="'+day+'">'+day+'</options>';
        }
        return dayOptions;
      }
    });
    return Log;
});
