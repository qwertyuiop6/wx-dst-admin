/* eslint-disable no-mixed-operators */
/* eslint-disable camelcase */
const {
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

if (!isSingleServer) {
  caveIp = config.server.cave.ip;
}

function getStatus() {
  const mStatus = execSync('echo 0 | ./dst.sh', (err, stdout) => stdout);

  let cStatus;
  if (isSingleServer) {
    cStatus = execSync('echo 00 | ./dst.sh', (err, stdout) => stdout);
  } else {
    cStatus = execSync(`echo 'echo 00 | ./wx-dst/dst.sh' | ssh root@${caveIp}`, (err, stdout) => stdout);
  }

  return `${mStatus}\n${cStatus.toString().split('\n').slice(-1)}`;
}

function madmin(type) {
  return execSync(`echo ${type} | ./dst.sh`, (err, stdout) => stdout).toString();
}

function cadmin(type) {
  return execSync(`echo 'echo ${type}| ./wx-dst/dst.sh' | ssh root@${caveIp}`, (err, stdout) => stdout).toString().split('\n').reverse()[0];
}

function adminSwitch(cmd) {
  if (isSingleServer) {
    cadmin = madmin;
  }
  switch (cmd) {
    case 'getStatus':
      return getStatus();
    case 'mSta':
      return madmin(1);
    case 'mStop':
      return madmin(3);
    case 'mRe':
      return madmin(5);
    case 'cSta':
      return cadmin(2);
    case 'cStop':
      return cadmin(4);
    case 'cRe':
      return cadmin(6);
    case 'update':
      madmin(3);
      cadmin(4);
      madmin(7);
      cadmin(7);
      return '游戏更新中，大概3分钟左右更新完成..';
    case 'upmod':
      madmin(5);
      cadmin(6);
      return '游戏重启完成,mod更新成功~';
    case 'del':
      return `${madmin(80)}\n${cadmin(81)}`;
    case 'reset':
      return `${madmin(90)}\n${cadmin(91)}`;
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