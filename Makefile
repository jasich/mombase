test: test-unit test-routes

test-unit:
	./src/node_modules/.bin/mocha --timeout 10000 --recursive ./src/test

test-routes:
	./src/node_modules/.bin/mocha --timeout 10000 --recursive ./src/api/test/routes
