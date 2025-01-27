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
5. terminal -> install -> nvm v18.20.5 -> clone backend && frontend repo -> 
6. Frontend:
      --> npm install --> dependencies install
      --> npm run build
      --> sudo apt update(upuntu cmd)
      --> sudo apt install nginx
      --> sudo systemctl start nginx 
      --> sudo systemctl enable
      --> copy code from dist(build files) to /var/www/html (from prod github to nginx http server repostiry)
      --> sudo scp -r  dist/* /var/www/html/
      --> Enable port : 80 of your instance   

   Backend: 
      -->   

      ## nginx
      1. uses reverse proxy - load balancing -> handles al the post
      2. its excepsts only a domain name based on port its automatically maped to that user`