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

To create a new page:
src/controllers
	duplicate any existing file to 'layoutExamples.js'
	line 2 update the url '/layoutExamples'
	line 4 change the data '+ layoutExamples'
	line 5 change first param of render method to 'layoutExamples'

src/models
	duplicate any existing file to 'layoutExamples.js'
	replace homeModel to layoutExamplesModel
	change to var names = ['Layout Examples']
	change page.title to 'Layout Examples page'

src/views
	duplicate any existing .jade file to layoutExamples.jade
	add required included files from src/templates folder using jade.



TODO:
require js
For node - http://requirejs.org/docs/node.html

font-icons
update live reload

Mongo db
Angular js

push html5 - Web Sockets

styles - minify
js - minify
test - jasmin

Unit test:
QUnit - https://qunitjs.com/intro/
Unit, Assert, Must, Should, Sinon - http://unitjs.com/
Mocha, Should.... - http://www.clock.co.uk/blog/tools-for-unit-testing-and-quality-assurance-in-node-js
The Node.js Way - Testing Essentials - http://fredkschott.com/post/2014/05/nodejs-testing-essentials/

handle POST - routers
cache
Debug tool for node
