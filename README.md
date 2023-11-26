# Help Queue

#### A simple React application implementing Redux for state management. 

#### By Joey Palchak

## Technologies Used

- JavaScript
- React (v18.2.0)
- Redux (v4.2.0)
- React-Redux (v8.0.2)
- RTK (v1.9.7)
- Node (v16.13.1)
- npm (v8.1.2)
- CSS
- HTML

## Description

Help Queue is a simple React application intended only for practice & learning purposes. The application implements Redux for state management, and conditionally renders a number of different components: 
* a list of tickets, 
* a form to create a ticket, 
* or a form to update / delete an existing ticket

This project contains multiple branches that show each step of implementing Redux, including a branch specifically for migrating from legacy Redux to Redux Toolkit, implementing best practices [according to official documentation](https://redux.js.org/usage/migrating-to-modern-redux).

## Setup & Installation

1. Copy the **[URL](https://github.com/jfpalchak/help-queue.git)** provided for this repository.
2. Open Terminal.
3. Change your working directory to where you'd like to create the cloned directory.
4. In your terminal, type `git clone` and use the copied URL from Step 1. Or, copy the following git command:
   
```bash
$ git clone https://github.com/jfpalchak/help-queue.git
```

5. Navigate to the root of the newly cloned directory.
6. In your terminal, assuming Node and npm are installed, type the following command to install the project's dependencies found in `package.json`:
   
```bash
$ npm install
```

7. With the dependencies installed, type the following line in your terminal to run the application in development mode:
   
```bash
$ npm run start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Known Bugs

There are no known bugs.

## License

MIT License

Copyright (c) 2023 Joey Palchak

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```