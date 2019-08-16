# virtual-waiter
the front end code for virtual waiter implemented in vue.js. the purpose is for minimal movment of customers in a restaurant of customers when ordering for meals in restaurnt. using the virtual waiter, as well as a local area network(could be as simple as the connection accross a hotspot), orders for meals can be placed


### defination of folders heirachy
| folders       | function          |
| ------------- |:-------------:|
| SRC      | here the components are located and their functions are as named
| PUBLIC     | stores the static files which are currently not human readable because they have been built using babel webpack |

### running and setting up the application
(1) firstly run `yarn` in the root folder of the project<hr/>
(2) then run `yarn serve` : it then brings out the port o which the server as been started <hr/>

### using the application
(1 ) the main section can be found along the normal and regular path of usage
(2) however the user(say the restaurant) can access the customer's orders by appending `/admin` behind the root path. such as: if the application id hosted on `http://localhost:8080` then the admin section can be found in `http://localhost:8080`

note: the web-app uses Mlabs to host the db, thus minimal internet connection is needed for the app to run smoothly, although this can be easily migrated to a local mongo shell.



