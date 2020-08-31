const scriptName="response.js";

const NOKEY = -1;

var resText = "";       
var matchText = "벙 없음";

function response(room, msg, sender, isGroupChat, replier, ImageDB)
{
    var notice = [true, true, true, true, true];
    var senderRes;
    var saveFlag = false;
    var BoardFlag = false;

    Initialize();

    if(sender == "공지맨")
        senderRes = false;
    else
        senderRes = true;

    if(msg.indexOf("톡게시판") == -1)
    {
        BoardFlag = true;
    }

    chkDate(msg, notice);
    chkPlace(msg, notice);
    chkTime(msg, notice);
    chkContents(msg, notice);
    chkPersonnel(msg, notice);

    saveFlag = senderRes && BoardFlag && notice[0] && notice[1] && notice[2] && notice[3] && notice[4];

    if (saveFlag == true) 
    {
        matchText = msg;
    }

    if(msg == "!벙")
        {
            resText = matchText;
        }

    if(msg == "!벙초기화")
    {
        matchText = "벙 없음";
        resText = "초기화 완료";
    }

    replier.reply(resText);
}

function Initialize()
{
    resText = "";
}

function chkDate(msgText, res)
{
    if(msgText.indexOf("날짜") == NOKEY)
        res[0] = false;
    else
        res[0] = true;
}

function chkPlace(msgText, res)
{
    if(msgText.indexOf("장소") == NOKEY)
        res[1] = false;
    else
        res[1] = true;
}

function chkTime(msgText, res)
{
    if(msgText.indexOf("시간") == NOKEY)
        res[2] = false;
    else
        res[2] = true;
}

function chkContents(msgText, res)
{
    if(msgText.indexOf("내용") == NOKEY)
        res[3] = false;
    else
        res[3] = true;
}

function chkPersonnel(msgText, res)
{
    if(msgText.indexOf("인원") == NOKEY)
        res[4] = false;
    else
        res[4] = true;
}
