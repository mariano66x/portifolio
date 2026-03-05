document.addEventListener('DOMContentLoaded', () => {

    const translations = {

        navHome: { pt: "Início", en: "Home" },
        navSkills: { pt: "Habilidades", en: "Skills" },
        navProjects: { pt: "Projetos", en: "Projects" },
        navContact: { pt: "Contato", en: "Contact" },

        heroGreeting: { pt: "Olá, eu sou", en: "Hello, I am" },
        heroName: { pt: "Murillo Mariano", en: "Murillo Mariano" },
        heroBio: { pt: "Apenas um aluno que gosta de fazer site, aplicativos e testar coisas novas, com novos desafios.", en: "Just a student who enjoys creating websites, apps, and testing new things, with new challenges." },
        heroButton: { pt: "Ver Projetos", en: "View Projects" },

        skillsTitle: { pt: "Minhas Habilidades", en: "My Skills" },
        skillTeam: { pt: "Trabalho em equipe", en: "Teamwork" },
        skillComm: { pt: "Comunicação", en: "Communication" },

        projectsTitle: { pt: "Meus Projetos de Destaque", en: "Featured Projects" },
        project1Title: { pt: "Site De Ocorrencias para Escola (Projeto Privado)", en: "Incident Reporting Site (Private Project)" },
        project1Desc: { pt: "Site feito para registrar ocorrencias de alunos na escola, e com isso facilitar o trabalho dos monitores.", en: "Website designed to record student incidents at school, thus facilitating the work of the monitors." },
        project2Title: { pt: "Site Teste de um Cardapio", en: "Pizzeria Menu Test Site" },
        project2Desc: { pt: "Site Teste desenvolvido em HTML e CSS para aula.", en: "Test site developed in HTML and CSS for class." },
        project3Title: { pt: "Carregando...", en: "Loading..." },
        project3Desc: { pt: "Em construção...", en: "Under construction..." },
        btnDemo: { pt: "Demo", en: "Demo" },
        btnCode: { pt: "Código", en: "Code" },

        contactTitle: { pt: "Vamos Trabalhar Juntos?", en: "Shall We Work Together?" },
        contactSubtitle: { pt: "Entre em contato para orçamentos, parcerias ou apenas para tomar um café virtual.", en: "Get in touch for quotes, partnerships, or just to grab a virtual coffee." },
        formName: { pt: "Seu Nome", en: "Your Name" },
        formEmail: { pt: "Seu Email", en: "Your Email" },
        formMessage: { pt: "Sua Mensagem", en: "Your Message" },
        formSend: { pt: "Enviar Mensagem", en: "Send Message" },

        footerText: { pt: "© 2025 Murillo Mariano Garcia. Feito com paixão e código.", en: "© 2025 Murillo Mariano Garcia. Made with passion and code." }
    };

    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('lang') || 'pt';

    function translatePage(lang) {
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (translations[key] && translations[key][lang]) {
                const translation = translations[key][lang];

                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                }
  
                else if (element.tagName === 'BUTTON' && element.classList.contains('primary-btn')) {
                    element.textContent = translation;
                }
                else if (element.tagName === 'SPAN' && element.parentElement.classList.contains('outline-btn')) {
                    element.textContent = translation;
                }
                else {
                    element.textContent = translation;
                }
            }
        });

        langButtons.forEach(btn => {
            btn.classList.remove('active-lang');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active-lang');
            }
        });

        currentLang = lang;
        localStorage.setItem('lang', lang);
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            translatePage(lang);
        });
    });

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const themeIcon = modeToggle.querySelector('i');

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeIcon.className = 'fas fa-moon';
        } else {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeIcon.className = 'fas fa-sun';
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    modeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-mode');
        setTheme(isDarkMode ? 'light' : 'dark');
    });

    const skillsSection = document.getElementById('habilidades');
    const skillBars = document.querySelectorAll('.bar');
    let hasAnimated = false;

    function animateSkills() {
        if (!skillsSection || hasAnimated) return;

        const sectionTop = skillsSection.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (sectionTop < screenHeight - 100) {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                bar.style.width = percent + '%';
            });
            hasAnimated = true;
            window.removeEventListener('scroll', animateSkills);
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const successMessage = "Mensagem enviada com sucesso! (Simulação)";
            formMessage.style.color = 'var(--primary-color)';
            formMessage.textContent = successMessage;

            contactForm.reset();

            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    translatePage(currentLang);

});