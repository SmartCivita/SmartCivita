
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
                rol: 'Líder de Desarrollo Backend',
                descripcion: 'Josep es la fuerza detrás de nuestra infraestructura de datos y lógica de negocio. Con más de 10 años de experiencia, asegura sistemas robustos y escalables.',
                habilidades: {
                    "Python & Django": "Experto en APIs y servicios RESTful.",
                    "Bases de Datos": "SQL (PostgreSQL) y NoSQL (MongoDB), diseño y optimización.",
                    "Cloud Computing": "Experiencia con AWS para despliegue y gestión de servicios."
                }
            },
            'Yimis': {
                rol: 'Desarrollador Mobile',
                descripcion: 'Especialista en desarrollo de aplicaciones móviles Android y iOS con experiencia en interfaces intuitivas.',
                habilidades: {
                    "Kotlin & Java": "Desarrollo Android nativo.",
                    "Swift & Objective-C": "Desarrollo iOS.",
                    "Flutter & React Native": "Multiplataforma."
                }
            },
            'Bayron': {
                rol: 'Desarrollador Frontend',
                descripcion: 'Apasionado por la experiencia de usuario, construye interfaces limpias y modernas.',
                habilidades: {
                    "React & Angular": "Desarrollo web dinámico.",
                    "UX/UI": "Enfoque en experiencia de usuario.",
                    "HTML, CSS & JS": "Fundamentos sólidos."
                }
            },
            'Joriel': {
                rol: 'Desarrollador de Inteligencia Artificial',
                descripcion: 'Investigador y creador de soluciones inteligentes para problemas complejos.',
                habilidades: {
                    "Machine Learning": "Modelos predictivos y clasificación.",
                    "Deep Learning": "Redes neuronales avanzadas.",
                    "Procesamiento de Datos": "Optimización y análisis de grandes volúmenes."
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