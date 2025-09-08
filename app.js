
document.addEventListener('DOMContentLoaded', function() {
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.quadrant').forEach(quadrant => {
        observer.observe(quadrant);
    });

    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            createRipple(this, event);
            
            serviceItems.forEach((otherItem, otherIndex) => {
                if (otherIndex !== index) {
                    otherItem.style.transform = 'scale(0.95)';
                    otherItem.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', function() {
            serviceItems.forEach(otherItem => {
                otherItem.style.transform = '';
                otherItem.style.opacity = '';
            });
        });

     
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            
            showMemberInfo(this.querySelector('span').textContent);
        });
    });

   
    function createRipple(element, event) {
        const circle = document.createElement('div');
        const diameter = Math.max(element.clientHeight, element.clientWidth);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const rippleCSS = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
                z-index: 10;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = rippleCSS;
            document.head.appendChild(style);
        }
        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        element.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    //Funcion para descargar la CV
    window.downloadCV = function(name) {
        const cvFiles = {
            'Joseph': 'cvs/joseph.pdf',
            'Yimis': 'cvs/yimis.pdf',
            'Bayron': 'cvs/bayron.pdf',
            'Joriel': 'cvs/joriel.pdf'
        };
    
        const fileUrl = cvFiles[name];
        if (!fileUrl) {
            alert("CV no disponible para " + name);
            return;
        }
    
        //Hace que se abra la CV en una nueva pestaña
        window.open(fileUrl, '_blank');
    
        //Descarga la CV
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `CV_${name}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

        // MODAL
    function showMemberInfo(name) {
        const memberInfo = {
            'Joseph': {
                rol: 'Líder de Desarrollo',
                descripcion: 'Soy un desarrollador con 3 años de experiencia laboral en proyectos corporativos y universitarios, trabajando con equipos interfuncionales en entornos ágiles. Me destaco por el liderazgo en control de código, optimización de arquitecturas y automatización de procesos internos. Tengo certificaciones en Python, Django, SCRUM y otros, lo que me permite aportar soluciones escalables y eficientes.',
                habilidades: {
                    "Lenguajes y Backend": "Python, Django, FastAPI, NodeJS, Postman, IA, CI/CD",
                    "Frontend": "Angular, React, Tailwind, HTML5, CSS3, Bootstrap, JavaScript, TypeScript, SCSS, JQuery, AJAX",
                    "Bases de Datos": "MySQL, PostgreSQL, Firebase, MongoDB",
                    "Control de Versiones": "Git, GitHub, GitLab",
                    "Gestión de Proyectos": "Jira, Confluence, Slack, SCRUM",
                }
            },
            'Yimis': {
                rol: 'Desarrollador de Software',
                descripcion: 'Soy un desarrollador con conocimientos en Flutter/Dart para la creación de aplicaciones móviles multiplataforma, con experiencia en integración de APIs de mapas (Google Maps y OpenStreetMap). Manejo Python como apoyo para automatización y procesamiento de datos, y también C# en entornos financieros. Me caracterizo por la capacidad de aprendizaje rápido, adaptabilidad a nuevas tecnologías y orientación a resultados prácticos.',
                habilidades: {
                    "Lenguajes de Programación": "Python, Dart, C#",
                    "Desarrollo Móvil": "Aplicaciones Flutter/Dart con geolocalización, solicitudes de viaje tipo Uber",
                    "Backend y APIs": "Consumo e integración de APIs REST, mantenimiento de sistemas financieros en C#",
                    "Optimización de Rutas": "Google Maps API, OpenStreetMap",
                    "Desarrollo Web": "Aplicaciones para procesamiento y gestión de documentos logísticos",
                    "Procesamiento de Datos": "JSON, CSV, SQL, Pandas",
                    "Herramientas": "Git, GitHub, entornos virtuales (venv)"
                }
            },
            'Bayron': {
                rol: 'Desarrollador de Software',
                descripcion: 'Soy un desarrollador de software con formación académica y experiencia práctica en la creación de aplicaciones web y de escritorio, además de la automatización de procesos. Me caracterizo por mi adaptación, aprendizaje continuo y orientación a resultados.',
                habilidades: {
                    "Lenguajes de Programación": "Python, Java y C#",
                    "Backend y APIs": "Django, Flask, FastAPI, integración y consumo de APIs REST",
                    "Automatización": "Selenium, Web Scraping, Requests, BeautifulSoup",
                    "Datos": "Procesamiento con Pandas, JSON, CSV, SQL",
                    "Herramientas": "Git, GitHub, entornos virtuales (venv), interfaces gráficas con Tkinter / CustomTkinter"
                }
            },
            'Joriel': {
                rol: 'Desarrollador de Software',
                descripcion: 'Soy un desarrollador con sólidos conocimientos en programación, desarrollo web y gestión de bases de datos. Manejo Python, C++ y tecnologías web como HTML5, CSS3 y JavaScript. Tengo experiencia con MySQL y PostgreSQL, y me interesa especialmente el backend, la inteligencia artificial y la automatización. Me destaco por mi mentalidad de mejora continua y la búsqueda de soluciones eficientes y seguras.',
                habilidades: {
                    "Lenguajes de Programación": "Python (desde 2022), C++ (desde 2024)",
                    "Tecnologías Web": "HTML5, CSS3, JavaScript, Flask",
                    "Bases de Datos": "SQL, MySQL, PostgreSQL",
                    "Proyectos Personales": "Sistema de autenticación con reconocimiento facial (Flask, JS, HTML5, CSS3, MySQL, ArcFace), Reconocimiento facial en tiempo real con LBPH (Python, OpenCV)",
                }
            }

        };

        const member = memberInfo[name];

        const prevModal = document.getElementById('member-info-box');
        if (prevModal) prevModal.remove();

        const modal = document.createElement('div');
        modal.id = "member-info-box";
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #2E7D32, #1B5E20);
            color: #f5f5f5;
            padding: 50px;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.4);
            z-index: 1000;
            max-width: 800px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            overflow-x: hidden;
            scrollbar-gutter: stable;
            clip-path: inset(0 round 25px);
            transition: all 0.3s ease;
            font-family: 'Georgia', serif;
        `;
        //Aca pueden cambiar los colores y el formato de la card que se agrego despues de presionar los nombres
        modal.innerHTML = `
            <h1 style="text-align:center; font-size: 38px; margin-bottom: 10px; color:#FFFFFF;">${name}</h1> 
            <h3 style="text-align:center; font-size: 22px; color:#7fd650;; margin-bottom: 30px;">${member.rol}</h3>
            
            <div style="display:flex; flex-wrap:wrap; gap:40px; margin-bottom:30px;">
                <div style="flex:1; min-width:280px;">
                    <h2 style="font-size:20px; margin-bottom:15px; color:#66BB6A;">Descripción</h2>
                    <p style="line-height:1.8; color:#e0e0e0;">${member.descripcion}</p>
                </div>
                <div style="flex:1; min-width:280px;">
                    <h2 style="font-size:20px; margin-bottom:15px; color:#66BB6A;">Habilidades Técnicas</h2>
                    ${Object.entries(member.habilidades).map(([titulo, detalle]) => `
                        <div style="
                            background: #388E3C;
                            padding:20px;
                            border-radius:18px;
                            margin-bottom:15px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                        ">
                            <strong style="color:#7fd650;">${titulo}</strong>
                            <p style="font-size:14px; margin-top:8px; color:#f0f0f0;">${detalle}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="text-align:center; margin-top:30px;">
                <button onclick="downloadCV('${name}')" style="
                    background: linear-gradient(135deg, #4CAF50, #43A047);
                    border: none;
                    color: white;
                    padding: 14px 28px;
                    border-radius: 12px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 16px;
                    transition: background 0.3s;
                    margin-right: 15px;
                " onmouseover="this.style.background='linear-gradient(135deg, #66BB6A, #3f9a43)'" 
                onmouseout="this.style.background='linear-gradient(135deg, #4CAF50, #43A047)'">
                    Descargar CV de ${name}
                </button>

                <button onclick="document.getElementById('member-info-box').remove()" style="
                    background: #2E7D32;
                    border: 2px solid #66BB6A;
                    color: #fff;
                    padding: 12px 25px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 15px;
                    transition: all 0.3s;
                " onmouseover="this.style.background='#3f9a43'" 
                onmouseout="this.style.background='#2E7D32'">
                    Cerrar
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        if (!document.getElementById("modal-scroll-style")) {
            const style = document.createElement("style");
            style.id = "modal-scroll-style";
            style.textContent = `
                #member-info-box::-webkit-scrollbar {
                    width: 10px;
                }
                #member-info-box::-webkit-scrollbar-thumb {
                    background: #66BB6A;
                    border-radius: 10px;
                }
                #member-info-box::-webkit-scrollbar-thumb:hover {
                    background: #43A047;
                }
                #member-info-box::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
            `;
            document.head.appendChild(style);
        }
    }

    




    // EFECTO MQUINA DE ESCRIBIR
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const titles = document.querySelectorAll('.content-section h2');
    titles.forEach((title, index) => {
        const originalText = title.textContent;
        
        setTimeout(() => {
            if (title.getBoundingClientRect().top < window.innerHeight) {
                typeWriter(title, originalText, 80);
            }
        }, index * 500);
    });
    
});

document.querySelectorAll(".typing").forEach(el => {
  el.addEventListener("animationend", () => {
    el.style.borderRight = "none"; 
  });
});
document.querySelectorAll(".typing2").forEach(el => {
  el.addEventListener("animationend", () => {
    el.style.borderRight = "none"; 
  });
});
document.querySelectorAll(".typing3").forEach(el => {
  el.addEventListener("animationend", () => {
    el.style.borderRight = "none"; 
  });
});