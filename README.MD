# 06_berties_books_33880799

## Berties Books

Berties books is a web application that utilises data stored in a MySQL database.
It has the ability to read and display information stored in the database, as well as insert new data into it.
This gives it dynamic responses to user input, which can be maintained over time.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

## access control

As of Lab 8 Task 5, rudimentary access control has been added to the application via verifying user credentials via sessions.
The pages I have restricted access to are the Berties Books user directory (/users/list) and the "Add a book to our database"(/books/list) page. 
I have limited access to these pages because they could potentially contain sensitive data on the user list page, or data crucial to the sites functionality on the add books page.
In a less redumentary set up I would limit acces to site admin or approriate users only.

## user validation

The app features user validation on both the user registration and login pages.
These varify the information entered by the user as valid within the sites data system. Ensuring that user data is within certain ranges of characters for security and data storage purposes.
In the case of the login the password minimum length is lowered from the 8 on the login page to accomodate for legacy users accounts made before the minimum limit of 8 was added. 
The login checks the username and password minimum and maximum lengths to validate that they are what the app accepts as valid. 
These checks may also be extended to encompass the compulsory inclusion of certain characters, for example, to improve security or apply particular formating to usernames further.
The places I have chosen to add validation are the features of the site the involve users creating or signing in to their accounts. Beyond that some pages are already restricted to only users who are signed in.

## sanitisation

The inputs in the registration form first name, last name, username and email have been sanitized to vary degrees. Username and email less so, to allow characters that may be removed using escape() and to not break the email. 
This is to prevent Cross Site Scripting (XSS) and to secure the validity of user credentials.
The password is not sanitized to avoid breaking it, and the hashed password is not because it has already been effectivey sanitized by the process encrypting.
Sanitization has also been applied to the username during login to avoid XSS when the username is displayed.