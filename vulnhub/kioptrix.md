
# Kioptrix notes

## 1 RECON
nmap -sS -sV -p- -Pn -T4 -vv -oN allPorts.txt 192.168.154.3
PORT      STATE SERVICE     REASON         VERSION
22/tcp    open  ssh         syn-ack ttl 64 OpenSSH 2.9p2 (protocol 1.99)
80/tcp    open  http        syn-ack ttl 64 Apache httpd 1.3.20 ((Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b)
111/tcp   open  rpcbind     syn-ack ttl 64 2 (RPC #100000)
139/tcp   open  netbios-ssn syn-ack ttl 64 Samba smbd (workgroup: MYGROUP)
443/tcp   open  ssl/https   syn-ack ttl 64 Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
32768/tcp open  status      syn-ack ttl 64 1 (RPC #100024)

## 2 ENUMERATION
### Services
#### Web
Port: 80/443
Webserver: Apache/1.3.20 (Unix)  (Red-Hat/Linux) mod_ssl/2.8.4 OpenSSL/0.9.6b
Known vulnerabilities:
- https://www.cvedetails.com/vulnerability-list/vendor_id-45/product_id-66/version_id-5146/Apache-Http-Server-1.3.20.html
- https://www.exploit-db.com/exploits/764
- https://github.com/heltonWernik/OpenLuck (Interesting)

##### Fuzzing directories:
gobuster dir -w /usr/share/wordlists/dirbuster/directory-list-2.3-small.txt -u http://192.168.154.3

/manual (Status: 301)
/usage (Status: 301)
/mrtg (Status: 301)

#### SMB
Port: 139
Samba version: 2.2.1a
Known vulnerabilities:
- https://www.rapid7.com/db/modules/exploit/linux/samba/trans2open/ (**Gonna use this one)
- https://www.exploit-db.com/exploits/10

Shares:
- IPC$
- ADMIN$

### SSH
Port: 22
Version: OpenSSH 2.9p2 (protocol 1.99)
Known vulnerabilities: 
- https://www.cvedetails.com/vulnerability-list/vendor_id-97/product_id-585/version_id-6040/Openbsd-Openssh-2.9p2.html

#### SNMP
#### TCP
#### UDP
#### Other
## 3 EXPLOITATION
Used the Apache known exploit

### 4 POST EXPLOITATION
Once inside as apache user, grabbed the ptrace-kmod.c from the attacker's machine
### File system information
### Installed application
### Network
### Running processes
### Scheduled job/task
### System exploitation
### Users and groups

## 5 PRIVELEGES ESCALATION

## 6 HIGH VALUE INFORMATION



