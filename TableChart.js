const scriptName="response.js";

// Define
const NOKEY = -1;
const INIT = -4444;
const BreakFast = 0;
const Lunch = 1;
const Dinner = 2;
const MEAL = 3;
const PNS = 0;
const LG = 1;
const MON = 0;
const TUE = 1;
const WEN = 2;
const THU = 3;
const FRI = 4;

// Commend
const ChatCommend_BreakFast = "!아침";
const ChatCommend_Lunch = "!점심";
const ChatCommend_Dinner = "!저녁";
const ChatCommend_Meal = "!밥";
const ChatCommend_Help = "!도움";
const ChatCommend_Version = "!버전";
const ChatCommend_ServingTime = "!배식시간";
const ChatCommend_DietRegist = "!식단등록";
const ChatCommend_SelectCompany = "!회사";

var Company = PNS;
var nWeekDayoftheWeek = INIT;      // 0~6 일~토
var nRegistMealTime = INIT;
var CurrentHour = 0;            // 0~23
var CurrentMin = 0;             // 0~59

var MealTime = new Array(MEAL);
var TableChart = new Array(5*MEAL);


// Variable
var Today = new Date();
var resText = "";
var saveFlag = false;

var Help_Text = "※ Help ※\n" +
                "!아침:당일 아침 메뉴를 불러온다.\n" +
                "!점심:당일 점심 메뉴를 불러온다.\n" +
                "!저녁:당일 저녁 메뉴를 불러온다.\n" +
                "!밥:다음 식사의 메뉴를 불러온다.\n" +
                "!배식시간:배식시간을 불러온다.\n" +
                "!회사:회사를 변경한다.\n" +
                "ex)!회사 PNS, !회사 LG\n" +
                "!식단등록:식단을 등록한다.\n" +
                "ex)!식단등록[월/아침]내용\n" + 
                "!도움:도움말을 띄운다.";
var Version_Text = "※ Version ※\n" +
                "Beta 1.0\n" +
                "Build 21.01.19\n\n" + 
                "--Ver 1.0--\n" +
                "- 기본적인 동작 및 기틀 제작\n" +
                "--Ver 1.1\n--" +
                "- 식단등록 기능 추가\n" +
                "- 회사 구분 완료\n" +
                "[추가될 기능]\n" +
                "1) 배식시간 데이터 관리\n" + 
                "2) 배식시간으로 기능 분할\n" +
                "3) P&S 데이터 생성 필요";


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

    saveFlag = false;
    for(var i = 0; i < MEAL; i++){
        MealTime[i] = new Date();
    }
    MealTime[BreakFast].setHours(7);
    MealTime[BreakFast].setMinutes(30);
    MealTime[Lunch].setHours(12);
    MealTime[Lunch].setMinutes(30);
    MealTime[Dinner].setHours(18);
    MealTime[Dinner].setMinutes(30);
}

function CommentClassification(msg)
{
    DayoftheWeek = (Today.getDay() - 1) * MEAL;
    CurrentHour = Today.getHours();
    CurrentMin = Today.getMinutes();

    if(msg.indexOf(ChatCommend_BreakFast) != NOKEY){
        if(Company == PNS){
            // PNS 추가 필요
            resText = "구현 예정";
        }
        else if(Company == LG){
            resText = TableChart[DayoftheWeek + BreakFast];
        }
    }
    else if(msg.indexOf(ChatCommend_Lunch) != NOKEY){
        if(Company == PNS){
            // PNS 추가 필요
            resText = "구현 예정";
        }
        else if(Company == LG){
            resText = TableChart[DayoftheWeek +Lunch];
        }
    }
    else if(msg.indexOf(ChatCommend_Dinner) != NOKEY){
        if(Company == PNS){
            // PNS 추가 필요
            resText = "구현 예정";
        }
        else if(Company == LG){
            resText = TableChart[DayoftheWeek +Dinner];
        }
    }
    else if(msg.indexOf(ChatCommend_Meal) != NOKEY){
        if(Company == PNS){
            // PNS 추가 필요
            resText = "구현 예정";
        }
        else if(Company == LG){
            if((CurrentHour >= 0) && (CurrentHour < 11)){
                resText = TableChart[DayoftheWeek + BreakFast];
            }
            else if((CurrentHour >= 11) && (CurrentHour < 14)){
                resText = TableChart[DayoftheWeek + Lunch];
            }
            else if((CurrentHour >= 14) && (CurrentHour < 20)){
                resText = TableChart[DayoftheWeek + Dinner];
            }
            else if(CurrentHour >= 20){
                resText = "예정된 식사가 없습니다.";
            }
            else{
                resText = "예외 발생, CurrentHour:" + CurrentHour;
            }
        }
    }
    else if(msg.indexOf(ChatCommend_ServingTime) != NOKEY){
        if(Company == PNS){
            // PNS 추가 필요
            resText = "구현 예정";
        }
        else if(Company == LG){
            resText = "아침:" + MealTime[BreakFast].getHours() + "시" + MealTime[BreakFast].getMinutes() + "분 ~ "
            + (MealTime[BreakFast].getHours() + 1) + "시" + MealTime[BreakFast].getMinutes() + "분\n"
            + "점심:"+ MealTime[Lunch].getHours() + "시" + MealTime[Lunch].getMinutes() + "분 ~ "
            + (MealTime[Lunch].getHours() + 1) + "시" + MealTime[Lunch].getMinutes() + "분\n"
            +"저녁:"+ MealTime[Dinner].getHours() + "시" + MealTime[Dinner].getMinutes() + "분 ~ "
            + (MealTime[Dinner].getHours() + 1) + "시" + (MealTime[Dinner].getMinutes() - 30) + "분";
        }
    }
    else if(msg.indexOf(ChatCommend_DietRegist) != NOKEY){
        chkDietRegist(msg);
    }
    else if(msg.indexOf(ChatCommend_SelectCompany) != NOKEY){
        chkCompany(msg);
    }
    else if(msg.indexOf(ChatCommend_Help) != NOKEY){
        resText = Help_Text;
    }
    else if(msg.indexOf(ChatCommend_Version) != NOKEY){
        resText =Version_Text;
    }
}

function chkDietRegist(msgText) {
    if (msgText.indexOf(ChatCommend_DietRegist) != NOKEY) {
        chkDayoftheWeek(msgText);
        chkMealTime(msgText);
        if (DayoftheWeek + nRegistMealTime > 0) {
            if(Company == PNS){
                // PNS 추가 필요
                resText = "구현 예정";
            }
            else if(Company == LG){
                TableChart[DayoftheWeek * MEAL + nRegistMealTime] = msgText.substring(13);
                resText = "식단 등록 완료";
            }
        }
    }
}

function chkCompany(msgText){
    if(msgText.indexOf("PNS") != NOKEY){
        res = PNS;
        resText = "회사변경:PNS";
    }
    else if(msgText.indexOf("LG") != NOKEY){
        res = LG;
        resText = "회사변경:LG";
    }
    Company = res;
}

function chkDayoftheWeek(msgText){

    if(msgText.indexOf("[월/") != NOKEY){
        res = MON;
    }
    else if (msgText.indexOf("[화/") != NOKEY){
        res = TUE;
    }
    else if (msgText.indexOf("[수/") != NOKEY){
        res = WEN;
    }
    else if (msgText.indexOf("[목/") != NOKEY){
        res = THU;
    }
    else if (msgText.indexOf("[금/") != NOKEY){
        res = FRI;
    }
    else{
        res = INIT;
    }
    DayoftheWeek = res;
}

function chkMealTime(msgText){
    if(msgText.indexOf("아침]") != NOKEY){
        res = BreakFast;
    }
    else if (msgText.indexOf("점심]") != NOKEY){
        res = Lunch;
    }
    else if (msgText.indexOf("저녁]") != NOKEY){
        res = Dinner;
    }
    else{
        res = INIT;
    }
    nRegistMealTime = res;
}
