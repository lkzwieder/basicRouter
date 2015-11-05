var _default = function() {
   console.log('default');
   Router.change('user', '/user/123/some/thing');
};

var _user = function(id, thing) {
   console.log(id, thing);
};

Router.addRoutes({
   '/user/id/some/thing': {
      controller: _user,
      params: {
         id: '\\d{1,3}',
         thing: '[a-z]{1,6}'
      }
   },
   'default': {
      controller: _default
   }
});

Router.run();
