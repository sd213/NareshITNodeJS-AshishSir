# API DOCS

## page 1

* List of all cities

> http://localhost:1221/location

> http://localhost:4040/city?key=a5ef61a1647488d93e62e34b8f67bc7b87fe01b5798f944e5d225dee9341a051

* List of all restaurants

> http://localhost:4040/restaurants/all  //send x-api-key key and value as request header

* Restaurants w.r.t City(No Ok, Regex should be use find city)

> http://localhost:4040/restaurants/city/Jeevan Bhima Nagar, Bangalore

* Restaurants w.r.t StateId

> http://localhost:4040/restaurants?stateId=3

* List of meals

> http://localhost:4040/meals

* Restaurants based state Id and Meal Type

> 

## page 2

* Restaurant on the basis of Launch
* Restaurants with respect to mealType + CuisineType
* Restaurants with respect to mealType + cost
* Sort on basis of price
* Pagination

## page 3

* Detail of the restaurant
* Menu with respect to restaurant

## page 4

* Details of the selected Menu
* Place Order

## page 5

* View All Order with/without email
* Update order details
