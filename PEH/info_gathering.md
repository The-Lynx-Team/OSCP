# Information Gathering

First things first, information gathering is key.

## Passive Reconnaissance

### Physical / Social

Location information:

- Satellite images
- Drone recon
- Buildings layout (badge readers, break areas, security, fencing, blueprint)

Job Information:

- Employees (name, job title, phone etc)
- Pictures (badge photos, desk photos, computer photos, etc)

### Web / Host

Target validation:

- whois
- nslookup
- dnsrecon

Finding subdomains:

- Google FU
- dig
- nmap
- sublist3r
- bluto
- crt.sh

Fingerprinting:

- nmap
- wappalyzer
- WhatWeb
- BuiltWith
- netcat (ncat now: there are various versions: socat, ncat, nmap ncat, etc)

Data Breaches:

- HaveIBeenPwned
- BreachParse
- WeLeakInfo

## Identifying Our Target

* Stay in scope, never go out of scope, you'll get legal issues

## Email Gathering with Hunter.io

https://hunter.io/

Account required

Always search for the target domain, you could get:

- Name and surname
- Email
- Job title
- Department
- Email pattern
- Source

## Gathering Breached Credentials with Breach-Parse

https://github.com/hmaverickadams/breach-parse

Automation tool to gather tons of emails:passwords, useful for dictionary generation and spray-attacks.
