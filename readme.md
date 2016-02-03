Install node.js for Linux/iOs/Windows
This will include npm

For Windows users gitShell need to install to run the commands.

create package.json $ npm init

Install required plug-ins from npm repository
npm install -g grunt-cli (-g globally installed so that it can be used any where not only related to this particular app set-up)
npm install grunt-contrib-connect - specific to the project task creation. See package.json for more details.

Grunt has the required task plug-ins for jshint, build, clean, uglify, minify js/css, jade templating, connect, copy, less, test, etc. And it would very simple to set up the application.

Refer http://gruntjs.com to understand how Grunt's task runner works.
You may interested in starting here http://gruntjs.com/getting-started

Once you understand about Grunt and creating tasks refer this how to create the tasks.
http://www.sitepoint.com/writing-awesome-build-script-grunt/

Once the taks are created in Gruntfile.js, grouping Grunt tasks and breaking down to multiple small files is explained here http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/

favicon:
Ref: https://www.w3.org/2005/10/howto-favicon

TODO:
cache
require js
styles
layout
templates
