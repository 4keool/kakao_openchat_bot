const scriptName="response.js";

// Define
const TRUE = 1;
const FALSE = -1;

// Commend
const ChatCommend_Notice = "!공지";
const ChatCommend_ViewForm = "!벙양식";
const ChatCommend_Help = "!도움";
const ChatCommend_Version = "!버전";


// Easter Egg
const ChatCommend_RYS = "!용상";
const ChatCommend_GJM = "!공지맨";

const ChatCommend_DDAY = "!전역";
const ChatCommend_LeaveWork = "!퇴근";
const ChatCommend_Time = "!시간";


// Variable
var Today = new Date();
var resText = "";
var Notice_Text = "※ 신입 공지 ※\n" +
                " 1. 닉네임 설정 ▶ 닉네임 나이 동이름 성별\n" +
                "ex) 나리 27 동백 여\n\n" +
                " 2. 우측 상단 三(메뉴) 누르고 하트 누르기\n\n" +
                " 3. 본인 닉네임 키워드 알림 설정\n" +
                ">> 카톡설정-알림-키워드알림-닉 저장\n" +
                "(출석부 소환시, 대꾸 해주기)\n\n" +
                " 4. 인사 후 들어오시게된 계기를 말씀해주세요.\n\n" +
                "★ 벙 가능.\n" +
                ">> 자유롭게 가능합니다. (급벙, 당일벙)\n" +
                "참여하기 전 일정 체크 잘 부탁드립니다. (취소시 곤란해요~)\n\n" +
                "★ 질서정연하지 못한자, \n" +
                "-예의 없을시 사전예고 없이 강퇴 조치\n" +
                "-개인프로필 올리기X\n" +
                "-최초 닉 이후로 닉변X \n" +
                "-여미새, 간재미 X\n" +
                "-잠수부 물갈이\n\n" +
                "❎새벽에는 솔크를 불러주세요❎\n\n" +
                ">>문의사항 있을 시에는 방장 1:1 채팅 주세요.";

var Form_Text = "날짜 : XX월 XX일\n" +
                "장소 : \n" +
                "시간 : \n" +
                "내용 : \n" +
                "인원 : \n" +
                "  - \n" +
                "  - \n" +
                "  - \n\n" +
                "더 올사람 추가해주세요.";


var Help_Text = "※ Help ※\n" +
                "!공지 : 공지를 불러온다.\n" +
                "!벙양식 : 벙 양식을 불러온다.\n" +
                "!벙 : 현재 등록된 벙리스트를 가져온다.\n" +
                "!봇 상태 : 봇의 상태를 출력한다.\n" +
                "!봇 ON/봇이름 : 특정 봇을 실행시킨다. ex)!봇 ON/용인 공지\n" +
                "!봇 OFF/봇이름 : 특정 봇을 중지시킨다." +
                "!봇 RESET : 모든 봇을 재부팅한다.\n" +
                "!도움 : 도움말을 띄운다.\n";
var Version_Text = "※ Version ※\n" +
                "Beta 3.0\n" +
                "Build 20.07.04";


function response(room, msg, sender, isGroupChat, replier, ImageDB)
{
    /*
     *(String) room: 메시지를 받은 방 이름
     *(String) msg: 메시지 내용
     *(String) sender: 전송자 닉네임
     *(boolean) isGroupChat: 단체/오픈채팅 여부
     *replier: 응답용 객체. replier.reply("메시지") 또는 replier.reply("방이름","메시지")로 전송
     *(String) ImageDB.getProfileImage(): 전송자의 프로필 이미지를 Base64로 인코딩하여 반환
     */
     Initialize();

    CommentClassification(msg);

    replier.reply(resText);
}

function Initialize()
{
    resText = "";
    Today = new Date();
}

function CommentClassification(msg)
{
    switch(msg)
    {
        case ChatCommend_Notice:
            resText = Notice_Text;
            break;

        case ChatCommend_ViewForm:
            resText = Form_Text;
            break;

        case ChatCommend_Help:
            resText = Help_Text;
            break;
        
        case ChatCommend_Version:
            resText = Version_Text;
            break;


// Easter Egg
        case ChatCommend_RYS:
            resText = "팍!씨\n" + 
                    "하지마란마랴";
            break;
        case ChatCommend_GJM:
            resText = "기능 추가 원하시면\n" + 
                    "1:1 문의 바람.";
            break;


        case ChatCommend_DDAY:
            CalcDDay();
            break;

        case ChatCommend_LeaveWork:
            CalcLeaveWorkTime();
            break;
        
        case ChatCommend_Time:
            resText = Today.getHours() + "시 " + Today.getMinutes() + "분 " + Today.getSeconds() + "초";
            break;
    }
}


function CalcDDay()
{
    start = new Date(2018, 07, 02);
    end = new Date(start.getFullYear() + 3, start.getMonth(), start.getDate());

var TotalDay = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
var diffDay = (Today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    resText = "총 복무일 : " + TotalDay + "\n" +
                "현재 복무일 : " + parseInt(diffDay) + "\n";
/*
    var Total = 3 * 365;
    var RemainingDay = ((Today.getFullYear() - start.getFullYear()) * 365) +
    ((Today.getMonth() - start.getMonth()) * 31) +
    (Today.getDate() - start.getDate());
    var CurrentDay = Total - RemainingDay;
    var Percent = RemainingDay / Total * 100;

    resText = "총 복무일 : " + Total + "\n" +
                "현재 복무일 : " + RemainingDay + "\n" +
                "남은 복무일 : " + CurrentDay + "\n" +
                "복무율 : " + Percent.toFixed(1) + "%\n" +
                "훈련소 : 20.07.30 ~ 20.08.27";*/
}

function CalcLeaveWorkTime()
{
    let leaveWorkTime = new Date(Today.getFullYear(), Today.getMonth(), Today.getDate(),
                        18, 0, 0, 0);
    let aaa = new Date(Today.getFullYear(), Today.getMonth(), Today.getDate(),
                        18, 0, 0, 0);

    var diffHours = leaveWorkTime.getHours() - Today.getHours();
    var diffMinutes = leaveWorkTime.getMinutes() - Today.getMinutes();
    var diffSeconds = leaveWorkTime.getSeconds() - Today.getSeconds();
    var diffMilliroSeconds = leaveWorkTime.getMilliseconds() - Today.getMilliseconds();

    var diffTime = leaveWorkTime - Today;
    var H = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var M = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    var S = Math.floor((diffTime % (1000 * 60)) / 1000);

    if (diffMilliroSeconds < 0)
       {
           diffMilliroSeconds += 1000;
           diffSeconds -= 1;
       }
    if (diffSeconds < 0)
        {
            diffSeconds += 60;
            diffMinutes -= 1;
        }
    if (diffMinutes < 0)
    {
        diffMinutes += 60;
        diffHours -= 1;
    }

    resText = diffHours + "시간 " + diffMinutes + "분 " + 
                diffSeconds + "초 남음";
resText = H + "시간 " +M + "분 " +S + "초 남음";

if (H < 0)
   resText = "퇴근 완료";
}
