var User = require('../../config/db.js').User;


User.checkAuthorization=function(needs, req, res, fct) {
  if(typeof res === 'undefined' || res === null)
    console.log('Missing res');
  else if(typeof req === 'undefined' || req === null)
    res({error:'Missing req'}, null);
  else if(typeof req.password_$ === 'undefined' || req.password_$ === null)
    res({error:'Missing password'}, null);
  else if(typeof req.user_$ === 'undefined' || req.user === null) {
    res({error:'Missing user'}, null);
  } else {
         User.all({where: {username: req.user_$,password: req.password_$}},function(error, user) {
             if(user.length>0){
              fct();
             }else{
              res({'error': 'Invalid password'}, null);
             }
          });
  }

};



module.exports.User = User;
