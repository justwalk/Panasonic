var User = require('../models/User').User;
var UserMenu =require('../../config/db.js').UserMenu;
var Menu =require('../../config/db.js').MenuTable;
var fs =require('fs');
var config = require('../../config/config.js');


module.exports = function(socket) {
  
  socket.on('user:check', function (req, res) {
        if(req.user&&req.pass){
          User.all({where: {username: req.user,password: req.pass}},function(error, user) { 
            if(user.length>0&&!error){
              var time=user[0].lastlogintime;
            user[0].updateAttributes({lastlogintime:new Date()},function(error,a){});
            UserMenu.all({where: {userid: user[0].id}},function(error, memus){
                 user[0].lastlogintime=time;
                 res(error, {means:memus,user:user[0]});
              })
            }else{
              res({'error': 'user or password not find'}, null);
            }
          });
        }else{
          res({'error': 'user or password is null'}, null);
        }
  });

  socket.on('users:read', function (req, res) { 
   
    User.checkAuthorization('admin', req, res, function() {
      User.all(function(err, users) {
         res(err, users);
      });
    });
  });   

  socket.on('user:create', function(req, res) {
      delete req.id;
      User.all({where:{username:req.username}},function(err, users) {
        console.log(err);
        console.log(users);
        if(users.length>0){
            res({error:'Invalid username'}, null);
            return;
        }if(req.password!=req.repassword){
            res({error:'The password and confirmation password are different'},null)
             return;
        }else{
           User.create(req,function(error, taskCopy) {
            res(error, taskCopy);
          });
        }
      });
   
  });

   socket.on('user:delete', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {

        User.find(req.id, function(error, user) {
          if(req.id==='1'||req.id===1){
            res({error:'can’t delete admin'},null);
          }else{
              user.destroy(function(error) {
               UserMenu.all({where: {userid:req.id}},function(error,memus){
                for(i in memus){
                  memus[i].destroy();
                }
                res(error);
               }) 

                }
              );
          }
          
          });
      });
  });

   socket.on('user:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
        if(req.updateOpen){
           User.find(req.id, function(error, user) {
            if(user&&(req.username!='admin'||!req.isopen)){
                user.updateAttributes({isopen:req.isopen,width:req.width,height:req.height}, function(err, data) {
                  res(err, data);
                });
            }
          });
           return;
        }
        if(req.rpassword==req.repassword){
           User.find(req.id, function(error, user) {
            if(user){
               var updateParam={};
                if(req.rpassword&&req.repassword){
                    updateParam.password=req.rpassword;
                }
                if(req.name){
                    updateParam.name=req.name;
                }
                if(updateParam){
                    user.updateAttributes(updateParam, function(err, data) {
                      res(err, data);
                    });
                }
              
            }
          });
        }else{
          res({error:'The password and confirmation password are different'},null);
            return;
        }
        
        
        });
    });

   socket.on('editmenus:read', function (req, res) {
    User.checkAuthorization('admin', req, res, function() {
       UserMenu.all({where: {userid: req.id}},function(error, usermemus){
         Menu.all(function(err, menus) {
            res(err, {usermemus:usermemus,menus:menus});
         });
      })
     
    });
  });   

    socket.on('editmenus:update', function (req, res) {
    User.checkAuthorization('admin', req, res, function() {
      if(req.add.length>0){
        for(var i in req.add){
          var userMenu=UserMenu({userid:req.id,menuid:req.add[i]})
          userMenu.save(function(error,date){

          })
        }
      }
       if(req.remove.length>0){
        for(var i in req.remove){
          UserMenu.all({where: {userid: req.id,menuid:req.remove[i]}},function(error,data){
            data[0].destroy(function(e,d){

            });
          })
        }
      }
     
    });
  });   
};