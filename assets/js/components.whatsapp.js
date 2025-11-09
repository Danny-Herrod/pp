// WhatsApp Modal con animaciones GSAP - Temática Espacial
(function() {
    'use strict';

    // Wait for GSAP to load
    function initWhatsAppModal() {
        if (typeof gsap === 'undefined') {
            setTimeout(initWhatsAppModal, 100);
            return;
        }

        const modal = document.getElementById('whatsapp-modal');
        const openBtn = document.getElementById('whatsapp-float-btn');
        const closeBtn = document.getElementById('close-modal');
        const backdrop = modal.querySelector('.whatsapp-modal-backdrop');
        const form = document.getElementById('whatsapp-form');
        const modalContent = modal.querySelector('.whatsapp-modal-content');
        const planets = modal.querySelectorAll('.planet');
        const shootingStars = modal.querySelectorAll('.shooting-star');
        const whatsappIcon = modal.querySelector('.whatsapp-icon-large');

        // WhatsApp number (sin espacios para la URL)
        const whatsappNumber = '50587248446';

        // Función para abrir el modal con animaciones GSAP
        function openModal() {
            // Guardar posición de scroll actual
            const scrollY = window.scrollY;
            document.body.style.top = `-${scrollY}px`;

            modal.classList.add('active');
            document.body.classList.add('modal-open');
            document.documentElement.classList.add('modal-open');

            // Timeline principal para la apertura
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' }
            });

            // Animar entrada del modal
            tl.to(modal, {
                opacity: 1,
                duration: 0.3
            })
            .to(backdrop, {
                opacity: 1,
                duration: 0.4
            }, 0)
            // Animar contenido del modal con efecto de entrada espacial
            .fromTo(modalContent,
                {
                    scale: 0.5,
                    opacity: 0,
                    rotationY: -180,
                    y: -100
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotationY: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                },
                0.2
            )
            // Animar icono de WhatsApp (sin animaciones continuas)
            .fromTo(whatsappIcon,
                {
                    scale: 0,
                    y: -50
                },
                {
                    scale: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                },
                0.4
            )
            // Animar planetas
            .fromTo(planets,
                {
                    scale: 0,
                    opacity: 0
                },
                {
                    scale: 1,
                    opacity: 0.7,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                },
                0.3
            );

            // Animación suave de las estrellas fugaces - menos frecuentes y aleatorias
            shootingStars.forEach((star, index) => {
                // Posiciones aleatorias en Y para cada estrella
                const randomTopStart = Math.random() * 80 + 10; // Entre 10% y 90%
                const randomTopEnd = randomTopStart + (Math.random() * 20 - 10); // Variación de ±10%

                // Delays más espaciados y aleatorios
                const baseDelay = 2 + (index * 8); // 2s, 10s, 18s
                const randomDelay = baseDelay + (Math.random() * 3); // +0-3s aleatorio

                // Duración aleatoria para cada estrella
                const duration = 2 + (Math.random() * 1.5); // Entre 2-3.5s

                // Repeat delay más largo (15-20 segundos)
                const repeatDelay = 15 + (Math.random() * 5);

                gsap.fromTo(star,
                    {
                        x: 0,
                        y: 0,
                        opacity: 0,
                        rotation: -35 // Ángulo diagonal más natural
                    },
                    {
                        x: window.innerWidth * 0.6, // 60% del ancho de la pantalla
                        y: 300 + (Math.random() * 100), // Distancia variable
                        opacity: 0,
                        rotation: -35,
                        duration: duration,
                        delay: randomDelay,
                        repeat: -1,
                        repeatDelay: repeatDelay,
                        ease: 'power1.inOut',
                        onStart: function() {
                            // Posicionar la estrella en una posición aleatoria
                            gsap.set(this.targets()[0], {
                                top: randomTopStart + '%'
                            });

                            // Fade in rápido
                            gsap.to(this.targets()[0], {
                                opacity: 0.9,
                                duration: 0.2,
                                ease: 'power2.out'
                            });
                        },
                        onUpdate: function() {
                            const progress = this.progress();
                            // Fade out gradual desde el 70%
                            if (progress > 0.7) {
                                const fadeProgress = (progress - 0.7) / 0.3;
                                gsap.set(this.targets()[0], {
                                    opacity: 0.9 * (1 - fadeProgress)
                                });
                            }
                        },
                        onRepeat: function() {
                            // Cambiar posición aleatoria en cada repetición
                            const newTop = Math.random() * 80 + 10;
                            gsap.set(this.targets()[0], {
                                top: newTop + '%'
                            });
                        }
                    }
                );
            });

            // Animación de flotación de planetas
            planets.forEach((planet, index) => {
                gsap.to(planet, {
                    y: '+=30',
                    x: '+=20',
                    rotation: 360,
                    duration: 8 + index * 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            });

            // Animación del textarea al hacer focus
            const textarea = form.querySelector('textarea');
            textarea.addEventListener('focus', function() {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                gsap.to(this, {
                    boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1), 0 0 30px rgba(139, 92, 246, 0.3)',
                    duration: 0.3
                });
            });

            textarea.addEventListener('blur', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        }

        // Función para cerrar el modal con animaciones GSAP
        function closeModal() {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.in' },
                onComplete: () => {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                    document.documentElement.classList.remove('modal-open');

                    // Restaurar posición de scroll
                    const scrollY = document.body.style.top;
                    document.body.style.top = '';
                    window.scrollTo(0, parseInt(scrollY || '0') * -1);

                    // Kill todas las animaciones del modal
                    gsap.killTweensOf([modalContent, whatsappIcon, planets, shootingStars]);
                }
            });

            // Animar salida
            tl.to(modalContent, {
                scale: 0.5,
                opacity: 0,
                rotationY: 180,
                y: 100,
                duration: 0.5,
                ease: 'back.in(1.7)'
            })
            .to(modal, {
                opacity: 0,
                duration: 0.3
            }, 0.2);
        }

        // Función para enviar mensaje a WhatsApp
        function sendToWhatsApp(e) {
            e.preventDefault();

            const messageInput = document.getElementById('whatsapp-message');
            const message = messageInput.value.trim();

            if (!message) {
                // Animación de error si no hay mensaje
                gsap.to(messageInput, {
                    x: -10,
                    duration: 0.1,
                    repeat: 5,
                    yoyo: true,
                    ease: 'power1.inOut',
                    onComplete: () => {
                        gsap.to(messageInput, { x: 0 });
                    }
                });
                return;
            }

            // Crear URL de WhatsApp ANTES de cualquier animación
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Abrir WhatsApp INMEDIATAMENTE (crítico para iOS)
            // iOS bloquea window.open() si no se ejecuta directamente en el evento
            const whatsappWindow = window.open(whatsappUrl, '_blank');

            // Animación del botón DESPUÉS de abrir la ventana
            const sendBtn = form.querySelector('.btn-whatsapp-send');

            // Animación de éxito
            const tl = gsap.timeline();
            tl.to(sendBtn, {
                backgroundColor: '#10b981',
                scale: 0.95,
                duration: 0.1
            })
            .to(sendBtn, {
                scale: 1.1,
                duration: 0.2
            })
            .to(sendBtn, {
                scale: 1,
                duration: 0.2,
                onComplete: () => {
                    // Cerrar modal
                    setTimeout(() => {
                        closeModal();
                        // Reset form
                        messageInput.value = '';
                        gsap.set(sendBtn, { backgroundColor: '' });
                    }, 300);
                }
            });
        }

        // Event Listeners
        if (openBtn) {
            openBtn.addEventListener('click', openModal);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (backdrop) {
            backdrop.addEventListener('click', closeModal);
        }

        if (form) {
            form.addEventListener('submit', sendToWhatsApp);
        }

        // Cerrar con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Animación inicial del botón flotante al cargar
        if (openBtn) {
            gsap.fromTo(openBtn, {
                scale: 0,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
                delay: 0.5
            });
        }
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhatsAppModal);
    } else {
        initWhatsAppModal();
    }
})();
