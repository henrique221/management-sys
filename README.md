# Burndown Management System
A management system to control burndown graphs

***

## Getting Started

### Pre-requirements
- Docker
- Docker Compose

***

## Commands

### Start application
```
docker-compose up {{ options }}
```
* You will see the app on http://localhost/home

### Bug on Start [ToDo fix]
If you have a problem with installation of dependencies, follow bellow steps:
```
docker ps
```
* Now, copy the {container_id} of `managementsys_application`

```
docker exec -it {container_id} ash
```

* You will enter in container ash terminal. So install the dependencies with follow command:

```
yarn
```

* After this, you can exit of container. All dependencies are alredy installed, and the node_modules folder, and package-lock.json + yarn.lock files are generated.

***

## Built with
* [NodeJS](https://nodejs.org/) + [Express](http://expressjs.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [MySQL](https://www.mysql.com/)

***

## Authors

* [Henrique Silva](https://github.com/henrique221/)

## Contributors

See all list of contributors [here](https://github.com/henrique221/management-sys/graphs/contributors).
