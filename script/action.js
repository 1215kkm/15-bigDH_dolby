// ul.gnb 요소 선택
const gnb = document.querySelector('ul.gnb');
const hamburger = document.querySelector('.hamburger');

// nav.gnb_mo 요소 선택
const gnbMo = document.querySelector('.gnb_mo');

// ul.gnb의 내용을 nav.gnb_mo로 복사
gnbMo.innerHTML = gnb.innerHTML;

// hamburger.addEventListener('click', function () {
//       gnbMo.style.display = 'flex';
//       this.classList.toggle('active');
// })
// gnbMo.addEventListener('click', function (e) {
//     if (e.target === gnbMo) {
//       gnbMo.style.display = 'none';
//     }
// })

$('.hamburger').on('click', function () {
    $(this).toggleClass('active');

    const $menu = $('.gnb_mo');

    if ($menu.is(':visible')) {
      // 닫을 때
      $menu.fadeOut(200, function () {
        $menu.css('display', 'none');
      });
    } else {
      // 열 때: flex로 지정
      $menu.css('display', 'flex').hide().fadeIn(200);
    }
  });
// 2. li 클릭 시 그 안의 .lnb 슬라이드 토글
$('ul.gnb_mo > li').on('click', function (e) {
    e.stopPropagation(); // 부모로 이벤트 전파 방지

    const $lnb = $(this).children('ul.lnb');

    // 다른 열린 lnb는 닫기
    $('ul.gnb_mo ul.lnb').slideUp();

    // 현재 lnb는 토글
    $(this).find('.lnb').stop().slideToggle();
  });