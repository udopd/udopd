(() => {
  emailjs.init({
    publicKey: "JtoiCVCuAWGfCSUoF",
  });

  const form = document.getElementById('sub-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = form.querySelector('[role="status"]');

  function showStatus(key) {
    status.textContent = window.SUPER_CUBE_TRANSLATIONS[document.documentElement.lang][key];
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (submit && submit.disabled) return;
    if (submit) submit.disabled = true;

    if (typeof showStatus === 'function') {
      showStatus('subscriptionSending');
    }

    const emailInput = form.querySelector('input[type="email"]');
    const templateParams = {
      email: emailInput.value.trim(),
    };

    try {
      const response1 = await emailjs.send('super-cube-emailjs', 'super-cube-new-sub', templateParams);
      const response2 = await emailjs.send('super-cube-emailjs', 'super-cube-for-sub', templateParams);

      if (response1.status !== 200 && response2.status !== 200) {
        throw new Error('Subscription request failed');
      }

      form.reset();
      showStatus('subscriptionSuccess');
    } catch (error) {
      showStatus('subscriptionError');
    } finally {
      if (submit) submit.disabled = false;
    }
  });
})();