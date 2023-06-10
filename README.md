
# Cấu hình cơ bản

## lệnh chạy docker

- chạy docker: 
    > docker-compose up -d
- chạy serve frontend reactjs: 
    > docker exec -itd npm_frontend sh -c "cd /var/www/html/FE && npm start"
- vào bên trong BE: 
    > docker exec -it backend_testweb /bin/sh
- vào bên trong FE: 
    > docker exec -it npm_frontend /bin/sh
- dừng server docker: 
    > docker-compose down# testPV
# testPV
