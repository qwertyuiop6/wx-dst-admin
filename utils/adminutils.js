/* eslint-disable no-mixed-operators */
/* eslint-disable camelcase */
const {
  exec,
  execSync,
} = require('child_process');

const config = require('../configs/config');

let caveIp;
const {
  dstname,
  adminlist,
  rootlist,
  rootkey,
  isSingleServer,
} = config;

// 若不是单独服务器则读取cave洞穴服务器的ip
if (!isSingleServer) {
  caveIp = config.server.cave.ip;
  caveUser=config.server.cave.user;
}

// 执行shell操作脚本管理,数字控制类型通过pipe输入stdin
function shellAdmin(type,sync=true){
	if(isSingleServer||String.prototype.endsWith.call(type,0)){
		if(sync){
			 return execSync(`$HOME/wechat-dst/dst.sh ${type}`).toString();
		}
		exec(`$HOME/wechat-dst/dst.sh ${type}`);
	}else{
		if(sync){
		cRes=execSync(`echo "./dst.sh ${type}" | ssh root@${caveIp}`);
                return `${cRes.toString().split('\n').slice(-1)}`;
		}
		exec(`echo './wx-dst/dst.sh ${type}' | ssh root@${caveIp}`);
	}
}


// 各种微信key的管理方法
function adminSwitch(cmd) {
  switch (cmd) {
    case 'getStatus':
      return `${shellAdmin('00')}\n${shellAdmin('01')}`;
    case 'mSta':
      return shellAdmin(10);
    case 'mStop':
      return shellAdmin(20);
    case 'mRe':
      return shellAdmin(30);
    case 'cSta':
      return shellAdmin(11);
    case 'cStop':
      return shellAdmin(21);
    case 'cRe':
      return shellAdmin(31);
    case 'update':
      shellAdmin(40,false);
      shellAdmin(41,false);
      return '游戏更新中，大概3分钟左右更新完成..';
    case 'upmod':
      shellAdmin(30);
      shellAdmin(31);
      return '游戏重启完成,mod更新成功~';
    case 'del':
      return `${shellAdmin(50)}\n${shellAdmin(51)}`;
    case 'reset':
      return `${shellAdmin(60)}\n${shellAdmin(61)}`;
    default:
      return '未知指令!';
  }
}

/**
 * 管理动作，第一步入口处检查user和admin key
 * @param {String} userName [用户微信名称]
 * @param {String} adminKey [管理事件的key]
 */

function checkAdmin(userName, adminKey) {
  // && 和 ||改写if else,虽然不符合aribnb标准 (:
  return !adminlist.includes(userName) && `${userName},你没有权限操作哦~` ||
    rootkey.includes(adminKey) && !rootlist.includes(userName) && `${userName},你没有这个特殊权限!` ||
    `⭐⭐---${dstname}---⭐⭐\n${adminSwitch(adminKey)}`;

  // if (!adminlist.includes(userName)) {
  //   return `${userName},你没有权限操作哦~`;
  // }
  // // eslint-disable-next-line no-bitwise
  // if (~rootkey.indexOf(adminKey) && !rootlist.includes(userName)) {
  //   return `${userName},你没有这个特殊权限!`;
  // }
  // return `⭐⭐---${dstname}---⭐⭐\n${adminSwitch(adminKey)}`;
}

module.exports = checkAdmin;
