document.addEventListener('DOMContentLoaded', function() {
    const eyes = document.querySelectorAll('.eye');
  
    let mouseX = 0;
    let mouseY = 0;
    const thresholdMax = 300;
    const thresholdMin = 100;
  
    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
  
      eyes.forEach(eye => {
        const eyeRect = eye.getBoundingClientRect();
        const distance = Math.sqrt(Math.pow(mouseX - (eyeRect.left + eyeRect.width / 2), 2) + Math.pow(mouseY - (eyeRect.top + eyeRect.height / 2), 2));

        if (thresholdMin < distance && distance <= thresholdMax) {
            eye.querySelectorAll('.square').forEach(square => {
                square.style.height = Math.min(2.25, 5 - (5 * distance / thresholdMax)) + 'vw';
            });
        }
        else if (distance < thresholdMin) {
            eye.querySelectorAll('.square').forEach(square => {
                square.style.height = 3.9 - (5 * distance / thresholdMax) + 'vw';
            });
        }
        else {
            eye.querySelectorAll('.square').forEach(square => {
                square.style.height = 0 + 'vw';
                delta = 1;
            });
        }
      });
    });
  
    function updateEyePosition() {
      eyes.forEach(eye => {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
  
        const deltaX = mouseX - eyeCenterX;
        const deltaY = (mouseY - eyeCenterY) ;
        const angle = Math.atan2(deltaY, deltaX);
  
        const distance = Math.min(2, Math.sqrt(deltaX * deltaX + deltaY * deltaY)); // Giới hạn tốc độ theo dõi của lòng mắt
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;
  
        const pupil = eye.querySelector('.pupil');
        if (pupil) {
          pupil.style.width = '3vw'; // Độ rộng của lòng đen
          pupil.style.height = '3vw'; // Độ cao của lòng đen
          pupil.style.transform = `translate(-50%, -50%) translate(${translateX}vw, ${translateY}vw)`;
        }
      });
  
      requestAnimationFrame(updateEyePosition);
    }
  
    updateEyePosition();
  });
  