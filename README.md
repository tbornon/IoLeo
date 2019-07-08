# Nécassaire

Pour fonctionner correctement, la plateforme a besoin d'être déployée sur une machine 64 bits (pour la compatibilité de la base de données).  
Les outils qui doivent être installés sur la machine sont :  
1. MongoDB (>=3.0.x)  
2. NodeJS (10.16.0)
3. Nginx
4. Git

Si le déploiement est fait sur RPi, utiliser l'image ARM64 [disponible ici](https://wiki.ubuntu.com/ARM/RaspberryPi)

# Installation

## MongoDB

[Procédure d'installation sur le site de mongo](https://docs.mongodb.com/v3.2/administration/install-on-linux/)
[Pour installation sur un Rapsberry Pi](https://andyfelong.com/2019/03/mongodb-4-0-6-64-bit-on-raspberry-pi-3/)

## NodeJS

[Installation de NodeJS sur Ubuntu/Debian](https://github.com/nodesource/distributions/blob/master/README.md)  
[Autres distributions](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)

## Nginx

```console
apt-get update
apt-get install nginx -y
```

## Git
```console
apt-get update
apt-get install git -y
```

# Configuration
**En tant que root**
## Téléchargement du programme
```
cd /var/www
git clone https://github.com/tbornon/PlatformMKR.git
```

## Installation des dépendances
```
npm i -g pm2
cd /var/www/PlatformMKR/server
npm i
```

## Configuration du réseau
```
cd /var/www/PlatformMKR/confs
cp 50-cloud-init.yaml /etc/netplan -f
netplan apply

ip addr add 192.168.1.3/24 dev eth0
```

## Configuration de Nginx
```
cd /var/www/PlatformMKR/confs
cp platform.conf /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/platform.conf /etc/nginx/sites-enabled
rm /etc/nginx/sites-enabled/default
service nginx restart
```
