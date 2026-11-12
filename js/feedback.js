(() => {
  const form = document.getElementById('tg-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');

  const BOT_TOKEN = 'BOT_TOKEN';
  const CHAT_ID = 'CHAT_ID';

  function showStatus(key) {
    status.textContent = window.SUPER_CUBE_TRANSLATIONS[document.documentElement.lang][key];
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submit.disabled) return;

    const fields = new FormData(form);
    const email = fields.get('email');
    const messageText = `НОВЫЙ ПОДПИСЧИК!\nEmail: ${email}`;

    const url = `https://telegram.org{BOT_TOKEN}/sendMessage`;

    submit.disabled = true;
    showStatus('subscriptionSending');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
        }),
      });

      if (!response.ok) throw new Error('Subscription request failed');
      
      form.reset();
      showStatus('subscriptionSuccess');
    } catch {
      showStatus('subscriptionError');
    } finally {
      submit.disabled = false;
    }
  });
})();
