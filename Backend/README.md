# Backend Readme

## Getting Started
1. Make sure you have node/git installed (go to [this link](https://nodejs.org/en/download/) to install it)
2. Run `npm install` to install/setup dependencies
    - Run `npm install --production` to run in production mode (not installing the dev dependencies) if the server will not be run in development mode (saves time and makes application smaller)
3. Run `npm start` to run in production mode

Notes:
 - Run `npm run start:dev` to run in development mode, in this mode changes saved to the local server will automatically be redeployed when their files are saved (this does not occur when `npm start` is ran)
 - If you want to run the server on a specific port, it can be done by running either `$env:PORT=####` on windows or `export PORT=####` on mac/linux (replace #### with number). To unset the variable use either `$env:PORT=$null` on windows or `unset PORT` on linux/mac

