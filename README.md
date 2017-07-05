## Start mongodb

Start mongodb which listens on localhost port 27017 
```
cd ~/projects/freecodecamp/db
docker-compose up
```

## Login MongoDB Console
```
docker exec -it db_mongo_1 mongo
```

{"_id":"595b713c2734af46c3878ee1",
"id":"308123749648525",
"username":null,
"displayName":null,
"name":{"familyName":"Xu","givenName":"Wei","middleName":null},
"gender":null,
"profileUrl":null,
"emails":[{"value":"weixu365@gmail.com"}],
"provider":"facebook",
"_raw":"{\"id\":\"308123749648525\",\"email\":\"weixu365\\u0040gmail.com\",\"first_name\":\"Wei\",\"last_name\":\"Xu\"}",
"_json":{"id":"308123749648525","email":"weixu365@gmail.com","first_name":"Wei","last_name":"Xu"}}