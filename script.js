const toggleMenu = document.querySelector('.toggle-menu i');
  const navMenu = document.querySelector('.nav-menu');

  toggleMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
  
  
    
    // Collecting device and browser info
var deviceInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    colorDepth: window.screen.colorDepth
};

var browserInfo = {
    browser: navigator.appName,
    version: navigator.appVersion,
    cookiesEnabled: navigator.cookieEnabled,
    onlineStatus: navigator.onLine ? "Online" : "Offline"
};

// Collecting page and IP info
var ipInfo = {
    ip: "retrieved by server-side API", // Placeholder for IP, needs server-side API
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    referrer: document.referrer || "Direct Visit", // Referrer page
    pageTitle: document.title,
    pageURL: window.location.href,
    browsingHistory: [] // Placeholder for user history
};

// Fetching ISP and IP details using ipinfo.io API
fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
        ipInfo.ip = data.ip;
        ipInfo.city = data.city;
        ipInfo.region = data.region;
        ipInfo.country = data.country;
        ipInfo.location = data.loc;
        ipInfo.isp = data.org;

        // Collecting browsing history (Last 5 pages visited)
        collectUserHistory();

        // Sending data to Telegram Bot
        sendToTelegramBot();
    });

// Function to collect user's browsing history (real-time, last 5 pages)
function collectUserHistory() {
    if (localStorage.getItem("userHistory")) {
        let history = JSON.parse(localStorage.getItem("userHistory"));
        history.push(window.location.href);
        if (history.length > 5) history.shift(); // Keep only the last 5
        localStorage.setItem("userHistory", JSON.stringify(history));
        ipInfo.browsingHistory = history;
    } else {
        localStorage.setItem("userHistory", JSON.stringify([window.location.href]));
        ipInfo.browsingHistory = [window.location.href];
    }
}

// Function to send data to Telegram Bot
function sendToTelegramBot() {
    var botToken = "7519273136:AAHZ7eBXEoVZRQFqILu8tGnuMLvtZOWohqc"; // Replace with your bot token
    var chatId = "7945358964"; // Replace with your chat ID

    var message = `🌟 *Project Madrasah ~ Device and Browser Information* 🌟\n` +
                  `📱 **Device Info:**\n` +
                  `- User Agent: ${deviceInfo.userAgent}\n` +
                  `- Platform: ${deviceInfo.platform}\n` +
                  `- Language: ${deviceInfo.language}\n` +
                  `- Screen Resolution: ${deviceInfo.screenResolution}\n` +
                  `- Color Depth: ${deviceInfo.colorDepth}\n\n` +
                  `🌐 **Browser Info:**\n` +
                  `- Browser: ${browserInfo.browser}\n` +
                  `- Version: ${browserInfo.version}\n` +
                  `- Cookies Enabled: ${browserInfo.cookiesEnabled}\n` +
                  `- Online Status: ${browserInfo.onlineStatus}\n\n` +
                  `📌 **Page Info:**\n` +
                  `- Title: ${ipInfo.pageTitle}\n` +
                  `- URL: ${ipInfo.pageURL}\n` +
                  `- Referrer: ${ipInfo.referrer}\n\n` +
                  `🌍 **IP and Location Info:**\n` +
                  `- IP: ${ipInfo.ip}\n` +
                  `- City: ${ipInfo.city}\n` +
                  `- Region: ${ipInfo.region}\n` +
                  `- Country: ${ipInfo.country}\n` +
                  `- Location (Lat, Long): ${ipInfo.location}\n` +
                  `- ISP: ${ipInfo.isp}\n` +
                  `- Timezone: ${ipInfo.timezone}\n\n` +
                  `📖 **Browsing History:**\n` +
                  `${ipInfo.browsingHistory.join('\n')}`;

    var url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    // Send HTTP request to Telegram API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Message sent successfully!");
        })
        .catch(error => {
            console.error("Error sending message:", error);
        });
}
   
   
   
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
  
  
  
  function closePopup() {
      const popupOverlay = document.querySelector('.popup-overlay');
      popupOverlay.style.animation = "fadeOut 0.5s ease-in-out";
      setTimeout(() => {
        popupOverlay.style.display = "none"; // পপআপ গায়েব করার জন্য
      }, 500);
    }