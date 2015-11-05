# basicRouter
Javascript routing in a basic way

### Installation
```sh
$ npm install basic-router
```

### Typical use
When a route is matched we use the callback, so first, we declare our callbacks, in the example I declared `_default` and
`_user`.
Then, we need to tell the Router our routes using `Router.addRoutes` and passing an object in which we declare our routes, 
which controller we use in case of match and which one are params and how to match them.

```
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
```

If we run our app, with no pathname like *example.com*, our router will call to 'default' callback, so, its mandatory for 
you to declare a callback for 'default'. So our routes object would be like this:

```
{
   'default': {
      controller: _default
   }
}
```

Then we can add our own routes with some magic:

```
var routes = {
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
}
```

In the previous example we declare '/user/id/some/thing' but pay attention to the params, we tell the router that id 
and thing are wildcards and those will match with certain regex (don't be afraid, here you need to use short and easy ones)
id will match with all numbers between 0 and 999, meanwhile thing will match with chars from a to z with a max of 6 characters.

Now you can filter in the way you want using commons regex and without declare url with extra symbols. If the url cannot
match the router will use default callback, so, we encourage to use default like home. Its very weird the case developers
use another url for default so, I decide to work a bit less on that.

Also you can add more routes, and will merge new ones with old ones, delete routes if no longer needed, flush all routes
of the registry. And of course, change the URL.

A few more routes:
```
Router.addRoute({
    '/login/user': {
        controller: _login,
        params: {
            user: '\\d{1,8}'
        } 
    },
    '/login/email': {
            controller: _loginWithEmail,
            params: {
                email: 'some email regex'
            } 
        }
});
```
We can see the potential of this router, we can modularize our app entirely, every module can manage his own routes,
and we can achieve a kind of strategy pattern with no difficulties.

If we decide the user only can login with email we can delete
```
Router.delRoute('/login/user');
```

If we get mad, we can flush all, but this would save the default call.

```
Router.flushRoutes();
```

If we want to navigate to another url just use `Route.change`

```
Router.change('user', '/user/some@email.com');
```
Enjoy it!