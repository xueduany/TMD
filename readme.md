这是通过js端函数埋点，然后在服务端统一查看js执行性能的在线report，使用场景主要是有多个异步环境，存在并发的js操作，而js无法但不调试的情况下，分析js性能瓶颈

把inject.js加到要使用的文件里面，url改掉
server端启动node index.js

例子
TMD('页面开始')

在server端
http://xx.xx.xx.xx/clean
清除日志

http://xx.xx.xx.xx/report
看调试报告

http://xx.xx.xx.xx/log?key=xxx
发送日志，key可以不填


