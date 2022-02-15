```bash
████████╗██╗  ██╗███████╗     ██╗  ██╗   ██╗███╗   ██╗██╗  ██╗    ████████╗███████╗ █████╗ ███╗   ███╗
╚══██╔══╝██║  ██║██╔════╝     ██║  ╚██╗ ██╔╝████╗  ██║╚██╗██╔╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
   ██║   ███████║█████╗       ██║   ╚████╔╝ ██╔██╗ ██║ ╚███╔╝        ██║   █████╗  ███████║██╔████╔██║
   ██║   ██╔══██║██╔══╝       ██║    ╚██╔╝  ██║╚██╗██║ ██╔██╗        ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║
   ██║   ██║  ██║███████╗     ███████╗██║   ██║ ╚████║██╔╝ ██╗       ██║   ███████╗██║  ██║██║ ╚═╝ ██║
   ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚══════╝╚═╝   ╚═╝  ╚═══╝╚═╝  ╚═╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  
			       ---- lynxes just wanna have fun ----
```
# OSCP
We maintain this repo with the aim to gather all the info that we’d found useful and interesting for the OSCP. We also collect material from other resources (websites, courses, blogs, git repos, books, etc).

**Before continue**: we are still working on this repo as we go on with our OSCP journey. This means we'll add or remove parts without giving notice. Furthermore, this is not intended to be a comprehensive repo, cross-reference and information gathering are your friends.

## TOC
- [How to navigate the repo](#how-to-navigate-the-repo)
- [Official Offensive Security references](#official-offensive-security-references)
- [Blog](#blog)
- [Reddit](#reddit)
- [GitHub repos](#github-repos)
- [Webbing](#webbing)
- [Genereal useful resources](#genereal-useful-resources)
- [Buffer Overflow](#buffer-overflow)
- [Active Directory](#active-directory)
- [PrivEsc](#privesc)
- [Methodologies](#methodologies)
- [Automation scripts](#automation-scripts)
- [Tools](#tools)
- [Cheat sheets](#cheat-sheets-and-wordlists)
- [Gamified Learning](#gamified-learning)
- [Reporting](#reporting)
- [Mental and Physical Health](#mental-and-physical-health)

## How to navigate the repo
The repo is structured by this way:
```bash
|── Box template
├── Methodologies
├── README.md
└── troubleshooting.md
```
* **Box template**: here you can see how we organize our work flow
* **Methodologies**: here you can find a checklist for each phase (recon/enum, postexploit, privesc, etc)
* **README**: where you can find a list of useful links
* **troubleshooting.md**: is a ledger to record all the tecnhical issues:solution we have found along the way

_**Be aware**: we use  [Obsidian](https://obsidian.md/) as note taking application. This justifies the directory structure and how we format files.
We think the graph view provided by Obsidian is a pleasant way to have a visual view of the data we gather. So if you use our checklists, we suggest you run them on Obsidian for a better experience._

## Official Offensive Security References
- [**OSCP Exam Change**](https://www.offensive-security.com/offsec/oscp-exam-structure/)
- [Exam Guide](https://help.offensive-security.com/hc/en-us/articles/360040165632-OSCP-Exam-Guide)
- [Try Harder: From mantra to mindset](https://www.offensive-security.com/offsec/what-it-means-to-try-harder/)
- [Proctored Exam Information](https://help.offensive-security.com/hc/en-us/sections/360008126631)
- [Proctoring Tool Student Manual](https://help.offensive-security.com/hc/en-us/articles/360050299352)
- [Upload Exam Report](https://upload.offsec.com/)
- [Student Forum](https://forums.offensive-security.com/)
- [Help Center](https://help.offensive-security.com/hc/en-us/categories/360002666252-General-Frequently-Asked-Questions-FAQ-)

## Blog
- [OSCP: wirzka's two cents](https://andreagrigoletto.com/posts/oscp/)
- [the-oscp-preperation-guide-2020](https://johnjhacking.com/blog/the-oscp-preperation-guide-2020/)
- Luke’s Ultimate OSCP Guide ([Part 1](https://medium.com/@hakluke/haklukes-ultimate-oscp-guide-part-1-is-oscp-for-you-b57cbcce7440), [Part 2](https://medium.com/@hakluke/haklukes-ultimate-oscp-guide-part-2-workflow-and-documentation-tips-9dd335204a48), [Part 3](https://medium.com/@hakluke/haklukes-ultimate-oscp-guide-part-3-practical-hacking-tips-and-tricks-c38486f5fc97))
- [TJNulls' preparation guide for PWK OSCP](https://www.netsecfocus.com/oscp/2019/03/29/The_Journey_to_Try_Harder-_TJNulls_Preparation_Guide_for_PWK_OSCP.html)
- [Abatchy: How to prepare for PWK/OSCP, a noob-friendly guide](https://www.abatchy.com/2017/03/how-to-prepare-for-pwkoscp-noob)
- [5 Tips for OSCP Prep](https://medium.com/bugbountywriteup/5-tips-for-oscp-prep-76001cdf4f4f)
- [BIG resource list](https://backdoorshell.gitbooks.io/oscp-useful-links/content/chapter1.html)
- [Tip for succes in PWK OSCP](https://www.mjkranch.com/2019/06/tips-for-success-in-pwk-oscp/)
- [My OSCP experience](https://refabr1k.github.io/learning/post-My-OSCP-Experience/)
- [Path to OSCP](https://localhost.exposed/path-to-oscp/)
- [Offensive Security Certified Professional – Lab and Exam Review](https://theslickgeek.com/oscp/)
- [My Fight for the OSCP](https://alphacybersecurity.tech/my-fight-for-the-oscp/)
- [Passing the OSCP while working full time](https://medium.com/@galolbardes/passing-the-oscp-while-working-full-time-29cb22d622e0)
- [Not your standard OSCP guide](https://blog.thehackingnomad.com/)
- [How to pass the OSCP in 30 days.](https://achrafj.medium.com/how-to-pass-the-oscp-in-30-days-dc9207d09f2b)
- [Unofficial OSCP Approved Tools](https://falconspy.medium.com/unofficial-oscp-approved-tools-b2b4e889e707)

## Reddit
- [First Attempt ... Discouraged](https://www.reddit.com/r/oscp/comments/l7x5gq/first_attempt_discouraged/)
- [1 attempt 1 fail with 55 points](https://www.reddit.com/r/oscp/comments/l5sett/1_attempt_1_fail_with_55_points/)
- [Failed the OSCP - any tips for the next attempt?](https://www.reddit.com/r/netsecstudents/comments/5fwc1z/failed_the_oscp_any_tips_for_the_next_attempt/danovo5/)
- [Tips for passing the exam](https://www.reddit.com/r/oscp/comments/9j6q7d/tips_for_passing_the_exam/)
- [1st attempt, 80+ points. My experience and some unpopular opinions inside.](https://www.reddit.com/r/oscp/comments/la1kxe/1st_attempt_80_points_my_experience_and_some/)
- [First cert, first try, unconventional approach](https://www.reddit.com/r/oscp/comments/l41dxe/first_cert_first_attempt_an_unconventional/)
- [How Offensive Security Saved My Life - An OSCP Journey](https://www.reddit.com/r/oscp/comments/lc3937/how_offensive_security_saved_my_life_an_oscp/)
- [Unmotivated in ctfs](https://www.reddit.com/r/oscp/comments/l9dm4z/unmotivated_in_ctfs/)
- [Need help to prepare OSCP Checklist](https://www.reddit.com/r/oscp/comments/l95y1z/need_help_to_prepare_oscp_checklist/)
- [Preparing for 4th attempt](https://www.reddit.com/r/oscp/comments/l90f1q/preparing_for_4th_attempt/)
- [Second Attempt Failure](https://www.reddit.com/r/oscp/comments/la0xzk/second_attempt_failure/)
- [Access to machines for report writing?](https://www.reddit.com/r/oscp/comments/lbntjv/access_to_machines_for_report_writing/)
- [OSCP Practical Advice for Success](https://www.reddit.com/r/oscp/comments/m29gx4/oscp_practical_advice_for_success/)
- [Failed this morning, a feels dump](https://www.reddit.com/r/oscp/comments/m9bsxf/failed_this_morning_a_feels_dump/?utm_source=amp&utm_medium=&utm_content=tp_title)
- [Proving Grounds Practice Review](https://www.reddit.com/r/oscp/comments/mceeqy/proving_grounds_practice_review/)

## GitHub repos
- [Awesome OSCP](https://github.com/The-Lynx-Team/awesome-oscp)
- [Enumeration wikis](https://github.com/theonlykernel/enumeration/wiki)
- [PimpMyKali](https://github.com/Dewalt-arch/pimpmykali)
- [ConPtyShell - Fully Interactive Revese Shell for Windows](https://github.com/antonioCoco/ConPtyShell)

## Webbing
### General
- [Web vulnerabilities to gain access to the system](https://www.exploit-db.com/papers/13017)
- [Basic Shellshock Exploitation](https://blog.knapsy.com/blog/2014/10/07/basic-shellshock-exploitation/)

### Playing with SQL
- [NetSPI SQL Injection Wiki](https://sqlwiki.netspi.com/)
- [Full MSSQL Injection PWNage](https://www.exploit-db.com/papers/12975)
- [MySQL Error Based SQL Injection Using EXP](https://www.exploit-db.com/docs/english/37953-mysql-error-based-sql-injection-using-exp.pdf)

### Microsoft IIS resources
##### Official documentation
- [Understanding Sites, Applications, and Virtual Directories on IIS 7](https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/understanding-sites-applications-and-virtual-directories-on-iis)
##### Other interesting stuff
- [Uploading web.config for Fun and Profit 2 by @irsdl](https://soroush.secproject.com/blog/2019/08/uploading-web-config-for-fun-and-profit-2/)
- [IIS Application vs. Folder Detection During Blackbox Testing by @irsdl](https://soroush.secproject.com/blog/2019/07/iis-application-vs-folder-detection-during-blackbox-testing/)
## Genereal useful resources
- [Explain shell](https://explainshell.com/)
- [Powershell basics](https://www.darkoperator.com/powershellbasics)
- [Pentest Tips and Tricks](https://jivoi.github.io/2015/07/01/pentest-tips-and-tricks/)
- [Big list with tips, tricks and cheat sheets](https://guif.re/)
- [How to PASS the OSCP Exam - You're probably not preparing like you should be!](https://www.youtube.com/watch?v=eLNYc-1ScdU)

## Buffer Overflow
- [Do Stack Bufferoverflow Good](https://github.com/justinsteven/dostackbufferoverflowgood)
- [OSCP Prep - x86 Windows Stack-Based Buffer Overflow Full Tutorial - War-FTP 1.65](https://www.youtube.com/watch?v=Z2pQuGmFNrM)
## Active Directory
- [Attacking Active Directory: 0 to 0.9](https://zer1t0.gitlab.io/posts/attacking_ad/?s=09)
- [Stealthbits Attack Catalog](https://attack.stealthbits.com/)
- [Cheat Sheet - Attack Active Directory](https://github.com/drak3hft7/Cheat-Sheet---Active-Directory)
- [Active Directory Kill Chain Attack & Defense](https://github.com/infosecn1nja/AD-Attack-Defense)
- [Active Directory Exploitation Cheat Sheet](https://github.com/S1ckB0y1337/Active-Directory-Exploitation-Cheat-Sheet)
- [Vulnerable-AD (Local lab)](https://github.com/WazeHell/vulnerable-AD)
- [Active Directory Labs/exams Review](https://github.com/ryan412/ADLabsReview) **Extra**
## PrivEsc
#### General
- [PayloadAllTheThings - Linux Privilege Escalation methodology](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Linux%20-%20Privilege%20Escalation.md)
- [PayloadAllTheThings - Windows Privilege Escalation methodology](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Windows%20-%20Privilege%20Escalation.md)
- [Basic Linux Privilege Escalation](https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/)

#### YouTube
- [Conda's YouTube Privilege Escalation playlist](https://www.youtube.com/watch?v=VpNaPAh93vE&list=PLDrNMcTNhhYrBNZ_FdtMq-gLFQeUZFzWV)
- [Windows Privilege Escalation Fundamentals](http://www.fuzzysecurity.com/tutorials/16.html)
- [Privilege Escaltion FTW (Jake Williams)](https://www.youtube.com/watch?v=yXe4X-AIbps)
- [Elevating your Windows Privileges Like a Boss! (Jake Williams)](https://www.youtube.com/watch?v=SHdM197sbIE)
- [Weird PrivEsc Techinques](https://www.youtube.com/watch?v=wyeRPSjnNjY)
- [Level Up! Practical Windows Privilege Escalation - Andrew Smith](https://www.youtube.com/watch?v=PC_iMqiuIRQ)

####  Linux Capabilities
- [Linux Privilege Escalation using Capabilities](https://www.hackingarticles.in/linux-privilege-escalation-using-capabilities/)
- [Linux Capabilities](https://github.com/carlospolop/hacktricks/blob/master/linux-unix/privilege-escalation/linux-capabilities.md)
- [Day 44: Linux Capabilities Privilege Escalation via OpenSSL with SELinux Enabled and Enforced](https://int0x33.medium.com/day-44-linux-capabilities-privilege-escalation-via-openssl-with-selinux-enabled-and-enforced-74d2bec02099)
- [Privilege Escalation by abusing SYS\_PTRACE Linux Capability](https://blog.pentesteracademy.com/privilege-escalation-by-abusing-sys-ptrace-linux-capability-f6e6ad2a59cc)

## Methodologies
- [CTF Series : Vulnerable Machines](https://bitvijays.github.io/LFC-VulnerableMachines.html)
- [Post Exploitation](https://n00bpentesting.wordpress.com/lessons/ptes-101/post-exploitation/)
- [PayloadAllTheThings - Methodology and Resources](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/Methodology%20and%20Resources)

## Automation scripts
- [Incursore](https://github.com/wirzka/incursore)
- [nmapAutomator](https://github.com/21y4d/nmapAutomator)
- [Autorecon](https://github.com/Tib3rius/AutoRecon)
- [Onetwopunch](https://github.com/superkojiman/onetwopunch)

## Tools
- [Parser Nmap](https://github.com/shifty0g/ultimate-nmap-parser)
- [SUDO KILLER](https://github.com/TH3xACE/SUDO_KILLER)
- [mgeeky's Penetration Testing Tools](https://github.com/mgeeky/Penetration-Testing-Tools)
- [A @TomNomNom Recon Tools Primer](https://danielmiessler.com/blog/a-tomnomnom-tools-primer/)
### Firefox extensions
*Tip: You should create a dedicated [profile](https://support.mozilla.org/en-US/kb/profile-manager-create-remove-switch-firefox-profiles) for each browsing activity*
- [Wappalyzer](https://addons.mozilla.org/it/firefox/addon/wappalyzer/)
- [FoxtProxy](https://addons.mozilla.org/it/firefox/addon/foxyproxy-standard/)
- [Cookie-Editor](https://addons.mozilla.org/it/firefox/addon/cookie-editor/)
- [Penetration Testing Kit](https://addons.mozilla.org/it/firefox/addon/penetration-testing-kit/)
## Cheat sheets and Wordlists
- [Reverse Shell Cheat Sheet](https://highon.coffee/blog/reverse-shell-cheat-sheet/)
- [OSCP-Prep-cheatsheet](https://github.com/evets007/OSCP-Prep-cheatsheet)
- [SecLists](https://github.com/danielmiessler/SecLists)
- [MSSQL Practical Injection Cheat Sheet](https://perspectiverisk.com/mssql-practical-injection-cheat-sheet/)
- [c0deman's Cave MSSQL Injection Cheat Sheet](https://c0deman.wordpress.com/2013/06/25/mssql-injection-cheat-sheet/)

## Gamified Learning
### TryHackMe
#### Back to basics
- [How The Web Works](https://tryhackme.com/module/how-the-web-works)
- [Linux Fundamentals](https://tryhackme.com/module/linux-fundamentals)
- [Windows Fundamentals](https://tryhackme.com/module/hacking-windows-1)
- [Networking Fundamentals](https://tryhackme.com/module/intro-to-networking)
- [Web Hacking Fundamentals](https://tryhackme.com/module/web-hacking-1)
- [Web Fundamentals](https://tryhackme.com/room/webfundamentals)
#### PrivEsc
- [Shells and Privilege Escalation](https://tryhackme.com/module/privilege-escalation-and-shells)
- [Common Linux Privilege Escalation](https://tryhackme.com/room/commonlinuxprivesc)
- [Tib3rius' Linux PrivEsc](https://tryhackme.com/room/linuxprivesc)
- [Privilege Escalation OverlayFS](https://tryhackme.com/room/overlayfs)
- [Tib3rius' Windows PrivEsc](https://tryhackme.com/room/windows10privesc)
#### Intermediate stuff
- [Offensive Pentesting](https://tryhackme.com/paths)
- [SQL Injection Lab](https://tryhackme.com/room/sqlilab)
- [SQHell](https://tryhackme.com/room/sqhell)
#### Room OSCP-Like
- [Skynet](https://tryhackme.com/room/skynet)
- [Steelmountain](https://tryhackme.com/room/steelmountain)
- [Alfred](https://tryhackme.com/room/alfred)
#### Buffer Overflow
- [Buffer Overflow](https://tryhackme.com/room/bufferoverflowprep)
### Offensive Security Proving Grounds
- [OSCP-Like PG Practice boxes](https://twitter.com/tj_null/status/1380574306976026628)
### HackTheBox
- [OSCP-Like HTB boxes](https://twitter.com/TJ_Null/status/1162419643283333120) 
### VulnHub
- [OSCP-Like VulnHub boxes](https://www.abatchy.com/2017/02/oscp-like-vulnhub-vms.html) 
### Others from the web
- [WebSecurity Academy by PortSwigger](https://portswigger.net/web-security)
- [OverTheWire (Linux wargames)](https://overthewire.org/)
- [UnderTheWire (Powershell wargames)](https://underthewire.tech/)

## Reporting
- [Reporting * ptestmethod.readthedocs.io](https://ptestmethod.readthedocs.io/en/latest/LFF-IPS-P5-Reporting.html)
- [Offensive Security Exam Report Template in Markdown](https://github.com/noraj/OSCP-Exam-Report-Template-Markdown)
- [OSCP Report Exam and Lab Templates](https://github.com/whoisflynn/OSCP-Exam-Report-Template)
- [OSCP Report Exam Templates](https://github.com/drak3hft7/OSCP-Exam-Report-Template)

## Mental and Physical Health
Ok, this is not about popping shells, cracking codes, and launching exploits. Your health is more important than knowing how to pop a shell. If you are under burnout, if you can’t concentrate, if you can’t free your minds and visualize your target, all the above stuff is useless. You should find a spot to read the below links and do your own research.
The InfoSec community is an enormous family, you’ll always find someone ready to help you.

- [Mental Health Hackers](https://www.mentalhealthhackers.org/)
- [The Causes of and Solutions for Security Burnout](https://www.youtube.com/watch?v=aqzMEfVfEnk)
- [Cybersecurity’s Dirty Little Secret and Talent Grenade: Burnout](https://www.youtube.com/watch?v=lsm21No9m4s)
- [Mental health in Cyber Security](https://www.reddit.com/r/cybersecurity/comments/m1c12e/mental_health_in_cybersecurity/)
- [What Separates the Good From the Bad: Mental Health and Cybersecurity](https://www.infosecurity-magazine.com/next-gen-infosec/separates-good-bad-mental-health/)
- [Check whole Azeria's Self-Improvement section](https://azeria-labs.com/the-importance-of-deep-work-the-30-hour-method-for-learning-a-new-skill/)
- [Why People Who Protect Others Need to be at Their Best; Tackling Mental Health in Cybersecurity](https://bricata.com/blog/mental-health-cybersecurity/)
- [Mental Health for Hackers](https://www.rsaconference.com/library/webcast/66-mental-health)
- [Mental Health for Hackers: Contents Under Pressure](https://www.tripwire.com/state-of-security/security-awareness/events/mental-health-hackers-under-pressure/)
- [How to beat imposter syndrome to get into cybersecurity industry?](https://www.reddit.com/r/cybersecurity/comments/koh3bj/how_to_beat_imposter_syndrome_to_get_into/)
- [Navigating Imposter Syndrome in the world of Information Security](https://medium.com/@west.a.dominique/navigating-imposter-syndrome-in-the-world-of-information-security-dc6ec10d9c0f)
- [Staying Sane in Cybersecurity - Dealing with Burnout and Stress by Hakluke](https://www.youtube.com/watch?v=XARTT8P_698)
- [r00tMI Night Talk - Burnout nella Cybersecurity: la minaccia che non ti aspetti - Italian talk about burnout](https://www.youtube.com/watch?v=tV0bGS4tPx8)
- [Ask Chloé: Vacations Aren’t the Cure for Burnout](https://securityboulevard.com/2022/02/ask-chloe-vacations-arent-the-cure-for-burnout/)
