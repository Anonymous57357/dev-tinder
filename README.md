# dev-tinder

# dev-tinder

# dev-tinder

# dev-tinder-frontend

## GDL Namaste Node JS S03

# S03E02 Nginx & Backend Node App Deployment

# Deployment

1. First create a aws accound and redirect console
2. go to Ec2
3. instances
4. Launch a instances
5. Name -> quickstart (ubuntu) -> Amazon Machine Image (AMI) -> instance type (auto) (free) -> create a key pair (and download .pem file) -> launch a instance --> instance id -> connect -> SSH client -> open terminal -> change permission .pem file ->
6. terminal -> install -> nvm v18.20.5 -> clone backend && frontend repo ->
7. Frontend:
   --> npm install --> dependencies install
   --> npm run build
   --> sudo apt update(upuntu cmd)
   --> sudo apt install nginx
   --> sudo systemctl start nginx
   --> sudo systemctl enable
   --> copy code from dist(build files) to /var/www/html (from prod github to nginx http server repostiry)
   --> sudo scp -r dist/\* /var/www/html/
   --> Enable port : 80 of your instance

# pm2 commands

- pm2 log - to get log
- pm2 flush name of the log (npm) - flush the log
- pm2 list
- pm2 start name
- pm2 stop name
- pm2 delete name
- pm2 start --name "name" npm -- start

  Backend:
  --> same lime the above process
  --> Enable port :8000 or whatever your localhost running
  --> allowed ec2 instance public ip on mongoDB server
  --> npm install pm2 -g
  --> pm2 start npm -- start
  --> pm2 log

# frotend

http://13.60.215.91/

# backend

http://13.60.215.91:8000

domain name = http://13.60.215.91 -> devtinder.com

frontend -> devtinder.com
backend -> devtinder.com:8000

=> before running 8000/feed => nginx proxy can front roll on /api =>
devtinder.com/api => map to devtinder.com:8000/feed

nginx config

# proxy path

=> /etc/nginx/sites-available/default

location /api {
proxy_pass http://localhost:8000/;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}

      ## nginx
      1. uses reverse proxy - load balancing -> handles al the post
      2. its excepsts only a domain name based on port its automatically maped to that user`

=> sudo nginx -t
=> sudo systemctl reload nginx
=> modify the frontend BASEURL in the project to "/api"

frontend take first ip addres / backend in second


-> whenever the changes happe in the frontend make sure create a new build and copy and push to nginx server
