(() => {
  const form = document.getElementById('tg-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');

  function showStatus(key) {
    status.textContent = window.SUPER_CUBE_TRANSLATIONS[document.documentElement.lang][key];
  }

  form.addEventListener('submit', async (event) => {
    const url = `https://telegram.org{'BOT_TOKEN'}/sendMessage?chat_id=${'CHAT_ID'}&text=${encodeURIComponent("НОВЫЙ ПОДПИСЧИК!")}`;
    
    event.preventDefault();
    if (submit.disabled) return;

    const fields = new FormData(form);
    submit.disabled = true;
    showStatus('subscriptionSending');

    try {
      const response = await fetch('/api/project-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: fields.get('email'), agreement: fields.has('agreement') }),
      });

      if (response.status !== 204) throw new Error('Subscription request failed');
      form.reset();
      showStatus('subscriptionSuccess');
    } catch {
      showStatus('subscriptionError');
    } finally {
      submit.disabled = false;
    }
  });
})();
