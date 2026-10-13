(() => {
  'use strict';

  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (menuBtn && mobileNav) {
    const closeMenu = () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open navigation');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    };

    menuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  const money = amount => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

  const loanAmount = document.getElementById('loanAmount');
  const rate = document.getElementById('rate');
  const tenure = document.getElementById('tenure');

  function calculateEmi() {
    if (!loanAmount || !rate || !tenure) return;

    const principal = Number(loanAmount.value);
    const annualRate = Number(rate.value);
    const years = Number(tenure.value);
    const monthlyRate = annualRate / 1200;
    const months = years * 12;
    const emi = monthlyRate === 0
      ? principal / months
      : principal * monthlyRate * Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);
    const total = emi * months;

    document.getElementById('loanAmountOut').textContent = money(principal);
    document.getElementById('rateOut').textContent =
      annualRate.toFixed(2).replace(/0$/, '').replace(/\.$/, '') + '%';
    document.getElementById('tenureOut').textContent =
      years + (years === 1 ? ' year' : ' years');
    document.getElementById('emiValue').textContent = money(emi);
    document.getElementById('interestValue').textContent = money(total - principal);
    document.getElementById('totalValue').textContent = money(total);
  }

  [loanAmount, rate, tenure].forEach(input => {
    if (input) input.addEventListener('input', calculateEmi);
  });
  calculateEmi();

  const callbackForm = document.getElementById('callbackForm');
  if (callbackForm) {
    callbackForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!callbackForm.reportValidity()) return;

      const data = new FormData(callbackForm);
      const details = [
        'Hello Heritage Auto Finance, I would like a callback.',
        '',
        'Name: ' + String(data.get('name') || '').trim(),
        'Mobile: ' + String(data.get('mobile') || '').trim(),
        'Service: ' + String(data.get('service') || '').trim()
      ];
      const extra = String(data.get('message') || '').trim();
      if (extra) details.push('Additional details: ' + extra);

      const whatsappUrl = 'https://wa.me/917600211085?text=' +
        encodeURIComponent(details.join('\n'));
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // If the browser blocks a new tab, continue in the current tab instead.
      if (!opened) window.location.href = whatsappUrl;
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
