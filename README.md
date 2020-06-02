# PPwned
A small node script that checks if a giving password was pwned using K-Anonymality

# How To Run
- Download PPwned.exe script https://gofile.io/d/uCAfwR
- run the script on a terminal (powershell , cmd ... ) like this : ./ppwned "test_password"
# Supported OS
this script is only compiled for win-x64 for now 

# API : 

this script uses the api provided by https://haveibeenpwned.com/.
## API endpoint :
you need to specify a password SHA-1 hash prefix with the api for example : FAFDE , ( atleast 5 letters )
http://api.pwnedpasswords.com/range/
