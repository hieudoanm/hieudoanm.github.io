---
title: 'Server: nginx'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'Server: nginx'
---

- Reverse Proxy Server
- vs Apache
  - Nginx can serve static resources
  - Nginx is faster
  - Nginx uses URI locations vs Apache uses filesystem locations
- Benefits
  - High Performance
  - Low Resource
- List
  - [Directives](https://nginx.org/en/docs/dirindex.html)
  - [Variables](https://nginx.org/en/docs/varindex.html)
- Websites
  - [nginx.com](https://nginx.org)
  - [nginx.org](https://nginx.com)
  - [Digital Ocean](https://www.digitalocean.com/community/tutorial_collections/how-to-install-nginx)
  - [Wordpress](https://wordpress.org/support/article/nginx/)
- HTTP2
  - Features
    - Binary protocal
    - Compressed Headers
    - Persistent Conections
    - Multiplex Streaming
    - Server Push
  - Explained
    - HTTP1.1: return each html/css/javascript files in different connections
    - HTTP2: return all in one connection
- Secure Protocol
  - SSL: Secure Sockets Layer
  - TCP: Transport Layer Security
- Rate Limit:
  - Security: Brutal Force Protection
  - Reliability: Prevent Traffic Spike
  - Shaping:
- Use `htpasswd` for `auth_basic`
- Hardening
  - Always update
  - Remove unused nginx modules
- [How To Secure Nginx with Let's Encrypt on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)
