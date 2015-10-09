watch:
	echo client/src/main.js | entr make client/main.js

client/main.js: client/src/main.js
	babel client/src/main.js > client/main.js