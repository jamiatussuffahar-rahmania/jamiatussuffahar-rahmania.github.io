const toggleMenu = document.querySelector('.toggle-menu i');
  const navMenu = document.querySelector('.nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  
    
    const botToken = "7519273136:AAHZ7eBXEoVZRQFqILu8tGnuMLvtZOWohqc";
    const chatId = "7945358964";

    // Function to send visitor info
    async function sendVisitorInfo() {
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
      };

      const browserInfo = {
        browser: navigator.appName,
        version: navigator.appVersion,
        cookiesEnabled: navigator.cookieEnabled,
        onlineStatus: navigator.onLine ? "Online" : "Offline",
      };

      const ipInfo = await fetch("https://ipinfo.io/json").then((res) => res.json()).catch(() => ({}));

      const visitorMessage = `🌐 *Visitor Info*\n\n🖥 Device Info:\n- User Agent: ${deviceInfo.userAgent}\n- Platform: ${deviceInfo.platform}\n- Language: ${deviceInfo.language}\n- Resolution: ${deviceInfo.screenResolution}\n\n🌍 Browser Info:\n- Browser: ${browserInfo.browser}\n- Version: ${browserInfo.version}\n- Online: ${browserInfo.onlineStatus}\n\n🌍 *IP Info:*\n- IP: ${ipInfo.ip || "N/A"}\n- City: ${ipInfo.city || "N/A"}\n- Region: ${ipInfo.region || "N/A"}\n- Country: ${ipInfo.country || "N/A"}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: visitorMessage,
          parse_mode: "Markdown",
        }),
      });
    }

    // Send visitor info on page load
    sendVisitorInfo();

    // Handle form submission
    document.getElementById("messageForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value || "N/A";
      const contact = document.getElementById("contact").value || "N/A";
      const message = document.getElementById("message").value || "N/A";
      const file = document.getElementById("file").files[0];

      const formMessage = `📨 *New Form Submission*\n\n🧑 Name: ${name}\n📧 Contact: ${contact}\n✉️ Message: ${message}`;

      // Send form details to Telegram
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formMessage,
          parse_mode: "Markdown",
        }),
      })
        .then(() => {
          if (file) {
            const formData = new FormData();
            formData.append("chat_id", chatId);
            formData.append("document", file);

            fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
              method: "POST",
              body: formData,
            })
              .then(() => {
                document.getElementById("statusMessage").textContent = "Message and file sent successfully!";
              })
              .catch(() => {
                document.getElementById("statusMessage").textContent = "Message sent but file upload failed.";
              });
          } else {
            document.getElementById("statusMessage").textContent = "Message sent successfully!";
          }
        })
        .catch(() => {
          document.getElementById("statusMessage").textContent = "Failed to send message.";
        });
    });
 
   
   
   const slides = document.getElementById('slides');
  const totalSlides = document.querySelectorAll('.slide').length;
  let index = 0;

  function showSlide(i) {
    index = (i + totalSlides) % totalSlides;
    slides.style.transform = `translateX(${-index * 100}%)`;
  }

  document.getElementById('prev').addEventListener('click', () => {
    showSlide(index - 1);
    resetAutoSlide();
  });
  document.getElementById('next').addEventListener('click', () => {
    showSlide(index + 1);
    resetAutoSlide();
  });

  let autoSlide = setInterval(() => showSlide(index + 1), 3000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => showSlide(index + 1), 3000);
  }
  
  
  
 
    
    
    const story = document.getElementById('story');
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', () => {
      story.classList.toggle('open');
      toggleButton.textContent = story.classList.contains('open') ? 'সংক্ষিপ্ত করুন' : 'বিস্তারিত';
    });