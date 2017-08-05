# NovoWashUi
Ui portion for novowash

Instructions
# To run this code, install nginx in your system. and change root path in file /etc/nginx/sites-available/default.
      like -- server {
	                    listen 80 default_server;
	                    listen [::]:80 default_server ipv6only=on;  
	                    root /home/manishkm/NovoWashProject/NovoWashUI/public; # CHANGE your path
	                    index index.html index.htm;
                      .............. SO ON.
              
(1) write all css code in  public/sass/style.scss file .
(2) to compile sass run command
          "grunt build". 
    this command copy all compiled css in to /public/css/style.css file which is imported in index.html file.
    
(3) run project in brower through http://localhost/#/home
