start powershell -NoExit node bin/www
start powershell -NoExit sass --watch public/sass:public/css
start powershell -NoExit mongod --dbpath "F:\Proj\db"
::sass 配置文件:F:\tool\ruby-2.2.6-i386-mingw32\lib\ruby\gems\2.2.0\gems\sass-3.4.23\lib\sass\engine.rb
::添加 Encoding.default_external = Encoding.find('utf-8');