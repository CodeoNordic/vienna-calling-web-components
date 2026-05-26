# Vienna Calling Web Components
This is all project files used during the "Make your own Web Component from Scratch" session

# Requirements
- [FileMaker Pro](https://www.claris.com/filemaker/)
- [Node.js](https://nodejs.org/en/download/)
- Your favorite IDE (e.g [VsCode](https://code.visualstudio.com/) or [Sublime Text](https://www.sublimetext.com/))

# Installation
- Download the repository
- Run `npm install` in the terminal inside each subfolder:
  - [Hello World](./hello-world/)
  - [Todo App](./todo-app/)
  - [Just Another Calendar](./just-another-calendar/)

**The following steps use [Hello World](./hello-world/) as the example project**

# Development
- Run `npm start` in the terminal inside the [Hello World](./hello-world/) directory
- In the [FileMaker Demo](./vienna-calling-web-components.fmp12), go to the HTML-tab, and enable "Dev" in the bottom right
- Make changes to the [source code](./hello-world/src/) and re-enter the Hello World layout

# Building to FileMaker
- Run `npm run upload` in the terminal inside the [Hello World](./hello-world/) directory
  - This will both build the HTML for production, and run [upload.js](./hello-world/upload.js)
- In the [FileMaker Demo](./vienna-calling-web-components.fmp12), go to the HTML-tab, and disable "Dev" in the bottom right
