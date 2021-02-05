Information Gathering

First things firts, information gathering is key.

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

## Hunting Subdomains

Very important phase!
You can't attack/defend what you are not aware of!

### Sublist3r

https://github.com/aboul3la/Sublist3r

```bash
> apt install sublist3r
```

### crt.sh

https://crt.sh/

For certificate information gathering, we will find also subdomains and every information that we could find inside a SSL/TLS Certificate.

### Amass

https://github.com/OWASP/Amass

Very big tool for information gathering:

| DNS          | Brute forcing, Reverse DNS sweeping, NSEC zone walking, Zone transfers, FQDN alterations/permutations, FQDN Similarity-based Guessing |
| ------------ | ------------------------------------------------------------ |
| Scraping     | Ask, Baidu, Bing, BuiltWith, DNSDumpster, HackerOne, RapidDNS, Riddler, SiteDossier, ViewDNS, Yahoo |
| Certificates | Active pulls (optional), Censys, CertSpotter, Crtsh, FacebookCT, GoogleCT |
| APIs         | AlienVault, Anubis, BinaryEdge, BufferOver, C99, CIRCL, Cloudflare, CommonCrawl, DNSDB, GitHub, HackerTarget, Mnemonic, NetworksDB, PassiveTotal, Pastebin, RADb, ReconDev, Robtex, SecurityTrails, ShadowServer, Shodan, SonarSearch, Spyse, Sublist3rAPI, TeamCymru, ThreatBook, ThreatCrowd, ThreatMiner, Twitter, Umbrella, URLScan, VirusTotal, WhoisXML, ZETAlytics, ZoomEye |
| Web Archives | ArchiveIt, LoCArchive, UKGovArchive, Wayback                 |



## Identifying Website Technologies

### BuiltWith

https://builtwith.com/

it's a website (there's a browser plugin too) that harvest every block that compose the website. It's useful to understand how the website is built, then how we can profile the attack tree.

### Wappalyzer

https://www.wappalyzer.com/

Less active then BuiltWith, but it offers a cleaner output, so for that could be more useful then BuiltWith.

### WhatWeb

https://github.com/urbanadventurer/WhatWeb

From the GitHub repo:

```
WhatWeb identifies websites. Its goal is to answer the question, "What is that Website?". WhatWeb recognises web technologies including content management systems (CMS), blogging platforms, statistic/analytics packages, JavaScript libraries, web servers, and embedded devices. WhatWeb has over 1800 plugins, each to recognise something different. WhatWeb also identifies version numbers, email addresses, account IDs, web framework modules, SQL errors, and more.
```

It shows more granular information.

**The combination of more tools is the best way to get more precise information.**

## Information Gathering with Burp Suite

https://portswigger.net/burp

Burp is an http proxy so with it we can capture the HTTP traffic and play with it.

It's very useful for webapp pentesting. An alternative is ZAP proxy.

## Google Fu

It's hacker's best friend.

Not your kind of google everyday engine.

https://www.exploit-db.com/google-hacking-database

## Utilizing Social Media

Social media are the go-to OSINT sources.
