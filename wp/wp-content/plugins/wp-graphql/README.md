![Logo](./img/logo.png)

# WPGraphQL 

<a href="https://www.wpgraphql.com" target="_blank">Website</a> • <a href="https://docs.wpgraphql.com/" target="_blank">Docs</a> • <a href="https://wpgql-slack.herokuapp.com/" target="_blank">Join Slack</a>

GraphQL API for WordPress.

[![Build Status](https://travis-ci.org/wp-graphql/wp-graphql.svg?branch=master)](https://travis-ci.org/wp-graphql/wp-graphql)
[![codecov](https://codecov.io/gh/wp-graphql/wp-graphql/branch/master/graph/badge.svg)](https://codecov.io/gh/wp-graphql/wp-graphql)
[![Backers on Open Collective](https://opencollective.com/wp-graphql/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/wp-graphql/sponsors/badge.svg)](#sponsors) 

------

## Quick Install
Download and install like any WordPress plugin.
[Details on Install and Activation](https://docs.wpgraphql.com/getting-started/install-and-activate)

## Documentation

Documentation can be found [here](https://docs.wpgraphql.com). The repository where the Documentation content lives is [here](https://github.com/wp-graphql/docs.wpgraphql.com)

- Requires PHP 5.5+
- Requires WordPress 4.7+

## Overview
This plugin brings the power of GraphQL to WordPress.

<a href="https://graphql.org" target="_blank">GraphQL</a> is a query language spec that was open sourced by Facebook® in 
2015, and has been used in production by Facebook® since 2012.

GraphQL has some similarities to REST in that it exposes an HTTP endpoint where requests can be sent and a JSON response 
is returned. However, where REST has a different endpoint per resource, GraphQL has just a single endpoint and the
data returned isn't implicit, but rather explicit and matches the shape of the request. 

A REST API is implicit, meaning that the data coming back from an endpoint is implied. An endpoint such as `/posts/` 
implies that the data I will retrieve is data related to Post objects, but beyond that it's hard to know exactly what 
will be returned. It might be more data than I need or might not be the data I need at all. 

GraphQL is explicit, meaning that you ask for the data you want and you get the data back in the same shape that it was 
asked for.

Additionally, where REST requires multiple HTTP requests for related data, GraphQL allows related data to be queried and 
retrieved in a single request, and again, in the same shape of the request without any worry of over or under-fetching 
data.

GraphQL also provides rich introspection, allowing for queries to be run to find out details about the Schema, which is
how powerful dev tools, such as _GraphiQl_ have been able to be created.

## GraphiQL API Explorer
_GraphiQL_ is a fantastic GraphQL API Explorer / IDE. There are various versions of _GraphiQL_
that you can find, including a <a href="https://chrome.google.com/webstore/detail/chromeiql/fkkiamalmpiidkljmicmjfbieiclmeij?hl=en">Chrome Extension</a> but
my recommendation is the _GraphiQL_ desktop app below:

- <a href="https://github.com/skevy/graphiql-app">Download the GraphiQL Desktop App</a>
    - Once the app is downloaded and installed, open the App.
    - Set the `GraphQL Endpoint` to `http://yoursite.com/graphql`. In order for the /graphql endpoint to work, you must have [pretty permalinks](https://codex.wordpress.org/Using_Permalinks/) enabled.
    - You should now be able to browse the GraphQL Schema via the "Docs" explorer
    at the top right. 
    - On the left side, you can execute GraphQL Queries
    
    <img src="https://github.com/wp-graphql/wp-graphql/blob/master/img/graphql-docs.gif?raw=true" alt="GraphiQL API Explorer">

## POSSIBLE BREAKING CHANGES
Please note that as the plugin continues to take shape, there might be breaking changes at any point. Once the plugin reaches a stable 1.0.0 release, breaking changes should be minimized and communicated appropriately if they are required.

## Unit Testing and Code Coverage 

Before anything is merged into the WPGraphQL code base it must pass all tests and have 100% code coverage. 
Travis-CI and Coveralls will check this when you create a pull request to the WPGraphQL repo. 
However, before that happens, you should ensure all of these requirements are met locally. 
The following will help you set up both testing and code coverage in your local environment.

### Prerequisites
To run unit tests and code coverage during development you'll need the following:

* [Composer](https://getcomposer.org/doc/00-intro.md)
    * [php-coveralls](https://github.com/php-coveralls/php-coveralls)
        * `composer global require php-coveralls/php-coveralls`
* [Xdebug](https://xdebug.org/docs/install)

### Test Database
In order for tests to run, you need MySQL setup locally. The test suite will need 2 databases for testing. 
One named `wpgraphql_serve` and the other you can name yourself. 
You can keep these databases around if you like and the test suite will use the existing databases, or you can delete them when you're done testing and the test suite will 
re-install them as needed the next time you run the script to install the tests.

*NOTE*: You'll want the test database to be a true test database, not a database with valuable, existing information. 
The tests will create new data and clear out data, and you don't want to cause issues with a database you're actually using for projects.

### Installing the Test Suite
To install the test suite/test databases, from the root of the plugin directory, in the command line run: 

`bin/install-wp-tests.sh <db-name> <db-user> <db-pass> [db-host] [wp-version]`

For example: 

`bin/install-wp-tests.sh wpgraphql_test root password 127.0.0.1 latest`

*DEBUGGING*: If you have run this command before in another branch you may already have a local copy of WordPress downloaded in your `/private/tmp` directory. 
If this is the case, please remove it and then run the install script again. Without removing this you may receive an error when running phpunit.

#### Local Environment Configuration for Codeception Tests

You may have different local environment configuration than what Travis CI has to run the tests, such as database username/password.

In the `/tests` directory you will find `*.suite.dist.yml` config files for each of the codeception test suites. 

You can copy those files and remove the `.dist` from the filename, and that file will be loaded locally _before_ the `.dist` file.

For example, if you wanted to update the `dbName` or `dbPassword` for your local tests, you could copy `wpunit.suite.dist.yml` to `wpunit.suite.yml` and update the `dbName` or `dbPassword` value to reflect your local database and password.

This file is .gitignored, so it will remain in your local environment but will not be added to the repo when you submit pull requests.

### Running the Tests
The tests are built on top of the Codeception testing framework. 

To run the tests, after you've installed the test suite, as described above, you need to also install the `wp-browser`. 

*@todo*: Make this easier than running all these steps, but for now this is what we've got to do.
Perhaps someone who's more of a Composer expert could lend some advise?:


- `rm -rf composer.lock vendor` to remove all composer dependencies and the composer lock file
- `composer require lucatume/wp-browser --dev` to install the Codeception WordPress deps
- `vendor/bin/codecept run` to run all the codeception tests
    - You can specify which tests to run like: 
        - `vendor/bin/codecept run wpunit`
        - `vendor/bin/codecept run functional`
        - `vendor/bin/codecept run acceptance`
    - If you're working on a class, or with a specific test, you can run that class/test with:
        - `vendor/bin/codecept run tests/wpunit/NodesTest.php`
        - `vendor/bin/codecept run tests/wpunit/NodesTest.php:testPluginNodeQuery`


### Using Docker
Docker can be used to run tests or a local application instance in an isolated environment. It can also take care of most
of the set up and configuration tasks performed by a developer.   

1. Verify [Docker CE](https://www.docker.com/community-edition) 17.09.0+ is installed:
   ```
   sudo docker --version
   ```
   
1. Verify [Docker Compose](https://docs.docker.com/compose/install/) is installed:
   ```
   sudo docker-compose --version
   ```
1. (Optional, but handy) How to use Docker without having to type, `sudo`.   
   * https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user


#### Running Wordpress + wp-graphql
1. Start a local instance of WordPress. This will run the instance in the foreground:
   ```
   ./run-docker-local-app.sh
   ```
1. Visit http://127.0.0.1:8000.

#### Using PHPStorm/IntelliJ+XDebug (OS X and Linux)

1. Make sure PHPStorm/IntelliJ is listenting on port 9000 for incoming XDebug connections from the WP container (for more info on remote XDebug debugging, visit https://xdebug.org/docs/remote):
   ![alt text](img/intellij-php-debug-config.png)
   
1. Create a PHP server mapping. This tells the debugger how to map a file path in the container to a file path on the host OS.
   ![alt text](img/intellij-php-servers.png)

1. Create a PHP Debug run configuration.
   ![alt text](img/intellij-php-debug-run-config.png) 

1. Run WordPress+the plugin with XDebug enabled. Here's an example:
   ```
   ./run-docker-local-app-xdebug.sh
   ```

1. Start the debugger:
   ![alt text](img/intellij-php-start-debug.png)
   
1. Now when you visit http://127.0.0.1:8000 you can use the debugger.           


#### Using MySQL clients to connect to MySQL containers
1. Run the application with desired sites. Here's an example:
   ```
   ./run-docker-local-app.sh
   ```

1. List the MySQL containers that are running and their MySQL port mappings. These ports will change each time the app is run:  
   ```
   ./list-mysql-containers.sh
   ```
   
   You should see output like the following:
   ```
   aa38d8d7eff1        mariadb:10.2.24-bionic          "docker-entrypoint.s…"   14 seconds ago      Up 13 seconds       0.0.0.0:32772->3306/tcp   docker_mysql_test_1
   ```
   
1. Configure your MySQL client to connect to `localhost` and the appropriate ***host*** port. For example, to connect
   to the MySQL container shown above, have the MySQL client connect with this configuration:
   * IP/Hostname: `localhost`
   * Port: `32772`
   * Database: `wpgraphql_test`
   * User: `root`
   * Password: `testing`

   
#### Running tests with Docker

##### For developers
You'll need two terminal windows for this. The first window is to start the Docker containers needed for running tests. The
second window is where you'll log into one of the running Docker containers (which will have OS dependencies already installed) and run 
your tests as you make code changes.

1. In the first terminal window, start up a pristine Docker testing environment by running this command:
   ```
   ./run-docker-test-environment.sh
   ```
   This step will take several minutes the first time it's run because it needs to install OS dependencies. This work will
   be cached so you won't have to wait as long the next time you run it. You are ready to go to the next step when you
   see output similar to the following:
   ```
   wpgraphql.test_1  | [Tue Oct 30 15:04:33.917067 2018] [core:notice] [pid 1] AH00094: Command line: 'apache2 -D FOREGROUND'
   
   ```
1. In the second terminal window, access the Docker container shell from which you can run tests:
   ```
   ./run-docker-test-environment-shell.sh
   ```
   You should eventually see a prompt like this:
   ```
   root@cd8e4375eb6f:/tmp/wordpress/wp-content/plugins/wp-graphql
   ```   
1. Now you are ready to work in your IDE and test your changes by running any of the following commands in the second
terminal window):
   ```
   vendor/bin/codecept run wpunit --env docker
   vendor/bin/codecept run functional --env docker
   vendor/bin/codecept run acceptance --env docker
   vendor/bin/codecept run tests/wpunit/NodesTest.php --env docker
   vendor/bin/codecept run tests/wpunit/NodesTest.php:testPluginNodeQuery --env docker
   ```
Notes:
* If you make a change that requires `composer install` to be rerun, shutdown the testing environment and restart it to 
automatically rerun the `composer install` in the testing environment.
* Leave the container shell (the second terminal window) by typing `exit`.
* Shutdown the testing environment (the first terminal window) by typing `Ctrl + c` 
* Docker artifacts will *usually* be cleaned up automatically when the script completes. In case it doesn't do the job,
try these solutions:
   * Run this command: `docker system prune`
   * https://docs.docker.com/config/pruning/#prune-containers


##### For CI tools (e.g. Travis)
* Run the tests in pristine Docker environments by running any of these commands: 
   ```
   ./run-docker-tests.sh 'wpunit'
   ./run-docker-tests.sh 'functional'
   ./run-docker-tests.sh 'acceptance'
   ```

* Run the tests in pristine Docker environments with different configurations. Here are some examples: 
   ```
   env PHP_VERSION='7.1' ./run-docker-tests.sh 'wpunit'
   env PHP_VERSION='7.1' COVERAGE='true' ./run-docker-tests.sh 'functional'
   ```
If `COVERAGE='true'` is set, results will appear in `docker-output/`.


Notes:
* Code coverage for `functional` and `acceptance` tests is only supported for PHP 7.X. 
  

#### Updating WP Docker software versions
Make sure the `docker-compose*.yml` files refer to the most recent and specific version of the official WordPress Docker and MySQL compatible images.
Please avoid using the `latest` Docker tag. Once Docker caches a Docker image for a given tag onto your machine, it won't automatically
check for updates. Using an actual version number ensures Docker image caches are updated at the right time.

List of software versions to check:
* Travis config `.travis.yml`
* Test base Dockerfile (`Dockerfile.test-base`)
   * XDebug
   * Official WordPress/PHP Docker image
   * PHP Composer

* XDebug Dockerfile (`Dockerfile.xdebug`)
   * XDebug

  
### Generating Code Coverage
You can generate code coverage for tests by passing `--coverage`, `--coverage-xml` or `--coverage-html` with the tests. 

- `--coverage` will print coverage info to the screen
- `--coverage-xml` will save an XML file that can be used by services like Coveralls or CodeCov
- `--coverage-html` will save the coverage report in an HTML file that you can browse. 

The coverage details will be output to `/tests/_output`

### Running Individual Files 
As you'll note, running all of the tests in the entire test suite can be time consuming. If you would like to run only one test file instead of all of them, simply pass the test file you're trying to test, like so:

`vendor/bin/codecept run wpunit AvatarObjectQueriesTest`

To capture coverage for a single file, you can run the test like so:

`vendor/bin/codecept run wpunit AvatarObjectQueriesTest --coverage`

And you can output the coverage locally to HTML like so: 

`vendor/bin/codecept run wpunit AvatarObjectQueriesTest --coverage --coverage-html`

## Shout Outs
This plugin brings the power of GraphQL (http://graphql.org/) to WordPress.

This plugin is based on the hard work of Jason Bahl, Ryan Kanner, Hughie Devore and Peter Pak of Digital First Media (https://github.com/dfmedia),
and Edwin Cromley of BE-Webdesign (https://github.com/BE-Webdesign).

The plugin is built on top of the graphql-php library by Webonyx (https://github.com/webonyx/graphql-php) and makes use 
of the graphql-relay-php library by Ivome (https://github.com/ivome/graphql-relay-php/)

Special thanks to Digital First Media (http://digitalfirstmedia.com) for allocating development resources to push the 
project forward.

Some of the concepts and code are based on the WordPress Rest API. Much love to the folks (https://github.com/orgs/WP-API/people) 
that put their blood, sweat and tears into the WP-API project, as it's been huge in moving WordPress forward as a 
platform and helped inspire and direct the development of WPGraphQL.

Much love to Facebook® for open sourcing the GraphQL spec (https://facebook.github.io/graphql/), the amazing GraphiQL 
dev tools (https://github.com/graphql/graphiql), and maintaining the JavaScript GraphQL reference 
implementation (https://github.com/graphql/graphql-js)

Much love to Apollo (Meteor Development Group) for their work on driving GraphQL forward and providing a lot of insight 
into how to design GraphQL schemas, etc. Check them out: http://www.apollodata.com/

## Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/wp-graphql/wp-graphql/graphs/contributors"><img src="https://opencollective.com/wp-graphql/contributors.svg?width=890&button=false" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/wp-graphql#backer)]

<a href="https://opencollective.com/wp-graphql#backers" target="_blank"><img src="https://opencollective.com/wp-graphql/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/wp-graphql#sponsor)]

<a href="https://opencollective.com/wp-graphql/sponsor/0/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/1/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/2/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/3/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/4/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/5/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/6/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/7/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/8/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/wp-graphql/sponsor/9/website" target="_blank"><img src="https://opencollective.com/wp-graphql/sponsor/9/avatar.svg"></a>


