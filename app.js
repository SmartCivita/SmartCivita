
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


    function showMemberInfo(name) {
        const memberInfo = {
            'Josep': 'Especialista en en Backend, APIs y Bases de Datos',
            'Yimis': 'Desarrollador en Mobile Android y iOS',
            'Bayron': 'Desarrollador Frontend y Experiencia de Usuario',
            'Joriel': 'Ingeniero Inteligencia artifical'
        };

        
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #4CAF50, #2E7D32);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 1000;
            text-align: center;
            max-width: 300px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
        `;

        modal.innerHTML = `
            <h3 style="margin-bottom: 15px; font-size: 24px; font-weight: 700;">${name}</h3>
            <p style="margin-bottom: 20px; opacity: 0.9; line-height: 1.5;">${memberInfo[name] || 'Miembro del equipo SmartCivita'}</p>
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                padding: 10px 20px;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">Cerrar</button>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);

        setTimeout(() => {
            if (document.body.contains(modal)) {
                modal.style.transform = 'translate(-50%, -50%) scale(0)';
                setTimeout(() => modal.remove(), 300);
            }
        }, 5000);
    }

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

    function animateWaves() {
        const waves = document.querySelectorAll('.wave-svg');
        waves.forEach((wave, index) => {
            const paths = wave.querySelectorAll('path');
            paths.forEach(path => {
                const length = path.getTotalLength();
                path.style.strokeDasharray = length;
                path.style.strokeDashoffset = length;
                path.style.animation = `drawWave 3s ease-in-out ${index * 0.5}s forwards`;
            });
        });
    }

    const waveAnimationCSS = `
        @keyframes drawWave {
            to {
                stroke-dashoffset: 0;
            }
        }
    `;

    
    const styleElement = document.createElement('style');
    styleElement.innerHTML = waveAnimationCSS;
    document.head.appendChild(styleElement);

    
    animateWaves();
});