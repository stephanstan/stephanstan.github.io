## Jenkins

[Jenkins downloads](https://jenkins.io/download)

## Update powershell
[power shell update](https://www.addictivetips.com/windows-tips/update-to-powershell-7-0-on-windows-10/)

```
iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSIjen
```

## download Jenkins war and run
```
java -jar jenkins.war
```

## Jenkins home in browser
```
http://localhost:8080/login?from=%2F
```
## file locations

```
c:\workspace\jenkins\jenkins.war
C:\Users\steph\.jenkins   - installation  files, can be deleted or saved
```
## setup admin user
```
stephanstan / q1w2e3r4
```
## Jenkins as as Docker Image
```
https://hub.docker.com/r/jenkins/jenkins
docker pull jenkins/jenkins:lts
docker run -p 8090:8080 -p 50000:50000 jenkins/jenkins:lts
http://localhost:8090/
```
