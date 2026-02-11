// ============================================
// 1. VARIABEL TYPOGRAPHY ANIMATION
// ============================================
const roles = ["Student", "Developer", "Frontend", "Boss"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 150;
const deletingSpeed = 100;
const pauseDuration = 2000;

// ============================================
// 2. DOM ELEMENTS
// ============================================
const typingSpan = document.querySelector('.typing-text span');
const navLinks = document.querySelectorAll('nav ul li a');
const projectCards = document.querySelectorAll('.project');
const skillsContainers = document.querySelectorAll('.skills');
const contactForm = document.querySelector('.container-contact form');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const overlay = document.querySelector('.overlay');

// ============================================
// 3. TYPING ANIMATION FUNCTION
// ============================================
function typeRole() {
    if (!typingSpan) return;
    
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, pauseDuration / 2);
            return;
        }
    } else {
        typingSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseDuration);
            return;
        }
    }
    
    setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
}

// ============================================
// 4. RANDOM PHOTO MOVEMENT
// ============================================
function initRandomPhotoMovement() {
    const fotoSaya = document.querySelector('.fotoSaya');
    
    if (fotoSaya && window.innerWidth > 992) { // Hanya desktop
        let posX = 0;
        let posY = 0;
        let rotation = 0;
        let scale = 1;
        let isHovered = false;
        
        // Pause saat hover
        fotoSaya.addEventListener('mouseenter', () => {
            isHovered = true;
            fotoSaya.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            fotoSaya.style.transform = 'translate(0, 0) rotate(5deg) scale(1.05)';
            fotoSaya.querySelector('img').style.boxShadow = '0 0 25px rgba(67, 97, 238, 0.5)';
        });
        
        fotoSaya.addEventListener('mouseleave', () => {
            isHovered = false;
            fotoSaya.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
            fotoSaya.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg) scale(${scale})`;
            fotoSaya.querySelector('img').style.boxShadow = '';
            randomMovement();
        });
        
        // Fungsi untuk generate random movement
        function randomMovement() {
            if (isHovered) return;
            
            // Random position (dalam batas wajar)
            posX = (Math.random() - 0.5) * 30; // -15px sampai +15px
            posY = (Math.random() - 0.5) * 20; // -10px sampai +10px
            
            // Random rotation (-3deg sampai +3deg)
            rotation = (Math.random() - 0.5) * 6;
            
            // Random scale (0.99 sampai 1.01)
            scale = 0.99 + Math.random() * 0.02;
            
            // Apply transform
            fotoSaya.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg) scale(${scale})`;
            
            // Random duration (3-6 detik)
            const duration = 3000 + Math.random() * 3000;
            
            // Loop dengan delay random
            setTimeout(randomMovement, duration);
        }
        
        // Mulai animasi setelah 1 detik
        setTimeout(randomMovement, 1000);
    }
}

// ============================================
// 5. SMOOTH SCROLLING NAVIGATION
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetHref = this.getAttribute('href');
        
        // Mapping href ke ID section yang sesuai
        let targetElement = null;
        switch(targetHref) {
            case '#about':
                targetElement = document.querySelector('#about');
                break;
            case '#skills':
                targetElement = document.querySelector('#skills');
                break;
            case '#projects':
                targetElement = document.querySelector('#projects');
                break;
            case '#contact':
                targetElement = document.querySelector('#contact');
                break;
        }
        
        if (targetElement) {
            // Hitung posisi dengan offset untuk navbar fixed (80px)
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 80;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Tutup menu mobile jika terbuka
            if (navMenu && overlay && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        } else {
            console.warn(`Section tidak ditemukan untuk: ${targetHref}`);
        }
    });
});

// ============================================
// 6. HOVER EFFECT PROJECT CARDS
// ============================================
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// ============================================
// 7. FORM VALIDATION & SUBMISSION
// ============================================
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[name="nama"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="pesan"]');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();
        
        // Validasi sederhana
        if (name.length < 2) {
            alert('Nama harus minimal 2 karakter');
            nameInput.focus();
            return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Email tidak valid');
            emailInput.focus();
            return;
        }
        
        if (message.length < 10) {
            alert('Pesan terlalu pendek (minimal 10 karakter)');
            messageInput.focus();
            return;
        }
        
        // Tampilkan status mengirim
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.value;
        submitBtn.value = 'Mengirim...';
        submitBtn.disabled = true;
        submitBtn.style.background = '#6c757d';
        
        // Simulasi pengiriman ke server
        setTimeout(() => {
            showNotification("Pesan Anda Tersampaikan, Terimakasih Sudah Mengunjungi Portofolio saya", 'success');
            
            // Reset form
            contactForm.reset();
            
            // Kembalikan tombol ke kondisi semula
            submitBtn.value = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            
            // Scroll ke atas dengan halus
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Efek visual: highlight bagian about setelah kirim pesan
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    aboutSection.style.animation = '';
                }, 500);
            }
        }, 1200);
    });
}

// ============================================
// 8. CUSTOM NOTIFICATION FUNCTION
// ============================================
function showNotification(message, type = 'success') {
    // Hapus notifikasi lama jika ada
    const oldNotification = document.querySelector('.custom-notification');
    if (oldNotification) oldNotification.remove();
    
    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
    `;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}" style="margin-right: 8px;"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Fade out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2700);
}

// ============================================
// 9. ANIMASI SKILLS SAAT SCROLL
// ============================================
const animateSkills = () => {
    skillsContainers.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        skill.style.transition = `all 0.6s ease ${index * 0.15}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillsContainers.forEach(skill => {
        observer.observe(skill);
    });
};

// ============================================
// 10. ANIMASI SECTION TITLE ON SCROLL
// ============================================
const animateSectionTitles = () => {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
};

// ============================================
// 11. INISIALISASI SEMUA FITUR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Mulai efek typing
    if (typingSpan) {
        setTimeout(typeRole, 500);
    }
    
    // Inisialisasi animasi skills
    animateSkills();
    
    // Inisialisasi animasi section titles
    animateSectionTitles();
    
    // Inisialisasi random photo movement
    initRandomPhotoMovement();
    
    // Tambahkan konten project secara dinamis (URL sudah diperbaiki - HAPUS SPASI!)
    const projects = [
        {
            title: "Kalkulator Fungsi Linear",
            role: "UI Researcher",
            btnText: "Kunjungi Website",
            link: "https://kalkulus-code.github.io/" // ✅ HAPUS SPASI
        },
        {
            title: "Sistem Tarif Pajak Amerika Serikat",
            role: "UI Researcher",
            btnText: "Kunjungi Website",
            link: "https://tarifpajaktrump.netlify.app/" // ✅ HAPUS SPASI
        },
        {
            title: "Profile Asrama Al-Istiqomah Putra",
            role: "WEB Developer",
            btnText: "Kunjungi Website",
            link: "https://al-istiqomah-putra-pp-cipasung.netlify.app/" // ✅ HAPUS SPASI
        }
    ];
    
    // Isi konten project
    projectCards.forEach((card, index) => {
        if (projects[index]) {
            const project = projects[index];
            const content = card.querySelector('.project-content');
            
            if (content) {
                content.querySelector('.judul-project').textContent = project.title;
                content.querySelector('.peran').textContent = project.role;
                
                const btn = content.querySelector('.btn-project');
                if (btn) {
                    btn.textContent = project.btnText;
                    
                    // Update link
                    const link = content.querySelector('a');
                    if (link) {
                        link.href = project.link;
                        link.target = "_blank";
                        link.rel = "noopener noreferrer";
                    }
                }
            }
        }
    });
    
    // Tambahkan label skill
    const skillLabels = ["HTML", "CSS", "JavaScript"];
    skillsContainers.forEach((container, index) => {
        if (skillLabels[index]) {
            // Hapus label lama jika ada
            const oldLabel = container.querySelector('p');
            if (oldLabel) oldLabel.remove();
            
            // Tambahkan label baru
            const label = document.createElement('p');
            label.textContent = skillLabels[index];
            label.style.marginTop = "10px";
            label.style.fontWeight = "600";
            label.style.color = "#1d3557";
            label.style.fontSize = "1.1rem";
            container.appendChild(label);
        }
    });
    
    // Tambahkan animasi ke section
    const sections = document.querySelectorAll('#about, #skills, #projects, #contact');
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease";
    });
    
    // Animasi muncul saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// ============================================
// 12. BACK TO TOP BUTTON
// ============================================
let backToTopBtn = null;

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!backToTopBtn) {
            backToTopBtn = document.createElement('button');
            backToTopBtn.innerHTML = '↑';
            backToTopBtn.className = 'back-to-top';
            backToTopBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(67, 97, 238, 0.3);
                z-index: 999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                animation: float 2s ease-in-out infinite;
            `;
            
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            backToTopBtn.addEventListener('mouseenter', () => {
                backToTopBtn.style.transform = 'scale(1.1) rotate(-10deg)';
                backToTopBtn.style.boxShadow = '0 6px 15px rgba(67, 97, 238, 0.4)';
            });
            
            backToTopBtn.addEventListener('mouseleave', () => {
                backToTopBtn.style.transform = 'scale(1) rotate(0)';
            });
            
            document.body.appendChild(backToTopBtn);
        }
    } else {
        if (backToTopBtn) {
            backToTopBtn.remove();
            backToTopBtn = null;
        }
    }
});

// ============================================
// 13. HAMBURGER MENU TOGGLE
// ============================================
if (menuToggle && navMenu && overlay) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Ganti icon
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        }
    });
    
    // Tutup menu saat klik overlay
    overlay.addEventListener('click', () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
    });
    
    // Tutup menu saat klik link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
    
    // Tutup menu saat resize ke desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
            
            // Re-init random photo movement jika diperlukan
            initRandomPhotoMovement();
        }
    });
}

// ============================================
// 14. ANIMASI CSS TAMBAHAN
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0.4); }
        70% { box-shadow: 0 0 0 10px rgba(67, 97, 238, 0); }
        100% { box-shadow: 0 0 0 0 rgba(67, 97, 238, 0); }
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .back-to-top:hover {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(style);