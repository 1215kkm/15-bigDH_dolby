const textElement = document.querySelector(".typing-text");
let textContent = textElement.innerHTML; // 원본 텍스트 저장
textElement.innerHTML = ""; // 초기화

const typingSpeed = 50; // 타이핑 속도 (밀리초 단위)

let charIndex = 0;

function typeText() {
    if (charIndex < textContent.length) {
        const char = textContent[charIndex];

        // HTML 태그(<br>) 처리
        if (char === "<") {
            const closingIndex = textContent.indexOf(">", charIndex);
            textElement.innerHTML += textContent.slice(charIndex, closingIndex + 1);
            charIndex = closingIndex + 1;
        } else {
            const span = document.createElement("span");
            span.textContent = char; // 공백 포함
            span.classList.add("typing-char");
            textElement.appendChild(span);
        }

        charIndex++;

        setTimeout(typeText, typingSpeed); // 일정한 속도로 출력
    }
}

typeText();
