test: test-unit test-routes

test-unit:
	@NODE_ENV=test ./src/node_modules/.bin/mocha --timeout 10000 --recursive ./src/test

test-routes:
	@NODE_ENV=test ./src/node_modules/.bin/mocha --timeout 10000 --recursive ./src/api/test/routes

build:
	cd ./src && npm i
	cd ./src/web && bower i
	cd ./src/web && npm i