# Reconnaissance Enumeration Methodology🛠
## General
- [ ] add host to your /etc/hosts if you already know its name
- [ ] rever the machine
## Banner grabbing
- [ ] nc -v \<TARGET\> \<PORT\>
- [ ] telnet \<TARGET\> \<PORT\>
## Network scanning
If you don't know the alive hosts,  you can scan the full subnet to find them, so you can do a deeper scan on them later.
### Go big
- [ ] nmap -sn 10.x.x.x.x
- [ ] nmap -sL 10.x.x.x.x
- [ ] nbtscan -r 10.x.x.x.x
- [ ] netdiscover -r 10.x.x.x/24
- [ ] smbtree
### Go small (Individual host scanning)
- [ ] nmap -v --dns-server *DNS* -sV --reason -O --open -Pn \<TARGET\>
- [ ] nmap -sV --reason -O -p- \<TARGET\>
- [ ] nmap -sU -sV \<TARGET\>
- [ ] nmap -sV -v -n --script vuln \<TARGET\>
- [ ] nmap --script ssl-heartbleed \<TARGET\>

## Service enumeration
### FTP - TCP Port 21
- [ ] Banner grabing: telnet \<TARGET\> 21 
- [ ] Check for common exploits 
- [ ] Run command ftp \<TARGET\>
- [ ] Check for anonymous access
- [ ] Any known vulnerabilty?
> nmap –script ftp-anon,ftp-bounce,ftp-libopie,ftp-proftpd-backdoor,ftp-vsftpd-backdoor,ftp-vuln-cve2010-4221,tftp-enum -p 21 \<TARGET\>
- [ ] Default credentials check
> hydra -s \<PORT\> -C usr/share/wordlists/ftp-default-userpass.txt -u -f \<TARGET\> ft  
### SSH (22)
```console
> ssh <TARGET> 22
```
### SMTP - TCP Port 25
- [ ] nmap –script smtp-commands,smtp-enum-users,smtp-vuln-cve2010-4344,smtp-vuln-cve2011-1720,smtp-vuln-cve2011-1764 -p 25 \<TARGET\>
- [ ] nc -nvv \<TARGET\>
- [ ] manual testing with **telnet** and VRFY / EXPN
### Finger (79)
Download script and run it with a wordlist: [http://pentestmonkey.net/tools/user-enumeration/finger-user-enum](http://pentestmonkey.net/tools/user-enumeration/finger-user-enum)
### Web App (80/443)
- [ ] Investigate SSL/TLS cert details for further information
- [ ] Investigate robots.txt
- [ ] View source code
- [ ] Nikto
- [ ] Directory Traversal Fuzzer
	- [ ] Gobuster (**Doesn't work recursively!!!**)
		- [ ] File and directory fuzzing
		- [ ] Vhost bruteforcing
		- [ ] use -x to look for specific extensions (.txt, .php, .bak, .cfg, .json, .md, .git)
		- [ ] nothing? Ensure that you scan the correct protocol (HTTP/HTTPS) and directory
		- [ ] gobuster -w /usr/share/seclists/Discovery/Web-Content/common.txt -s '200,204,301,302,307,403,500' -t 50 -e -u \<TARGET\>
		- [ ] gobuster -w /usr/share/seclists/Discovery/Web-Content/CGIs.txt -s '200,204,403,500' -e -t 50 -u \<TARGET\>/cgi-bin
		- [ ] Re-run for each directory found
	- [ ] wfuzz
	- [ ] dotdotpwn
- [ ] Which CMS is running?
	- [ ] whatweb
	- [ ] wpscan
	- [ ] joomscan
	- [ ] drupwn
	- [ ] use nmap to enumerates installed Drupal themes/modules
	> nmap -p 80 --script http-drupal-enum <\TARGET\>
- [ ] WebDAV:
	- [ ] davtest
	- [ ] cadevar
	- [ ] Use nmap to detect WebDAV installations & listings:
	> nmap --script http-webdav-scan -p80,8080 \<TARGET\>
- [ ] LFI / RFI test
- [ ] cgi-bin found? try shellshock [https://www.exploit-db.com/exploits/34900](https://www.exploit-db.com/exploits/34900)
- [ ] Check every input field for SQLi
	- [ ] Cheat sheet 1 [https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md)
	- [ ] Cheat sheet 2 [https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md) or [https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/  
](https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/)
- [ ] Check for code injection: [Owasp code injection](https://owasp.org/www-community/attacks/Code_Injection)
### DNS (Port 53)
- [ ] Resolve DNS
> host website.com
> nslookup website.com
- [ ] whois
- [ ] Is DNS zone transfer possible?
> host -l domain.name dns.server
> dig axfr @dns-server domain.name
- [ ] dnsrecon -d \<TARGET\> -D /usr/share/wordlists/dnsmap.txt -t std --xml ouput.xml

###  POP (Port 110)
- [x] Is username enumeration possible?
- [x] Try nmap -script pop3-brute \<TARGET\> -p 110 -v
- [x] telnet \<TARGET\> 110
	- LIST - once logged in list messages
	- RETR \<MSG NUMBER\> - retrieve message
	- QUIT

### RPCBind (111)
- [ ] rpcinfo -p \<TARGET\>

### SMB/RPC (Port 139/445)
- [ ] nmap -script smb-protocols
- [ ] nmap -n -p 139,445 -v --script smb-vuln* -oA nmap/smb-vulns  \<TARGET\>
- [ ] nmap -script smb-os-discovery.nse –script-args=unsafe=1 -p445 \<TARGET\>
- [ ] nmap -script smb-check-vulns.nse –script-args=unsafe=1 -p445 \<TARGET\>
- [ ] nmap -script smb-enum-shares.nse –script-args=unsafe=1 -p445 \<TARGET\>
- [ ] nmap -script smb-enum-users.nse –script-args=unsafe=1 -p445 \<TARGET\>
- [ ] nbtscan
- [ ] enum4linux
- [ ] Manual browsing (Prefer it whenever possible):
> smbclient -L INSERTIPADDRESS
> smbclient //INSERTIPADDRESS/tmp
> smbclient \\\\INSERTIPADDRESS\\ipc$ -U john
> smbclient //INSERTIPADDRESS/ipc$ -U john
> smbclient //INSERTIPADDRESS/admin$ -U john
> winexe -U username //INSERTIPADDRESS "cmd.exe" --system

### SNMP (161)
- [ ] snmpwalk -c public -v1 \<TARGET\> 
- [ ] snmpcheck -t \<TARGET\> -c public
- [ ] onesixtyone -c names -i hosts
- [ ] nmap -sT -p 161 -v -oA nmap/snmap_results \<TARGET\>
- [ ] snmpenum -t \<TARGET\>


### MSSQL
- [ ] Password bruteforcing
> hydra -l \<USERNAME\> -P /usr/share/seclists/Passwords/darkweb2017-top10000.txt \<TARGET\> -s \<PORT\> -t 5 mssql
> hydra -s \<PORT\> -C ./wordlists/mssql-default-userpass.txt -u -f \<TARGET\> mssql
> medusa -h \<TARGET\> -M mssql -u sa -P /usr/share/seclists/Passwords/darkweb2017-top1000.txt -e ns -F -t 5
- [ ] Any known vulnerability?
> nmap -vv -sV -Pn -p \<PORT\> --script=ms-sql-info,ms-sql-config,ms-sql-dump-hashes --script-args=mssql.instance-port=%s,smsql.username-sa,mssql.password-sa \<TARGET\>


### Oracle (1521)
-  [ ] Default credentials
> hydra -s \[PORT\] -C ./wordlists/oracle-default-userpass.txt -u -f \<TARGET\>
- [ ] tnscmd10g version -h \<TARGET\>
- [ ] tnscmd10g status -h \<TARGET\>
- [ ] **oracle-version** \- MSF module which scans Oracle DB to find the version
> msfcli auxiliary/scanner/oracle/tnslsnr\_version rhosts=\<TARGET\> E
- [ ] **oracle-sid** \- MSF module to enumerate the Oracle DB SID
> msfcli auxiliary/scanner/oracle/sid\_enum rhosts=\<TARGET\> E

### MySQL (3306)
- [ ] Default credentials?
> hydra -s \<PORT\> -C usr/share/wordlists/mysql-default-userpass.txt -u -f \<TARGET\> mysql
- [ ] Any known vulnerability?
> nmap -sV -Pn -vv -p 3306 --script mysql-audit,mysql-databases,mysql-dump-hashes,mysql-empty-password,mysql-enum,mysql-info,mysql-query,mysql-users,mysql-variables,mysql-vuln-cve2012-2122 \<TARGET\>
### RDP (3389)
- [ ] Use rpd-sec-check to enumerate security settings:
> perl ./scripts/rdp-sec-check.pl \<TARGET\>:\<ORT\>
- [ ] Use ncrack to brute force RDP:
> ncrack -vv --user administrator -P /user/share/wordlists/rockyou.txt rdp://<\TARGET\>
### LDAP (389)
- [ ]  LDAPSearch can be utilized to locate and retrieve directory entries
	> ldapsearch -h \[IP\] -p \[PORT\] -x -s base

### Image File Investigation
- [ ] Always use wget for downloading files to keep original timestamps and file information
- [ ] Use binwalk and strings to check image files for hidden content
- [ ] steghide

### NFS Share
- [ ] Show NFS shares
> showmount -e \<TARGET\> \<PORT\>


### Linux/Windows
- [ ] smbclient -L //\<TARGET\>
- [ ] rpcinfo
- [ ] enum4linux


### Packet inspection
- [ ] Wireshark
- [ ] tcpdump tcp port \<PORT\> -w output.pcap -i \<INTERFACE\>


### Anything else
- [ ] nmap scripts (locate *nse* | grep servicename)
- [ ] hydra
- [ ]  MSF auxiliary modules
- [ ]  Download the software and investigate it locally
- [ ]  Try enumeration scripts for specific services

