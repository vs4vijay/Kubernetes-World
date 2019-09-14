# Kubernetes World

## Installation

`npm install`



## Create DB User

```
CREATE DATABASE viz_db;

CREATE USER 'viz'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

GRANT ALL PRIVILEGES ON viz_db.* TO 'viz'@'%';

FLUSH PRIVILEGES;
```


## Running

### Run without Docker

- `node app.js`
- `nodemon app.js`

### Run with Docker

- `docker build -t kube-world .`
- `docker run -p 9999:9999 kube-world`

### Run with Kubernetes

- `brew install kubernetes-cli`
- `brew cask install minikube`
- `minikube start`


## Contribution
- `docker build -t vs4vijay/kube-world .`
- `docker login`
- `docker push vs4vijay/kube-world`


## Kubernetes Flow

```

kubectl run kube-world --replicas=1 --labels="run=kube-world" --image=vs4vijay/kube-world --port=9999

OR

kubectl apply -f secret.yml
kubectl create -f deploy/service.yml
kubectl create -f deploy/deployment.yml
minikube ip


```



## To Do

- [x] Basic Node + Express + DB App
- [x] Dockerize
- [ ] Run as non-root user
  - [ ] Multistage Build
- [ ] Kubernetes
- [ ] Deploy to Cloud
- [ ] nginx
- [ ] Code
  - [ ] Connection Pooling
  - [ ] Validation and Error Frameworks
  - [ ] Enhance the code structure and decouple



## Development Notes

```


 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));

 mysql.createPool({
  connectionLimit : 10,
  ...
 })

  connection.release();


  query.sql


- npm ci --only=production


docker system prune -a


https://expressjs.com/en/api.html#router.param

brew install bash-completion

    source <(kubectl completion bash)


    docker pull mysql/mysql-server:latest

    docker logs -- check logs for pwd

    docker ps -a -q

    COPY --from=0 /app .

    NODE_ENV



kubectl describe pod <name>


livenessProbe

resources:
      limits:
        cpu: "1"
      requests:
        cpu: "0.5"


        helm

kubectl get secret

kubectl describe secret kube-world-secrets

```