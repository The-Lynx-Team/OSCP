# Privilege Escalation Methodology👽
##  Few words before going on
"**Slow is smooth, and smooth is fast**"
Be methodical in what you do or you will get lost. 

Now we are inside the system as a low-privileged user, to obtain an elevated privileged user account we have to find a vector we can use to climb the privileges ladder.

#### Mind map & checklist
We think that the mind map provived by Conda (please, go support him on [his](https://www.youtube.com/channel/UCzK5oAENyQJcnH5SvEquo8A) YouTube channel) is very useful and straightforward. So, we've decided to translate it into this checklist. While the mind map gives you an immediate overview of what you should do, the checklist gives you the possibility to visualize what you already have done.
You can find the mind map created with Obsidian by us here  ![[linux_privesc_mindmap.png]] and the Conda's original one (That is better in term of design) [here](https://github.com/C0nd4/OSCP-Priv-Esc). Go check his playlist on YouTube!, you can find the link under the PrivEsc section inside README.MD ([[README#PrivEsc]])

_**Be aware**: our translation does not completely reflect the Conda's mind map as we added/modified some parts._

## General thoughts to bear in mind
If you are still trying to gain an initial foothold but you can access local files, try to look for firewall's rules. So you won't become mad to figure it out by "brute forcing" the ports for a reverse shell 🙃
## Linux
### Credential Access
- [ ] Try known passwords
- [ ] Search creds from config files (Try different word other the PASSWORD, e.g: pass, passwd, pwd, user, usr, username, secret, cred, credential, auth):
> grep \--color\=auto \-rnw '/' \-ie "PASSWORD" \--color\=always 2> /dev/null
> find . \-type f \-exec grep \-i \-I "PASSWORD" {} /dev/null
> locate password | more
- [ ] Search creds from local DBs
- [ ] Search creds from bash history:
> history
> cat ~/.bash_history
- [ ] Search creds from memory:
> strings /dev/mem \-n10 | grep \-i PASS
- [ ] SSH keys:
> cat ~/.ssh/id_rsa
> ls ~/.ssh/\*
> find / -name authorized_keys 2> /dev/null
> find / -name id_rsa 2> /dev/null
- [ ] Sudo privileges:
> sudo -l
- [ ] Group:
> id
> groups

### Exploit
- [ ] Services running on localhost are vulnerable?
> ps aux
> ps aux | grep root
- [ ] Kernel version,  is it vulnerable?
> uname -a
> (cat /proc/version || uname -a ) 2>/dev/null
> lsb_release -a 2>/dev/null
- [ ] Binary file versions, vulnerable?
> sudo -V

### Misconfiguration
- [ ] Cron job -> check for write permissions on the following files:
> /etc/init.d
> /etc/cron\*
> /etc/crontab
> /etc/cron.allow
> /etc/cron.d 
> /etc/cron.deny
> /etc/cron.daily
> /etc/cron.hourly
> /etc/cron.monthly
> /etc/cron.weekly
> /etc/sudoers
> /etc/exports
> /etc/anacrontab
> /var/spool/cron
> /var/spool/cron/crontabs/root
> crontab \-l
> ls \-alh /var/spool/cron;
> ls \-al /etc/ | grep cron
> ls \-al /etc/cron\*
> cat /etc/cron\*
> cat /etc/at.allow
> cat /etc/at.deny
> cat /etc/cron.allow
> cat /etc/cron.deny\*
- [ ] Writeable cron job dependecy (File, Python library, etc)
- [ ] Find SUID:
> find / -perm -4000 -type f -exec ls -la {} 2>/dev/null \\;
> find / -uid 0 -perm -4000 -type f 2>/dev/null
- [ ] Check SUID on [GTFOBins](https://gtfobins.github.io/)
- [ ] Create SUID:
```bash
print 'int main(void){\\nsetresuid(0, 0, 0);\\nsystem("/bin/sh");\\n}' \> /tmp/suid.c   
gcc -o /tmp/suid /tmp/suid.c  
sudo chmod +x /tmp/suid # execute right
sudo chmod +s /tmp/suid # setuid bit
```
- [ ] SGID:
> find / -perm -g=s -type f 2>/dev/null
> find / -perm +2000 -user root -type f -print
- [ ] Interesting capabilities on binary
- [ ] Any accessible sensitive file?
	- [ ] /etc/passwd
	- [ ] /etc/shadow
	- [ ] /etc/sudoers
	- [ ] Configuration files
	- [ ] /root/.ssh/id_rsa
	- [ ] entire root folder
	- [ ] Check env info
	 > (env || set) 2>/dev/null
	 > echo $PATH
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
### Credential Access
### Exploit
### Misconfiguration