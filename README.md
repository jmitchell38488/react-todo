This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project is based on [React Todo MVC](https://github.com/tastejs/todomvc/tree/master/examples/react), utilising a local API
storage and _React.Component_ instead of the uncompiled `.jsx` code.

The application is constructed on the *ERN stack, minus the _M (Mongo)_.

#### The API
The API for the Todo MVC app is a single nodejs express server `api-server.js`. The server runs on port 8000, which can be changed by
modifying the executable file.

Available endpoints:
```
/items     [GET]
/item      [POST]
/item/:id  [GET, PUT, DELETE]
```

All API requests act on a single item at a time. The React app has been constructed to modify
single items at a time.

## Available Scripts

In the project directory, you can run:

### `node api-server.js`

Runs the API server in development mode in the background.<br/>
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

To enable hot-reloading, install `nodemon` with `npm install nodemon`. Just keep in mind that the data store is local
and contained within the instance of node, so a restart will remove all todo items.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
