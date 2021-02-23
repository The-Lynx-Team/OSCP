# Initial Enumeration

sysenum -> usenum -> netenum -> passhunting

## System Enumeration
### Distribution type & version
```console
cat /etc/issue
cat /etc/*-release
cat /etc/lsb-release		# Debian based
cat /etc/redhat-release	 # Redhat based
```

### Kernel version
```console
cat /proc/version
uname -a
uname -mrs
rpm -q kernel
dmesg | grep Linux
ls /boot | grep vmlinuz-
```

### Environmental Variables
```console
cat /etc/profile
cat /etc/bashrc
cat ~/.bash\_profile
cat ~/.bashrc
cat ~/.bash\_logout
env
set
```

ps aux -> for service running

## User Enumeration
```console
whoami
id
sudo -l
cat  /etc/passwd | cut -d : -f 1 # to cut just usernames
cat /etc/shadow
cat /etc/group
```
## Network enumeration
Lets understand:
1. Hostname and hosts
2. What IP Architecture
3. Open Ports
4. Net services
5. Possible pivoting through different networks
6. Active connections on localhost

### NICs on the system
```console
ifconfig -a
ip -c a
cat /etc/network/interfaces
cat /etc/sysconfig/interfaces
```
### Network configuration settings
What can you find about this network: DHCP, DNS, Gateway, etc?
```console
cat /etc/resolv.conf
cat /etc/sysonfig/network
cat /etc/hosts
hostname
iptables -L
dnsdomainname
arp -a || ip neigh
arp -e
route
route -nee
```

### Is it communincating with somenone else?
```console
lsof -i
lsof -i :80
grep 80 /etc/services
netstat -ano
netstat -antup
netstat -antpx
netstat -tulpn
chkconfig --list
chkconfig --list | grep 3:on
last
w
```
## Password Hunting
```console
# tune this command as your needs are
grep --color=auto -rnw '/' -ie "PASSWORD" --color=always 2> /dev/null 
locate password | more # try pass passwd pwd, just be creative
find / -name authorized_keys || id_rsa 2>/dev/null
```