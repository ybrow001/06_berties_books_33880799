# 06_berties_books_33880799

## Berties Books

Berties books is a web application that utilises data stored in a MySQL database.
It has the ability to read and display information stored in the database, as well as insert new data into it.
This gives it dynamic responses to user input, which can be maintained over time.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

## Access Control

As of Lab 8 Task 5, rudimentary access control has been added to the application via verifying user credentials via sessions.
The pages I have restricted access to are the Berties Books user directory (/users/list) and the "Add a book to our database"(/books/list) page. 
I have limited access to these pages because they could potentially contain sensitive data on the user list page, or data crucial to the sites functionality on the add books page.
In a less redumentary set up I would limit acces to site admin or approriate users only.
