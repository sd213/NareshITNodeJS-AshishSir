# Nested Object Operation

## This type of query is useful when you have nested or embedded documents, such as an array of related objects, and you want to find documents based on a value in one of those nested objects. It's common in situations like

1.Finding restaurants that offer a specific meal type
2.Searching for products with a specific category ID.
3.Retrieving users with a specific role or permission in a nested structure.

    db.restaurants.find({"mealTypes.mealtype_id":2}) //without projection
    db.restaurants.find({"mealTypes.mealtype_id":2},{restaurant_name:1,mealTypes:1,_id:0}) // with projection

### in query :- helps to use multiple condition

    db.restaurants.find({"mealTypes.mealtype_id":{$in:[1,3,5]}},{restaurant_name:1,mealTypes:1,_id:0})

### gt and lt

#### lt

    db.restaurants.find({"cost":{$lt:500}},{restaurant_name:1,mealTypes:1,cost:1,_id:0}) :- to find where cost less than 500

    db.restaurants.find({"cost":{$lt:500},"mealTypes.mealtype_id":{$in:[1,3,5]}},{restaurant_name:1,mealTypes:1,_id:0})
    
#### gt

    db.restaurants.find({"cost":{$gt:500}},{restaurant_name:1,mealTypes:1,cost:1,_id:0}) :- to find where cost greater than 500

#### range

    db.restaurants.find({"cost":{$gt:500,$lt:1000}},{restaurant_name:1,mealTypes:1,cost:1,_id:0})

