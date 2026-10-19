const form = document.querySelector('#brief-form');
const result = document.querySelector('#brief-result');
const output = document.querySelector('#generated-brief');
const status = document.querySelector('#copy-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const challenge = data.get('challenge').trim();
  output.value = [
    'AI workflow conversation brief',
    '',
    `My priority: ${data.get('focus')}`,
    `My challenge: ${challenge || 'To explore together.'}`,
    '',
    'First step: Identify one workflow and agree on a baseline for time, cost, and quality.',
    'Questions to discuss: What tools do we use? Who owns the process? Where is human review needed?',
  ].join('\n');
  status.textContent = '';
  result.hidden = false;
  output.focus();
});

document.querySelector('#copy-brief').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.value);
    status.textContent = 'Brief copied. Nothing has been sent.';
  } catch {
    output.focus();
    output.select();
    status.textContent = 'Your brief is selected. Use your device\'s copy command to copy it.';
  }
});


// Animate sections on entry without hiding content or changing keyboard access.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach((section) => observer.observe(section));
  motionPreference.addEventListener('change', (event) => {
    if (event.matches) {
      observer.disconnect();
      document.querySelectorAll('.is-revealed').forEach((section) => section.classList.remove('is-revealed'));
    }
  });
}
