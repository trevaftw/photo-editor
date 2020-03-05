$ ionic generate page 
this will generate a full view as a standalone page-view, compared to $ionic generate component whihc is a reusable companent.

in firebase, make sure under Develop -> Authentication to turn on email/password as a way for a user to sign-in/up

in firebase, use the cloud firestore for database
firebase use a NoSQL database
collections can be made up of collections of collections of etc., but a document is always the "final stop" 
documents need to have a primary/unique key
first table we need is a users "table" aka documen t