## 微信公众号后台-管理饥荒server

### How Use?

> 此程序应运行在你的游戏主进程服务器上

#### 首先开通一个wx公众号或测试号

> 一般没有其他用途的情况下测试号比较适合-->[wx公众测试号申请](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)

#### 配置:  configs/config.json

* 填入wx公众号or测试号的 appid,appsecret,然后自定义填入一个token
* 自定义游戏服名称，加入管理员(wx里的唯一昵称)
- 是否是双服，若是则在cave里填入cave所在服务器的信息,并在cave服里:
	- 把主服ssh 公钥丢进去
	- 根目录丢入dst.sh,并赋权可执行

#### 管理程序运行
```bash
# 安装依赖，配置shell脚本执行权限
npm i
chmod +x ./dst.sh

# 运行,建议使用forever或者pm2管理程序运行状态
npm start
# 或
pm2 start app.js -n "dst-wx-admin"
```
#### 配置公众号或测试号接口
* URL地址: 主服IP/wx
* Token: 在config.json里填写的token,提交
* 通过[公众平台接口调试](https://mp.weixin.qq.com/debug/)获取access token
* 并在接口类型:自定义菜单 里复制粘贴 configs/meum.json内容上传 

### How works?
* koa web后台, koa-router
* 微信请求验证
* 按配置文件微信id昵称进行操作权限验证
* child_process子进程模块进行shell命令执行
* 进程控制逻辑:执行一个DST server管理脚本[dst.sh](https://github.com/qwertyuiop6/DST-Server-Build)

### todo later....
* 加入web端管理.....
