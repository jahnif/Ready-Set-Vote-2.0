# Ready, Set, Vote!

Ready, Set, Vote! is a tool that allows voters to get the information they need about the various candidates running for office so that they can make an informed decision.

This project is a rewrite of the existing production application, with a focus on using modern, reusable, and _most importantly_ extensibility. We want this site to be able to serve any municipality, not just Seattle. To do this, we need to create a more generic web application with the tools necessary to deploy the application for any municipality interested in using it.

Ready, Set, Vote! is a project of the [Municipal League](http://munileague.org/).

## Project Information

- [See the project Google Drive for more details](https://drive.google.com/drive/folders/1ObApLz2WMISnV-To0Ypb91ZAGj-XBye8?usp=sharing)

## Technology Stack

### Frontend

- React (created with react-scripts-ts) - Main UI library
- Typescript - To provide types in JS, making development easier
- Mobx - To provide a data store to React

### Backend

- AWS - Used to host the website
- Express - Server side routing
- Serverless - To deploy server-side logic as an AWS Lambda
- SQL - Database
- [TODO: Finish choosing and building out backend]

### React Endpoints

#### Users

1. `/` - Landing page, allows for language selection
2. `/address` - Gets the user's address to find their ballot
3. `/ballot` - The actual ballot; the main piece of the site
4. `/email` - Allows the user to email themselves their completed ballot
5. `/guide` - Share or print your results

#### Admin

- `/admin` - Admin side of the side
- [TODO: Finish listing other parts of the admin site]

## Environment Setup

Note for Windows users: PowerShell works best :)

### Prerequisites

1. node / npm (if not already installed): https://www.npmjs.com/get-npm
2. Mongoose: `npm install mongoose`
3. Join us as a volunteer! On [DemocracyLab](https://www.democracylab.org/index/?section=AboutProject&id=77), click the "Contact Project" button in the upper-right. Enter a message requesting access to Slack and Github. Include your email address and GitHub username in the message.
4. Once you have access, the volunteer Slack is readysetvote2018.slack.com

### Running the Server Locally

1. On Slack in #general, post a message requesting access to the mongo DB. A volunteer will provide you with a `.env` config file.
2. After cloning the repo, create the directory `server/config`, and drop the `.env` file from the previous step in this directory.
3. Start the server: `npm run server`

### Useful Tools

- [Postman](https://www.getpostman.com/downloads/) for crafting REST requests and inspecting responses
- [Compass](https://www.mongodb.com/products/compass), a GUI for interacting with a mongo DB
