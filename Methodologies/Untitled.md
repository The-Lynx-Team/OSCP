# Linux PrivEsc
## Credential Access
### Re-used passwords
### Credentials from config files
### Credentials from local DBs
### Credentials from bash history
### SSH keys
### Sudo privileges
### Group privileges (Docker, LXD, etc)
## Exploit
### Services running on localhost
### Kernel version
### Binary file versions
#### sudo version
## Misconfiguration
### Cron jobs
#### Writeable cron job
#### Writeable cron job dependecy (File, Python library, etc)
### SUID/SGID files
### Interesting capabilities on binary
### Sensitive files writeable
#### /etc/passwd
#### /etc/shadow
#### /etc/sudoers
#### Configuration files
### Sensitive files readable
#### /etc/shadow
#### /root/.ssh/id_rsa
#### /root/\*
#### env variables
### Writeable PATH
#### Root $PATH writeable
#### Directory in PATH writeable
### LD_PRELOAD set in /etc/sudoers

