/* eslint-disable no-mixed-operators */
/* eslint-disable camelcase */
const {
    exec,
    execSync,
} = require('child_process');
const {
    getNew,
    getLocal
}=require('../service/version');

const config = require('../configs/config');
const {
    dstname,
    adminlist,
    rootlist,
    rootkey,
    isSingleServer,
} = config;

let caveIp;
// 若不是单独服务器则读取cave洞穴服务器的ip
if (!isSingleServer) {
    caveIp = config.server.cave.ip;
    caveUser = config.server.cave.user;
}

// 执行shell操作脚本管理,数字控制类型通过pipe输入stdin
function shellAdmin(type, sync = true) {
    if (isSingleServer || String.prototype.endsWith.call(type, 0)) {
        if (sync) {
            return execSync(`./dst.sh ${type}`).toString();
        }
        exec(`./dst.sh ${type}`);
    } else {
        if (sync) {
            cRes = execSync(`echo "./dst.sh ${type}" | ssh root@${caveIp}`);
            return `${cRes.toString().split('\n').slice(-1)}`;
        }
        exec(`echo './dst.sh ${type}' | ssh root@${caveIp}`);
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
            shellAdmin(40, false);
            shellAdmin(41, false);
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

module.exports = async (userName, key) => {
    const localV=getLocal();
    const newV=await getNew();
    return !adminlist.includes(userName) && `${userName},你没有权限操作哦~` ||
    rootkey.includes(key) && !rootlist.includes(userName) && `${userName},你没有这个特殊操作权限!` ||
    `⭐${dstname}[V${localV}]⭐\n${adminSwitch(key)}${newV>localV?`\n发现饥荒版本更新:[V${newV}]`:''}`;
}