# Methodology🛠

## General
[[subnet1/host2/2. enumeration service]]
- [x] add host to your /etc/hosts if you already know its name
- [ ] rever the machine

## Network scanning
- [ ] nmap -sn 10.x.x.x.x
- [ ] nmap -sL 10.x.x.x.x
- [ ] nbtscan -r 10.x.x.x.x
- [ ] smbtree

## Individual host scanning
- [ ] nmap -v --dns-server < DNS > -sV --reason -O --open -Pn < TARGET >
- [ ] nmap -sV --reason -O -p- < TARGET >
- [ ] nmap -sU -sV < TARGET >
- [ ] nmap -sV -v -n --script vuln < TARGET >
- [ ] nmap --script ssl-heartbleed < TARGET >

## Service enumeration
### FTP - TCP Port 21
- [ ] Banner grabing: telnet < TARGET > 21 
- [ ] Check for common exploits 
- [ ] Run command ftp < TARGET >
- [ ] Check for anonymous access 

### SMTP - TCP Port 25
- [ ] nmap -v -n -sV --script smtp-enum-users.nse -p 25 < TARGET >
- [ ] anual testing with telnet and VRFY / EXPN 

	
	