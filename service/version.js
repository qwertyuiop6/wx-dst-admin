const cheerio = require('cheerio');
const axios = require('axios');
const fs=require('fs');

const getNew = async () => {
    const res = await axios.get('https://forums.kleientertainment.com/game-updates/dst');
    const $ = cheerio.load(res.data);
    const vList = $('.ipsType_break');
    const releaseV = vList.filter((i, el) => !$(el).find('span').text().includes('Test'));
    releaseV.find('span').remove();
    const newV=releaseV.text().split(' ').sort((a,b)=>b-a)[0].trim();
    return newV;
}

const getLocal= () => fs.readFileSync(`/${process.env.HOME}/dst/version.txt`).toString().trim();

module.exports={
	getNew,
	getLocal
}