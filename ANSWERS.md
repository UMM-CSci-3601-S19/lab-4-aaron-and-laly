## Questions

1. :question: What do we do in the `Server` and `UserController` constructors
to set up our connection to the development database?
1. :question: How do we retrieve a user by ID in the `UserController.getUser(String)` method?
1. :question: How do we retrieve all the users with a given age 
in `UserController.getUsers(Map...)`? What's the role of `filterDoc` in that
method?
1. :question: What are these `Document` objects that we use in the `UserController`? 
Why and how are we using them?
1. :question: What does `UserControllerSpec.clearAndPopulateDb` do?
1. :question: What's being tested in `UserControllerSpec.getUsersWhoAre37()`?
How is that being tested?
1. :question: Follow the process for adding a new user. What role do `UserController` and 
`UserRequestHandler` play in the process?

## Your Team's Answers

1. In the 'UserControler' constructor, it calls the database using mongo syntax getting and filtering users. It also adds functionality for adding new user. 
    In the 'Server' constructor, it handles request and responses. It also has 'mongoClient' and 'mongoDatabase'. 
2. The 'getUser' retrieves the id by comparing the collection of id's to the id we pass it. 

3. To retrieve all the users with a given age, it calls 'getUser' and it checks the 'targetAge' and returns the user with the target age.
    FilterDoc is a specific filter for mongo that will filter the document by what we want. 

4. The 'Document' are a generalized file format that mongo uses to store data. the document object can have data that is incomplete or can have data with a new field (added later) that old data does not have. 
we are using them in a similar way as a Json object. we are using mongo objects because it is more flexible then other data objects.

5. The 'UserControllerSpec.clearAndPopulateDb' populates a mongo database with testUsers. It creates a new id for a specific user. 

6. It is getting users with a specific name set, users by a specific age, and users by a specific mongoId. It checks if these criteria are matching. 

7. The 'UserRequestHandler' gets a new user and calls 'userController' to give it the right criteria for a user. When 'userController' is done, 'userRequestHandler' returns the new user.
 