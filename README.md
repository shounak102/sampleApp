## **EoT Labs - Full Stack Developer Take-Home Test Documentation**

## Introduction:

This is a web application that serves as a prototype for an online
catalog for a guitar store. The application is designed with the store
owner and customers in mind. The user interface allows users to view the
guitars, add new guitars, edit existing details and delete items.

Github URL:
[https://github.com/shounak102/sampleApp](https://github.com/shounak102/sampleApp)

Live URL:
[http://34.170.141.154:5000/](http://34.170.141.154:5000/)

## Features:

The features on this website allow the user to modify the data on the
catalog, which is a privilege reserved for the store administration.
However, there is currently no differentiation of roles so all features
are available to the users regardless of their role.

-   **Adding guitars**: 
	Users are able to add new guitars by clicking
    the Add Guitar button. This opens up a dialog box with a form
    which allows the user to enter the following details of a new
    guitar: Name, Description, Price, and Image URL. All of these
    fields are required for adding a new guitar.

-   **Viewing guitars**:
    Users are able to view the existing catalog of
    guitars in a list overview. The list displays an image along with
    the name of the guitar model. Clicking any of the guitar cards
    opens up a dialog box which shows the following details: Guitar
    Name, Price, Image, Description.

-   **Editing details**:
    Users are able to edit a guitar's details by
    clicking the Edit button (pencil icon). This transforms the dialog
    box into an editing form pre-populated with the guitar's existing
    details. The changes can be saved by clicking the save button.

-   **Deleting guitars**:
    Users are able to delete an existing guitar
    from the catalog also from the info dialog box by clicking the
    delete button (trash icon). Upon clicking this, they are prompted
    with a confirmation dialog to ensure that they are aware that they
    are permanently deleting the item.

## Backend:

The backend is a node.js app built using Express. It uses mongoose to
connect to a remote MongoDB database. The backend server serves the
frontend app build for all routes except for the designated API routes.

The items in the database follow this schema:

-   title: { type: String, required: true } -- This is the name of the guitar

-   img: { type: String, required: true } -- This is the URL to the image of the guitar

-   price: { type: Number, required: true } -- This is the price of the guitar in dollars

-   desc: { type: String, required: true } -- This is the description of the guitar

The routes supported by the backend server are:

-   GET /api/items/get
    This route takes no parameters. It returns an array of all the
    guitars in the DB with status 200 upon success.

-   POST /api/items/create\
    This route takes no parameters but requires an object in the
    request body. This object is added to the DB as a new item if it
    is a valid item. It returns status 200 and the new item created
    upon success.

-   POST /api/items/edit/:id\
    This route takes the 'id' as a URL parameter and requires the
    updated item details in the request body. It changes the details
    of the item as per the request body and returns status 200 and the
    item that was edited upon success.

-   DELETE /api/items/delete/:id\
    This route takes the 'id' as a URL parameter. It deletes the item
    from the database if it exists and returns status 200 with the
    item that was deleted upon success.

## Frontend: 

The frontend is a single page application built using ReactJS. It uses
MaterialUI components for common UI elements such as Modals, Buttons and
Icons, and axios for making backend API calls.

It consists of the following components:

-   App.js - This is the starting point of the react app and loads the main component Guitars.js.

-   Guitars.js - This is the parent component which includes the Input and ListItem components. It performs the initial backend API calls to load the guitars from the database and provides the edit and delete API calls as props to the ListItem component.

-   Input.js - This component is associated with the Add Guitar button and the modal used to input data for a new guitar.

-   ListItem.js - This component is associated with the list of guitars that are available, and the dialog box that is used to view, edit and delete the details of any specific guitar.

## Build Instructions:

In order to run this app on your local machine, here are the steps:

1.  Clone the repository on your local machine and navigate to the root directory.

2.  Run ./\$ROOT/scripts/nodejs.sh - This should install nodejs on your machine if you don't have it already

3.  Run nvm use 21.6.0 - This is to ensure nvm and node are running properly.

4.  From \$ROOT directory, run npm install

5.  Navigate to \$ROOT/frontend

6.  Run npm install

7.  Run npm run build

8.  Navigate to \$ROOT

9.  Run npm start

This will start the server on your local machine on the port 5000 and
should now be available on your localhost:5000.

Alternatively, you can run this using Docker.

## Docker Instructions:

1.  Navigate to \$ROOT

2.  Run docker build -t \$YOUR_IMAGE_NAME .
    > This creates a new docker image of the application. Once the image
    > is built, you can run a container based on that image.



3.  Run docker run -p 5000:5000 -d \$YOUR_IMAGE_NAME

This will start the server on your local machine on the port 5000 and
should now be available on your localhost:5000. The docker image can
also be deployed to an environment of your choice that supports Docker.
