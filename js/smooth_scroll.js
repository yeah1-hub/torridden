const lenis = new Lenis({
    duration: 2,
    // 스크롤 애니메이션 지속 시간. 숫자가 클수록 느리고 부드럽게 움직임

    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // 스크롤 감속 곡선. 처음엔 빠르게, 끝에서 부드럽게 멈추는 ease-out 효과

    prevent: (node) => node.classList.contains('line_right_box'),
    // 스크롤 이벤트 발생할 때마다 해당 요소가 line_right_box인지 체크
    // true면 Lenis가 손떼고 브라우저 기본 스크롤에게 넘김
});

function raf(time) {
    lenis.raf(time);
    // lenis에게 현재 시간을 전달해서 스크롤 애니메이션을 계산하게 함
    requestAnimationFrame(raf);
    // 다음 프레임에 다시 raf 함수를 호출 → 무한 루프로 매 프레임마다 실행
}

requestAnimationFrame(raf);
// 브라우저에게 "다음 화면 그릴 때 raf 함수 실행해줘" 하고 시작을 킥오프

gsap.registerPlugin(ScrollTrigger);
// GSAP에 ScrollTrigger 플러그인을 등록. 이걸 해야 ScrollTrigger 사용 가능

lenis.on('scroll', ScrollTrigger.update);
// Lenis가 스크롤될 때마다 ScrollTrigger에게 "스크롤 위치 바뀌었어" 알림
// 이게 없으면 Lenis 스크롤 중에 ScrollTrigger 애니메이션이 어긋남

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
// GSAP의 내부 타이머에 lenis를 연동
// GSAP ticker는 초 단위, lenis는 밀리초 단위라 *1000 해서 맞춰줌

gsap.ticker.lagSmoothing(0);
// 탭 전환이나 백그라운드 등으로 프레임이 튀었을 때 GSAP이 따라잡으려는 동작을 끔
// 0이면 보정 없이 그냥 현재 시점부터 자연스럽게 이어감



/*prevent 옵션은 Lenis가 특정 요소 위에서 스크롤을 가로채지 말라고 예외를 지정하는 것.
Lenis는 기본적으로 페이지 전체의 스크롤 이벤트를 자기가 다 처리함. 
그래서 line_right_box 안에서 휠을 굴려도 Lenis가 "내가 처리할게" 하고 
가져가버려서 내부 스크롤이 동작을 못 한 것임.
prevent에 함수를 넣으면 Lenis가 스크롤 이벤트 발생 시마다 "이 요소, 내가 처리해도 돼?" 하고 체크함. 
true를 반환하면 Lenis가 손을 떼고 브라우저 기본 스크롤에게 넘겨줌.  */