
// 유효성 검사 여부를 기록할 객체 생성
const checkObj = { 
    "memberEmail"     : true,
    "memberPw"        : false,
    "memberPwConfirm" : false,
    "memberNickname"  : false,
    "memberTel"       : false,
    "sendEmail"       : false   // 인증번호 발송 체크
};


// 인증번호 보내기
const sendBtn = document.getElementById("sendBtn");
const cMessage = document.getElementById("cMessage");

// 타이머에 사용될 변수
let checkInterval; // setInterval을 저장할 변수
let min = 4;
let sec = 59;

sendBtn.addEventListener("click", function(){

    if( checkObj.memberEmail ){ // 유효한 이메일이 작성되어 있을 경우에만 메일 보내기

        $.ajax({
            url : "sendEmail"  ,
            data : { "inputEmail" : memberEmail.value },
            type : "GET",
            success : function(result){
                console.log("이메일 발송 성공");
                console.log(result);

                // 인증 버튼이 클릭되어 정상적으로 메일이 보내졌음을 checkObj에 기록
                checkObj.sendEmail = true;

            },
            error : function(){
                console.log("이메일 발송 실패")
            }
        });
        
       	// Mail 발송 ajax코드는 동작이 느림...
       	// ->  ajax 코드가 비동기이기 때문에 메일이 보내지는것을 기다리지 않고
       	// 바로 다음 코드 수행!
        
        // 5분 타이머
        // setInterval(함수, 지연시간)
        cMessage.innerText = "5:00"; // 초기값 5분
        min = 4;
        sec = 59;
        
        cMessage.classList.remove("confirm");
        cMessage.classList.remove("error");
        
        checkInterval = setInterval(function() {
			if( sec < 10 ) sec = "0" + sec;
			cMessage.innerText = min + ":" + sec;
			
			if(Number(sec) === 0) {
				min--;
				sec = 59;
			} else {
				sec--;
			}
			
			if(min === -1) { //만료
				cMessage.classList.add("error");
				cMessage.innerText = "인증번호가 만료되었습니다.";
				
				clearInterval(checkInterval); //checkInterval 반복 지움
			}
			
			
		}, 1000); // 1초 지연 후 수행
        
        
        alert("인증번호가 발송되었습니다. 이메일을 확인해주세요.");

    }
});
