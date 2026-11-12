(() => {
  const form = document.getElementById('tg-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');

  function showStatus(key) {
    status.textContent = window.SUPER_CUBE_TRANSLATIONS[document.documentElement.lang][key];
  }

  form.addEventListener('submit', async (event) => {
    const url = `https://api.telegram.org/bot${'BOT_TOKEN'}/sendMessage?chat_id=${'CHAT_ID'}&text=${encodeURIComponent("НОВЫЙ ПОДПИСЧИК!\nEmail: ${fields.get("email")}")}`;
    
    event.preventDefault();
    if (submit.disabled) return;

    const fields = new FormData(form);
    submit.disabled = true;
    showStatus('subscriptionSending');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status !== 200) throw new Error('Subscription request failed');
      form.reset();
      showStatus('subscriptionSuccess');
    } catch {
      showStatus('subscriptionError');
    } finally {
      submit.disabled = false;
    }
  });
})();
