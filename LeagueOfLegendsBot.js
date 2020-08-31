var FALSE = -1;

var ResText = "";
var EasterEgg = "안봐도 브.론.즈";

var NickName = "";
var OPGG;
var OpggSplit;
var RankText;
var WinRatio;
var WinTextSplit;
var MostCham;
var ChamTextSplit;

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName)
{

    if(msg.indexOf("!티어검색") != FALSE)
    {
        Initialize()
        MakeNickName(msg);
        OPGGParsing();
        MakeTexts();
        MakeEasterEgg();
        MakeResText();

        replier.reply(ResText);
    }
}

function Initialize()
{
    ResText = "";
    NickName = "";
    OPGG = "";
    OpggSplit = "";
    RankText = "";
    WinRatio = "";
    WinTextSplit = "";
    MostCham = "";
    ChamTextSplit = "";
}

function MakeNickName(message)
{
    NickName = message.substr(6);
}

function OPGGParsing()
{
    OPGG = Utils.getWebText("http://www.op.gg/summoner/userName=" + NickName);
}

function MakeTexts()
{
    OpggSplit = OPGG.split("<meta name=\"description\" content=\"" + NickName);

    RankText = OpggSplit[1].split("/")[1];
    WinRatio = OpggSplit[1].split("/")[2];
    MostCham = OpggSplit[1].split("/")[3];

    WinTextSplit = WinRatio.split(" ");
    ChamTextSplit = MostCham.split(",");
}

function MakeEasterEgg()
{
    if(RankText.indexOf("Chall") != -1)
        EasterEgg = "✯✯✯✯✯";
    else if(RankText.indexOf("Gran") != -1)
        EasterEgg = "w(°ｏ°)w";
    else if(RankText.indexOf("Master") != -1)
        EasterEgg = "버스점...";
    else if(RankText.indexOf("Dia") != -1)
        EasterEgg = "◖⚆ᴥ⚆◗";
    else if(RankText.indexOf("Plat") != -1)
        EasterEgg = "오우...";
    else if(RankText.indexOf("Gold") != -1)
        EasterEgg = "골딱";
    else if(RankText.indexOf("Silver") != -1)
        EasterEgg = "흠...";
    else if(RankText.indexOf("Bronze") != -1)
        EasterEgg = "-브-";
    else if(RankText.indexOf("Iron") != -1)
        EasterEgg = "풉ㅋㅋ";
}

function MakeResText()
{
    ResText = "[롤 전적검색]\n" +
              "닉네임 : " + NickName + "\n" +
              "티어 : " + RankText + " (" + EasterEgg + ")\n" +
              "승패 : " + WinTextSplit[1].substring(0, WinTextSplit[1].length - 1) + "승 " + 
                            WinTextSplit[2].substring(0, WinTextSplit[2].length - 1) + "패\n" +
              "승률 : " + WinTextSplit[5];/* + "\n" +
              " 1) " + ChamTextSplit[0] + "\n" + 
              " 2) " + ChamTextSplit[1] + "\n" + 
              " 3) " + ChamTextSplit[2];*/

    if(EasterEgg == "안봐도 브.론.즈")
    {
        ResText = "[롤 전적검색]\n" +
              "닉네임 : " + NickName + "\n" +
              "티어 : Unranked (" + EasterEgg + ")";
    }
}
