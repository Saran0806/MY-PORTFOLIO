const typingEl = document.getElementById('typing');
    const phrases = ['FULLSTACK-DEVELOPER', 'Python • Flask • Django', 'Responsive Web • APIs', 'Open to work'];
    let pIndex = 0, chIndex = 0, forward = true;

    function typeLoop() {
      const current = phrases[pIndex];
      if (forward) {
        chIndex++;
        if (chIndex > current.length) { forward = false; setTimeout(typeLoop, 900); return; }
      } else {
        chIndex--;
        if (chIndex < 0) { forward = true; pIndex = (pIndex + 1) % phrases.length; setTimeout(typeLoop, 200); return; }
      }
      typingEl.textContent = current.slice(0, chIndex);
      setTimeout(typeLoop, forward ? 60 : 30);
    }
    typeLoop();

    // animate progress bars on load / intersection
    document.addEventListener('DOMContentLoaded', ()=> {
      const spans = document.querySelectorAll('.progress span');
      spans.forEach(s => {
        const w = s.getAttribute('data-width') || '80%';
        setTimeout(()=> s.style.width = w, 180);
      });

      // fill year
      document.getElementById('year').textContent = new Date().getFullYear();
    });

    // mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenuEl = document.getElementById('mobile-menu');
    hamburger && hamburger.addEventListener('click', ()=> toggleMobileMenu());

    function toggleMobileMenu(){
      const isOpen = mobileMenuEl.style.display === 'block';
      mobileMenuEl.style.display = isOpen ? 'none' : 'block';
      document.querySelector('.hamburger').setAttribute('aria-expanded', String(!isOpen));
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth', block:'start'});
          // close mobile menu if open
          if (mobileMenuEl.style.display === 'block') toggleMobileMenu();
        }
      });
    });

    // simple contact form handler (no backend) — shows a message and clears
    function handleContact(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const mail = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      const note = document.getElementById('contact-note');

      if (!name || !mail || !msg) {
        note.style.display = 'block';
        note.textContent = 'Please fill name, email and message.';
        return;
      }
      // In production: send via email API or backend. For now show confirmation
      note.style.display = 'block';
      note.textContent = 'Thanks, ' + (name||'there') + '! Your message was noted — I will respond via email soon.';
      e.target.reset();
    }
