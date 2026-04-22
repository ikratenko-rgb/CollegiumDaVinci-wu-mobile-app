# Деплой WU Schedule PWA на VPS (Ubuntu 22.04)

## 1. Загрузить файлы на VPS

```bash
# На своей машине — скопировать папку на VPS
scp -r schedule-app/ user@YOUR_VPS_IP:/var/www/wu-schedule
```

Или через git (рекомендую):
```bash
# На VPS
mkdir -p /var/www/wu-schedule
cd /var/www/wu-schedule
# Скопировать все файлы сюда
```

## 2. Установить зависимости

```bash
cd /var/www/wu-schedule
npm install
```

## 3. Установить PM2 (если нет)

```bash
npm install -g pm2
```

## 4. Запустить сервер через PM2

```bash
pm2 start server.js --name wu-schedule
pm2 save
pm2 startup   # чтобы запускался после перезагрузки VPS
```

## 5. Настроить Nginx

```bash
sudo nano /etc/nginx/sites-available/wu-schedule
```

Вставить:
```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/wu-schedule /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 6. HTTPS (обязательно для PWA на iPhone!)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d YOUR_DOMAIN
```

PWA и "Добавить на экран" в Safari работают ТОЛЬКО через HTTPS.
Нужен домен — бесплатно можно взять на freenom.com или noip.com,
или использовать свой если есть.

## 7. Проверка

Открыть https://YOUR_DOMAIN в Safari на iPhone →
Нажать кнопку "Поделиться" (квадрат со стрелкой вверх) →
"На экран «Домой»" → Добавить

## Полезные команды PM2

```bash
pm2 logs wu-schedule    # логи
pm2 restart wu-schedule # перезапуск
pm2 status              # статус
```
