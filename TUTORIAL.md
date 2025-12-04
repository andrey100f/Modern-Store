# Secure Local Reverse Proxy with NGINX, SSL Certificates, and Windows Hosts

This document explains how to configure a secure local environment using:
* NGINX reverse proxy
* Custom SSL certificates (CA + CSR workflow)
* Windows hosts file
* Angular + Spring Boot services behind HTTPS

## 1. Windows Hosts Setup
* Edit hosts file: `C:\Windows\System32\drivers\etc\hosts`
* Add: `127.0.0.3 modern-store.local`

## 2. Create a Local Certificate Authority (CA)
* Generate CA private key: `openssl genrsa -aes256 -out ca-key.pem 4096`
* Generate CA certificate: `openssl req -new -x509 -sha256 -days 365 -key ca-key.pem -out ca.pem`

## 3. Create SSL Certificate for modern-store.local
* Generate server key: `openssl genrsa -out cert-key.pem 4096`
* Generate CSR: `openssl req -new -sha256 -subj "/CN=modern-store.local" -key cert-key.pem -out cert.csr`
* extfile.cnf:
```
subjectAltName=DNS:modern-store.local,IP:127.0.0.3
extendedKeyUsage=serverAuth
```

* Generate signed certificate: `openssl x509 -req -sha256 -days 365 -in cert.csr -CA ca.pem -CAkey ca-key.pem -out cert.pem -extfile extfile.cnf -CAcreateserial`

## 4. Trust the CA in Windows
`Import-Certificate -FilePath "ca.pem" -CertStoreLocation Cert:\LocalMachine\Root`

## 5. NGINX Configuration
Example nginx.conf:
```
events {}

http {
    server {
        listen 127.0.0.3:443 ssl;

        server_name modern-store.local;

        ssl_certificate     ssl/cert.pem;
        ssl_certificate_key ssl/cert-key.pem;

        location /api/ {
            proxy_pass http://localhost:8080/api/;
        }

        location / {
            proxy_pass http://localhost:4200/;
            proxy_set_header Host $host;
        }
    }

    server {
        listen 127.0.0.3:S default_server;
        server_name modern-store.local;
        return 301 https://$server_name$request_uri;
    }
}

```

## 6. Running NGINX
* Start: `./nginx.exe`

## 7. Test
Make sure the backend and frontend servers are running and open:
* https://modern-store.local
* https://modern-store.local/api/products
