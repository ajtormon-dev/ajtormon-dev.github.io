document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Theme Initialization (Exclusively Dark Theme)
    // -------------------------------------------------------------
    const body = document.body;
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');

    // -------------------------------------------------------------
    // 2. Mobile Menu Navigation
    // -------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        }
    });

    // -------------------------------------------------------------
    // 3. Scroll Reveal Animations (IntersectionObserver)
    // -------------------------------------------------------------
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    // -------------------------------------------------------------
    // 4. Skills Category Filtering
    // -------------------------------------------------------------
    const tabButtons = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from other tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    // Trigger a micro fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. Interactive Dev Terminal Mockup
    // -------------------------------------------------------------
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const terminalShortcuts = document.querySelectorAll('.btn-shortcut');
    const currentTimeSpan = document.getElementById('current-time');
    
    // Set current time in header
    const updateTime = () => {
        const now = new Date();
        currentTimeSpan.textContent = now.toISOString().replace('T', ' ').substring(0, 19);
    };
    updateTime();
    setInterval(updateTime, 1000);

    // Terminal Commands Dataset
    const commands = {
        help: `Available commands:
  <span class="cmd-text">about</span>        - Get Al James' professional summary
  <span class="cmd-text">skills</span>       - List core technical stack and skills
  <span class="cmd-text">experience</span>   - View professional employment history
  <span class="cmd-text">credentials</span>  - View certifications and education
  <span class="cmd-text">contact</span>      - Get links and email addresses
  <span class="cmd-text">clear</span>        - Clear terminal history`,
        
        about: `<b>Al James Tormon - AI-Augmented Software Engineer</b>
--------------------------------------------------
Lead Software Engineer with 10+ years of experience building scalable web
applications, leading development teams, and delivering business-critical solutions.
Blends traditional engineering excellence with modern AI-augmented workflows.`,

        skills: `<b>TECHNICAL TECH STACK &amp; SKILLS</b>
--------------------------------------------------
* <b>Languages</b>: PHP 7/8, JavaScript, TypeScript, SQL, HTML, CSS (SASS/Less)
* <b>Frameworks</b>: Laravel, CodeIgniter, Zend Framework, React, Vue.js, jQuery
* <b>Databases</b>: MySQL, PostgreSQL
* <b>Testing</b>: Playwright, Vitest
* <b>Methodologies</b>: Agile/Scrum (Certified ScrumMaster), RESTful APIs, SOAP`,

        experience: `<b>PROFESSIONAL EXPERIENCE</b>
--------------------------------------------------
* <b>Lead Software Engineer | PACESoft</b> (Nov 2018 - Jun 2024)
  Led architecture and delivery of scalable web applications. Managed code reviews,
  coding standards, performance optimizations, and mentored development teams.
  
* <b>Project Manager | Project Assistant PH</b> (Mar 2017 - Jan 2018)
  Managed software timelines, Agile sprints, budgets, quality assurance, and stakeholders.
  
* <b>Software Engineer | Callbox Inc.</b> (May 2014 - Mar 2017)
  Developed, designed, and maintained main corporate portals, resolving legacy defects.`,

        credentials: `<b>EDUCATION &amp; CERTIFICATIONS</b>
--------------------------------------------------
* <b>Certified ScrumMaster (CSM)</b>
  Scrum Alliance (May 2025 - May 2027) | Credential ID: 2076786C
  
* <b>B.S. in Information Technology</b>
  Central Philippine University (Class of 2010 - 2014) | Iloilo, Philippines`,

        contact: `<b>CONTACT &amp; SOCIAL INFORMATION</b>
--------------------------------------------------
* <b>Email</b>    : ajtormon.dev@gmail.com
* <b>Phone</b>    : +63 (991) 964 5865
* <b>Location</b> : Pavia, Iloilo, Philippines 5001
* <b>GitHub</b>   : https://github.com
* <b>LinkedIn</b> : https://linkedin.com`
    };

    // Helper to print command outputs
    const writeToTerminal = (text, type = 'output') => {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = text;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    };

    // Command Processor
    const executeCommand = (cmdText) => {
        const cleanCmd = cmdText.trim().toLowerCase();
        
        // Print command echo
        writeToTerminal(`ajtormon@dev:~$ ${cleanCmd}`, 'input-echo');

        if (cleanCmd === '') {
            return;
        }

        if (cleanCmd === 'clear') {
            terminalBody.innerHTML = '';
            return;
        }

        if (commands[cleanCmd]) {
            writeToTerminal(commands[cleanCmd], 'output');
        } else {
            writeToTerminal(`Command not found: <span class="cmd-text">${cleanCmd}</span>. Type <span class="cmd-text">'help'</span> for details.`, 'error');
        }
    };

    // Listen to Enter Key in Terminal
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const commandValue = terminalInput.value;
            executeCommand(commandValue);
            terminalInput.value = '';
        }
    });

    // Shortcuts mapping
    terminalShortcuts.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.getAttribute('data-command');
            executeCommand(command);
        });
    });

    // Focus input on body terminal container click
    document.querySelector('.terminal-container').addEventListener('click', () => {
        terminalInput.focus();
    });

    // -------------------------------------------------------------
    // 6. Copy to Clipboard Action
    // -------------------------------------------------------------
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-clipboard-target');
            const targetEl = document.querySelector(targetSelector);
            const textToCopy = targetEl.textContent || targetEl.innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });

    // -------------------------------------------------------------
    // 7. Contact Form Simulation
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const action = contactForm.getAttribute('action');
            
            // If action is still placeholder, simulate submission locally
            if (action.includes('placeholder')) {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending Message...</span>';
                
                setTimeout(() => {
                    formStatus.textContent = "Thank you! Your message has been sent successfully. (Simulated)";
                    formStatus.className = "form-status-msg success";
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    contactForm.reset();
                    
                    setTimeout(() => {
                        formStatus.textContent = "";
                        formStatus.className = "form-status-msg";
                    }, 5000);
                }, 1200);
            }
        });
    }

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});
