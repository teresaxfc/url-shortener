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



https://css-tricks.com/snippets/css/a-guide-to-flexbox/
<html>
<head>
<style>
#main {
    width: 550px;
    height: 100px;
    border: 1px solid #c3c3c3;
    display: -webkit-flex; /* Safari */
    display: flex;
}

/* Standard syntax */
#main div:nth-of-type(1) {flex-grow: 1;}
#main div:nth-of-type(2) {flex-grow: 0; width: 32px;}
#main div:nth-of-type(3) {flex-grow: 0; width: 64px;}
</style>
</head>
<body>

<div id="main">
  <div style="background-color:coral;"></div>
  <div style="background-color:pink;"></div>
  <div style="background-color:lightgrey;"></div>
</div>

<p><b>Note:</b> Internet Explorer 10 and earlier versions do not support the flex-grow property.</p>

<p><b>Note:</b> Safari 6.1 (and newer) supports an alternative, the -webkit-flex-grow property.</p>

</body>
</html>

