#Introduction to javascript - Exercise 

##Before you start
Make sure you have the following installed:
1. git
2. node
3. bower
4. brew

##Getting started
Open your bash and type the following commands:

1. git clone https://github.com/wix/academy-javascript-101.git
2. bower install
3. npm install
4. brew install phantomjs

##Setup
Open the project in WebStrom/IntelliJ create a karma run configuration
run it. all the test should fail
Alernatively, you can run javascript-101.html in your browser

##The actual exercise
Next, try to make the tests pass without changing them (i.e. changing only the files at the src folder)

Each section contains a general instructions spec which should help you get started.
The order of the exercises is:

1. prototype
2. functional programing
3. callbacks and events

##Further chalanges:

1. Create a javascript snippet that calculates how money much a youtube channel made
2. Create your version of bind (without using the native "bind")
3. Create your version of call/apply without using the native functions
4. Web server, part 1: create a basic http server that displays the content of a folder at a tree. Include subfolders, file statistics, etc. Implemet it as a stream (i.e. don't make the client wait till your sweep is over).
5. Web server, part 2: Optimize part 1 to cache past sweeps in memory. use watches to invalidate the cache. Do so in a lean way (try to avoid full sweeps as much as possible)
6. Web client part 1: Implement [fft](http://en.wikipedia.org/wiki/Fast_Fourier_transform) in a non-blocking way and use it to display spectral analysis of an image loaded to a [html canvas](http://www.w3schools.com/html/html5_canvas.asp). make sure that the UI does not freeze during the processing (display a progress bar).
7. Web client part 2: Add other image processing stats such as histograms, edge finding etc. Make sure all your processing is non-bloacking



