Management system

setup mysql 
https://medium.com/coderscorner/connecting-to-mysql-through-docker-997aa2c090cc

----------------------------------------------------------------------------------

create database 
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=myql -d mysql:latest

----------------------------------------------------------------------------------

alter MYSQL_ROOT_PASSWORD

docker run --name mysql -e MYSQL_ROOT_PASSWORD=PASSWORD -p 3306:3306 -d mysql:latest
docker exec -it mysql bash
mysql -u root -pPASSWORD
ALTER USER root IDENTIFIED WITH mysql_native_password BY 'PASSWORD';
exit
exit
docker run --name phpmyadmin -d --link mysql:db -p 8080:80 phpmyadmin/phpmyadmin:latest

----------------------------------------------------------------------------------