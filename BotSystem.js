// Room
var RYS = "류용상";
var YongIn = "용인";

var NOKEY = -1;

// root
var ROOT_COMMAND_AUTHOR = "!권한";
var ROOT_COMMAND_GET_AUTHOR = "!권한 조회";
var ROOT_COMMAND_ADD_AUTHOR = "!권한 추가";
var ROOT_COMMAND_DEL_AUTHOR = "!권한 삭제";
var LEVEL_ROOT = 0;
var LEVEL_MANA = 1;
var LEVEL_USER = 2;
var LEVEL_IGNORE = 3;

var author = [];
//v//ar author["류용상"] = LEVEL_ROOT;
//var author["류봇"] = LEVEL_MANA;

// manager
var MANA_COMMAND_MACRO = "!봇";
var MANA_COMMAND_MACRO_STAT = "!봇 상태";
var MANA_COMMAND_MACRO_ON = "!봇 ON";
var MANA_COMMAND_MACRO_OFF = "!봇 OFF";
var MANA_COMMAND_MACRO_RESET = "!봇 RESET";
var MANA_COMMAND_BAN = "!차단";
var MANA_COMMAND_ADD_BAN = "!차단 추가";
var MANA_COMMAND_DEL_BAN = "!차단 삭제";


// Command
var Command_DeviceState = "!상태";

var resText = "";

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName)
{
  Initialize();

  switch(msg)
  {
    case Command_DeviceState:
    {
      DeviceState();
      replier.reply(resText);
      break;
    }
  }

  if(msg.indexOf(ROOT_COMMAND_AUTHOR) != NOKEY)
  {
    isAuthor();
  }
  else if(msg.indexOf(MANA_COMMAND_MACRO) != NOKEY)
  {
    if(author[sender] <= LEVEL_MANA)
    {
      if(msg.indexOf(MANA_COMMAND_MACRO_STAT) != NOKEY)
      {
        switch(room)
        {
          case RYS:
          {
            replier.reply("공지 상태 : " + Api.isOn("용인 공지")); 
            replier.reply("벙 상태 : " + Api.isOn("용인 벙")); 
            replier.reply("롤 상태 : " + Api.isOn("롤 티어검색")); 
            break;
          }
          case YongIn:
          {
            replier.reply("공지 상태 : " + Api.isOn("용인 공지")); 
            replier.reply("벙 상태 : " + Api.isOn("용인 벙")); 
            break;
          }
        }
      }
      else if(msg.indexOf(MANA_COMMAND_MACRO_ON) != NOKEY)
      {
        var TextSplit = msg.split("/");
        var RoomName = TextSplit[1];
        Api.on(RoomName);

        replier.reply("[시스템] " + RoomName + "의 상태가 변경되었습니다.");
      }
      else if(msg.indexOf(MANA_COMMAND_MACRO_OFF) != NOKEY)
      {
        var TextSplit = msg.split("/");
        var RoomName = TextSplit[1];
        Api.off(RoomName);
        replier.reply("[시스템] " + RoomName + "의 상태가 변경되었습니다.");
      }
      else if(msg.indexOf(MANA_COMMAND_MACRO_RESET) != NOKEY)
      {
        Api.off("용인 공지");
        Api.off("용인 벙");
        Api.off("롤 티어검색");

        Api.reload("용인 공지");
        Api.reload("용인 벙");
        Api.reload("롤 티어검색");

        Api.on("용인 공지");
        Api.on("용인 벙");
        Api.on("롤 티어검색");

        replier.reply("[시스템] 용인 공지의 상태가 변경되었습니다.");
        replier.reply("[시스템] 용인 벙의 상태가 변경되었습니다.");
      }
    }
  }

  if(msg.indexOf(MANA_COMMAND_BAN) != NOKEY)
  {
    var TextSplit = msg.split("/");
    var ID = TextSplit[1];


    if(msg.indexOf(MANA_COMMAND_ADD_BAN) != NOKEY)
    {
      if(author[sender] <= LEVEL_MANA)
      {
        if(author[ID] >= LEVEL_USER)
        {
          author[ID] = LEVEL_IGNORE;
          replier.reply("[시스템] " + ID + "이 차단되었습니다.");
        }
      }
    }
    else if(msg.indexOf(MANA_COMMAND_DEL_BAN) != NOKEY)
    {
      if(author[sender] <= LEVEL_MANA)
      {
        author[ID] = LEVEL_USER;
        replier.reply("[시스템] " + ID + "이 차단 해제 되었습니다.");
      }
    }
  }
}

function Initialize()
{
  author["류용상"] = LEVEL_ROOT;
  author["Debug"] = LEVEL_ROOT;
  author["류봇"] = LEVEL_MANA;
  author["용상 27 죽전 남"] = LEVEL_ROOT;
  author["나리 27 동백 여(얼비요정)"] = LEVEL_MANA;
  author["공 28 깅 남"] = LEVEL_MANA;
  author["라박 26 기흥 남"] = LEVEL_MANA;
  author["오농 26 기흥 남"] = LEVEL_MANA;
  author["용용 26 기흥 남"] = LEVEL_MANA;
}

function DeviceState()  
{
  resText = "#### Device State ####";
  resText += "Android Version : Android " + Device.getAndroidVersion() + " \n";
  resText += "Battery : " + Device.getBatteryLevel() + "% \n";
    
  if(Device.getBatteryStatus() == 1)
    resText += "Battery State : Good";
  else
    resText += "Battery State : Bad";
}

function isAuthor()
{
  if(author[sender] == LEVEL_ROOT)
  {
    var TextSplit = msg.split("/");
    var ID = TextSplit[1];

    if(msg.indexOf(ROOT_COMMAND_GET_AUTHOR) != NOKEY)
    {
      resText = author[ID];
      replier.reply(resText);
    }
    else if(msg.indexOf(ROOT_COMMAND_ADD_AUTHOR) != NOKEY)
    {
      author[ID] = LEVEL_MANA;
      replier.reply("[시스템] " + ID + "의 권한이 변경되었습니다.");
    }
    else if(msg.indexOf(ROOT_COMMAND_DEL_AUTHOR) != NOKEY)
    {
      author[ID] = LEVEL_USER;
      replier.reply("[시스템] " + ID + "의 권한이 변경되었습니다.");
    }
  }
}
