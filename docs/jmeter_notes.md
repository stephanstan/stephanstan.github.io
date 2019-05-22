##using jmeter 5.1.1

#3how to increase font size

[change font for jmeter gui](https://stackoverflow.com/questions/36899553/how-to-change-font-size-for-jmeter)

```
go to properties file:
C:\apache-jmeter-5.1.1\bin\jmeter.properties

#jmeter.hidpi.mode=false
# To enable pseudo-hidpi mode change to true
jmeter.hidpi.mode=true
# HiDPI scale factor
#jmeter.hidpi.scale.factor=1.0
# Suggested value for HiDPI
jmeter.hidpi.scale.factor=2.0
```