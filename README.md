## 微信公众号后台-管理饥荒server

### How Use?
> 此程序应运行在你的游戏主进程服务器上

#### 首先配置 configs/config.json
* 填入wx的 appid,appsecret
* 自定义游戏服名称，加入管理员(wx里的唯一昵称)
- 是否是双服，若是则在cave里填入cave所在服务器的信息,并在cave服里:
	- 把主服ssh 公钥丢进去
	- 根目录创建wx-dst文件夹,丢入dst.sh,并赋权可执行

#### 程序运行
```bash
# 安装依赖，配置shell脚本执行权限
npm i
chmod +x ./dst.sh

# 运行,建议使用forever或者pm2管理程序运行状态
npm start
# 或
pm2 start app.js -n "dst"
```
#### 配置公众号或测试号
* 地址 主服IP/wx
* 通过测试接口获取access token,并且在菜单测试里上传 configs/meum.json 

### How works?
* koa web后台, koa-router
* 微信请求验证
* 按配置文件微信id昵称进行操作权限验证
* child_process子进程模块命令执行
* 进程控制逻辑:执行之前写的一个DST server管理脚本[dst.sh](https://github.com/qwertyuiop6/DST-Server-Build)

### todo later....
* 加入web端管理.....
