
Steps to build:

1: Install Qt development packages (built with scripting support). E.g. on Ubuntu 11.04:
sudo apt-get install qt4-dev-tools

2: Generate the makefile from the .pro file:
qmake -o Makefile workstation_js.pro

3: Build with make:
make

4: Start the resulting application:
./workstation_js