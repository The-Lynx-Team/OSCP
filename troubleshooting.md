# Troubleshooting

## SMB issues with kali

Question: My enum4linux and/or smbclient are not working. I am receiving "Protocol negotiation failed: NT_STATUS_IO_TIMEOUT". How do I resolve?

Resolution:
```bash
# On Kali, edit /etc/samba/smb.conf
# Add the following under global:

client min protocol = CORE
client max protocol = SMB3
```