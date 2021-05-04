module.exports = {
    "extends": "airbnb-base",

    "rules": {
        "no-tabs": "off", //关闭禁止tab
        "indent": [2, 4], //缩进
        "semi": [0], //关闭末尾必须分号
        "no-mixed-spaces-and-tabs": [0], //关闭禁止混用tab和空格
        "prefer-destructuring": ["error", {
            "array": false,
            "object": true
        }, {
            "enforceForRenamedProperties": false
        }],
    },
};