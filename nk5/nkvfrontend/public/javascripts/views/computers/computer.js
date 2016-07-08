define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/computers/grid_item.html',
    'text!templates/computers/list_item.html',
    'views/computers/menu_detail',
    'modelBinder',
    'collection/menus'
], function($, _, Backbone, gridItem, tableItem, MenuDetailView, ModelBinder, MenuCollection) {
    var ComputerView = Backbone.View.extend({
        className: 'computer-logo',
        events: {
            'click div:not(.select)': 'clicked',
            'click .select': 'toggleSelectComputer',
            'dragstop': 'savePosition',
            'click .menu_detail': 'menu_detail',
            'click button': 'saveMenu',
            'change #default_menu': 'selectPack'
        },

        saveMenu: function() {
            var ja = underi18n.MessageFactory(locale);
            this.model.save(this.model.attributes, {
                success: function() {
                    alert(ja("Save successful"));
                }
            });
        },

        initialize: function() {
            var self = this;
            this._modelBinder = new Backbone.ModelBinder();
            _.bindAll(this, 'updateUptime');
            this.list = this.options.list;
            this.model.on('rerender', this.render, this);
            this.model.on('toggleSelected', this.toggleSelected, this);
            this.setTimer();
            this.model.on('change:online', this.render, this);
            this.model.on('change:status', this.setTimer, this);
            this.model.on('remove', this.close, this);
            // the change positions exist only if we are displaying all the computers 
            this.changedPositionX = this.options.changedPositionX;
            this.changedPositionY = this.options.changedPositionY;
            // if the all group is selected the computer shouldn't bother with enabling/disabling draggable
            this.ignoreLock = this.options.ignoreLock;
            if (this.list) {
                this.template = _.template(underi18n.template(tableItem, App.msgFactory));
            } else {
                this.template = _.template(underi18n.template(gridItem, App.msgFactory));
            }


            var mac = this.model.get("mac_address");

            socket.emit('computerInfos:read', {}, function(err, data) {
                // $("#default_menu").append("");
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["mac"] == mac) {
                        self.model.set({
                            'boot_image_name': data[i]["boot_image_name"]
                        });
                        self.model.set({
                            'boot_menu_name': data[i]["boot_menu_name"]
                        });
                        self.model.set({
                            "menu_detail": data[i]["menu_detail"]
                        });

                        self.model.set({
                            'os': data[i]["os"]
                        });
                        self.model.set({
                            'logon_user': data[i]["logon_user"]
                        });
                        self.model.set({
                            'boot_time': data[i]["boot_time"]
                        });
                        self.model.set({
                            'logon_time': data[i]["logon_time"]
                        });
                        self.render();
                    }

                }

            });
        },

        menu_detail: function() {

            var restartServerView = new MenuDetailView({
                menu_detail: this.model.get("menu_detail")
            });
            restartServerView.render().$el.appendTo($('#modal-container')).modal();
            // var menu_detailView = new (require('views/computers/menu_detail'))({menu_detail: this.model.get("menu_detail")});
            // menu_detailView.render().$el.appendTo($('#modal-container')).modal();
        },
        updateUptime: function() {
            var uptime = this.model.get('uptime');
            if (uptime) {
                this.model.set('elapsed_time', this.model.uptimeInMinutes());
            }
        },

        setTimer: function() {
            if (this.model.get('status') == 'Offline' && this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            } else if (!this.timer) {
                this.timer = setInterval(this.updateUptime, 60 * 1000); // in each minute update uptime          
            }
        },

        close: function() {
            this.remove();
            this.unbind();
            clearInterval(this.timer);
            this.timer = null;
        },

        savePosition: function(event) {
            var self = this;
            var position = this.$el.position();
            var oldPosition = {
                x: self.model.get('x'),
                y: self.model.get('y')
            };
            if (position.left !== this.model.get('x') || position.top !== this.model.get('y')) {
                this.model.set('x', position.left);
                this.model.set('y', position.top);
                this.$el.draggable({
                    disabled: true
                });
                this.model.save({}, {
                    success: function(model, response) {
                        self.$el.draggable({
                            disabled: false
                        });
                    },
                    error: function(model, response) {
                        self.$el.draggable({
                            disabled: false
                        });
                        self.model.set('x', oldPosition.x);
                        self.model.set('y', oldPosition.y);
                        self.render();
                    }
                });
            }
        },

        clicked: function() {
            var detailed = this.$el.hasClass('detailed');
            this.model.trigger('clicked', this.model);

            if (!detailed) {
                this.$el.addClass('detailed');
                $('.computer-logo').attr('no-hide', true);
                window.setTimeout(function() {
                    $('.computer-logo').attr('no-hide', false);
                }, 10);
                this.$el.attr('title', 'click to hide details');
            }
        },

        toggleSelectComputer: function() {

            this.model.toggleSelected();
        },

        toggleSelected: function(selected) {
            $('.select', this.el).toggleClass('selected', selected);
        },

        render: function() {
            //xiongpanan change start 20160324
            var my_menu = this.model.get('update_default');
            //xiongpanan change end 20160324
            var isUpdate = App.msgFactory(this.model.get('update_mode'));
            //xiongpanan change start 20160322
            var updatedisk = App.msgFactory(this.model.get('update_disk'));
            var renderContent = this.template({
                model: this.model,
                active_menu: my_menu,
                update_mode: isUpdate,
                update_disk: updatedisk
            });
            //xiongpanan change end 20160322
            var self = this;
            $(this.el).html(renderContent);
            this._modelBinder.bind(this.model, this.el);
            this.selectPack();
            if (!this.list && this.isPostion) {
                if (!this.ignoreLock) {
                    this.$el.css({
                        position: 'absolute',
                        left: this.model.get('x'),
                        top: this.model.get('y')
                    });
                } else {
                    this.$el.css({
                        position: 'absolute',
                        left: this.changedPositionX,
                        top: this.changedPositionY
                    });
                }
            }
            if (!this.isPostion && this.ignoreLock) {
                $('.select', this.el).css({
                    top: 'auto',
                    right: 'auto',
                    left: 'auto'
                });
            }
            if (!this.ignoreLock) {
                this.$el.draggable({
                    containment: '#computers-container',
                    snap: true,
                    snapTolerance: 70,
                    revert: false,

                    drag: function() {
                        $(this).addClass('drag');
                        $(this).draggable('option', 'revert', false);
                    },

                    stop: function() {
                        $(this).removeClass('drag');
                    }
                });
                this.$el.droppable({
                    greedy: true,
                    tolerance: 'pointer',
                    drop: function(event, ui) {
                        ui.draggable.draggable('option', 'revert', true);
                    }
                });
                this.$el.draggable({
                    disabled: self.model.get('locked') === true ? true : false
                });
            }
            return this;
        },

        selectPack: function() {
            var self = this;
            var menus = $("#default_menu option:selected", self.el).val();
            var pack = '<option value="0">' + App.msgFactory('None') + '</option>';
            if (menus !== undefined) {
                socket.emit('packs:read', {
                    computer_id: 1,
                    menu_id: menus
                }, function(err, data) {
                    for (var i = 0; i < data.length; i++) {
                        var packs_id = data[i]["id"];
                        var packs_name = data[i]["type"];
                        if (i === 0) {
                            pack += '<option value="' + packs_id + '" + selected>' + App.msgFactory(packs_name) + '</option>';
                        } else {
                            pack += '<option value="' + packs_id + '">' + App.msgFactory(packs_name) + '</option>';
                        }

                    }
                    $("#default_menu_detail", self.el).html(pack);
                });
            }
        }
    });

    return ComputerView;
});