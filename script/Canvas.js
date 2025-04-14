const canvas = document.querySelector(".video-canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector(".video-content");
const maskImage = new Image();

// 캔버스 크기 동기화
function resizeCanvas() {
  const rect = canvas.getBoundingClientRect(); // CSS로 설정한 크기 읽어오기
  canvas.width = rect.width; // 캔버스 내부 크기 설정
  canvas.height = rect.height;
}

// PNG 이미지 로드
maskImage.src = "../images/logo.png";

maskImage.onload = () => {
  resizeCanvas(); // 캔버스 크기 설정

  video.play();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 동영상 크기 비율 유지 및 캔버스에 맞추기
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    let videoWidth, videoHeight;
    if (canvasAspectRatio > videoAspectRatio) {
      videoWidth = canvas.width;
      videoHeight = canvas.width / videoAspectRatio;
    } else {
      videoWidth = canvas.height * videoAspectRatio;
      videoHeight = canvas.height;
    }

    const videoX = (canvas.width - videoWidth) / 2; // 가로 중앙 정렬
    const videoY = (canvas.height - videoHeight) / 2; // 세로 중앙 정렬
    ctx.drawImage(video, videoX, videoY, videoWidth, videoHeight);

    // PNG 이미지 비율 유지 및 캔버스에 맞추기
    const imageAspectRatio = maskImage.width / maskImage.height;

    let imageWidth, imageHeight;
    if (canvasAspectRatio > imageAspectRatio) {
      imageWidth = canvas.width;
      imageHeight = canvas.width / imageAspectRatio;
    } else {
      imageWidth = canvas.height * imageAspectRatio;
      imageHeight = canvas.height;
    }

    const imageX = (canvas.width - imageWidth) / 2; // 가로 중앙 정렬
    const imageY = (canvas.height - imageHeight) / 2; // 세로 중앙 정렬

    ctx.globalCompositeOperation = "destination-in"; // 마스크로 자르기
    ctx.drawImage(maskImage, imageX, imageY, imageWidth, imageHeight);

    ctx.globalCompositeOperation = "source-over"; // 원래 상태로 복구
    requestAnimationFrame(draw); // 애니메이션 반복
  }
  draw();
};

// 오류 핸들링
maskImage.onerror = () => {
  console.error("Mask image failed to load.");
};
video.onerror = () => {
  console.error("Video failed to load.");
};
