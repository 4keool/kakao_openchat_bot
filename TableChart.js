const scriptName="response.js";

// Define
const TRUE = 1;
const FALSE = -1;
const BreakFast = 0;
const Lunch = 1;
const Dinner = 2;
const MEAL = 3;

// Commend
const ChatCommend_BreakFast = "!아침";
const ChatCommend_Lunch = "!점심";
const ChatCommend_Dinner = "!저녁";
const ChatCommend_Meal = "!밥";
const ChatCommend_Help = "!도움";
const ChatCommend_Version = "!버전";
const ChatCommend_ServingTime = "!배식시간";

var nWeekDayoftheWeek = 0;      // 0~6 일~토
var CurrentHour = 0;            // 0~23
var CurrentMin = 0;             // 0~59

var MealTime = new Array(MEAL);
var TableChart = new Array(5*MEAL);
TableChart[0] = "월요일 아침\n";
TableChart[1] = "월요일 점심\n";
TableChart[2] = "월요일 저녁\n";
TableChart[3] = "화요일 아침\n";
TableChart[4] = "화요일 점심\n";
TableChart[5] = "화요일 저녁\n";
TableChart[6] = "수요일 아침\n";
TableChart[7] = "수요일 점심\n";
TableChart[8] = "수요일 저녁\n";
TableChart[9] = "목요일 아침\n";
TableChart[10] = "목요일 점심\n";
TableChart[11] = "목요일 저녁\n";
TableChart[12] = "금요일 아침\n";
TableChart[13] = "금요일 점심\n";
TableChart[14] = "금요일 저녁\n";


// Variable
var Today = new Date();
var resText = "";

var Help_Text = "※ Help ※\n" +
                "!아침:당일 아침 메뉴를 불러온다.\n" +
                "!점심:당일 점심 메뉴를 불러온다.\n" +
                "!저녁:당일 저녁 메뉴를 불러온다.\n" +
                "!밥:다음 식사의 메뉴를 불러온다.\n" +
                "!배식시간:배식시간을 불러온다.\n" +
                "!도움:도움말을 띄운다.";
var Version_Text = "※ Version ※\n" +
                "Beta 1.0\n" +
                "Build 21.01.19\n\n" + 
                "--Ver 1.0--\n" +
                "- 기본적인 동작 및 기틀 제작\n" +
                "--Ver 1.1\n--" +
                "[추가될 기능]\n" +
                "1) 메뉴 데이터 관리\n" +
                "2) 배식시간 데이터 관리\n" + 
                "3) 배식시간으로 기능 분할\n" +
                "4) P&S와 LG 구분하여 관리";


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

    switch(msg)
    {
        case ChatCommend_BreakFast:
            resText = TableChart[DayoftheWeek + BreakFast];
            break;

        case ChatCommend_Lunch:
            resText = TableChart[DayoftheWeek +Lunch];
            break;

        case ChatCommend_Dinner:
            resText = TableChart[DayoftheWeek +Dinner];
            break;

        case ChatCommend_Meal:
            if((CurrentHour >= 0) && (CurrentHour < 11))
                    resText = TableChart[DayoftheWeek + BreakFast];
            else if((CurrentHour >= 11) && (CurrentHour < 14))
                resText = TableChart[DayoftheWeek + Lunch];
            else if((CurrentHour >= 14) && (CurrentHour < 20))
                resText = TableChart[DayoftheWeek + Dinner];
            else if(CurrentHour >= 20)
                resText = "예정된 식사가 없습니다.";
            else
                resText = "예외 발생, CurrentHour:" + CurrentHour;
            break;

        case ChatCommend_ServingTime:
            resText = "아침:" + MealTime[BreakFast].getHours() + "시" + MealTime[BreakFast].getMinutes() + "분 ~ "
                        + (MealTime[BreakFast].getHours() + 1) + "시" + MealTime[BreakFast].getMinutes() + "분\n"
                        + "점심:"+ MealTime[Lunch].getHours() + "시" + MealTime[Lunch].getMinutes() + "분 ~ "
                        + (MealTime[Lunch].getHours() + 1) + "시" + MealTime[Lunch].getMinutes() + "분\n"
                        +"저녁:"+ MealTime[Dinner].getHours() + "시" + MealTime[Dinner].getMinutes() + "분 ~ "
                        + (MealTime[Dinner].getHours() + 1) + "시" + (MealTime[Dinner].getMinutes() - 30) + "분";
            break;

        case ChatCommend_Help:
            resText = Help_Text;
            break;
        
        case ChatCommend_Version:
            resText = Version_Text;
            break;
    }
}
