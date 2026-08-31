/* RKC Financials and Insurance Services - site scripts (vanilla, no dependencies) */
(function () {
  'use strict';

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- reveal on scroll ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

      revealables.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
        io.observe(el);
      });
    } else {
      revealables.forEach(function (el) { el.classList.add('in'); });
    }
  }

  /* ---------- quote / contact forms ----------
     These pages are static HTML, so there is no server to post to. Each form
     builds a pre-filled email instead, which works on every device.

     TO CONNECT A REAL BACKEND: give the <form> an action + method
     (Formspree, Netlify Forms, Basin, your own script) and delete this block.
  --------------------------------------------------------------------------- */
  var AGENCY_EMAIL = document.body.getAttribute('data-agency-email') || '';

  document.querySelectorAll('form[data-mailto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) { return; }
      e.preventDefault();

      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        if (String(value).trim() !== '') {
          lines.push(key + ': ' + value);
        }
      });
      lines.push('');
      lines.push('Sent from the RKC Financials and Insurance Services website.');

      var subject = form.getAttribute('data-subject') || 'Website quote request';
      var href = 'mailto:' + AGENCY_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = form.querySelector('.form-status');
      if (status) {
        status.textContent =
          'Opening your email app with the details filled in. Prefer to talk? Call (580) 471-5506.';
        status.classList.add('show');
      }
    });
  });

  /* ---------- current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
