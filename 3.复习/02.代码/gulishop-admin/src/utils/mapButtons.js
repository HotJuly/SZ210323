function setMapButtons(buttons){
/*
    当前结构:
        ["btn.User.remove","btn.User.update","btn.User.assgin"]

    需要转换:
        {
            "User.remove":true,
            "User.update":true,
            "User.assgin":true,
        }
*/

    const mapButtonObj={};

    buttons.forEach((buttonStr) => {
        const newStr = buttonStr.replace('btn.','');
        mapButtonObj[newStr] = true;
    });

    return mapButtonObj;
}

export default setMapButtons;