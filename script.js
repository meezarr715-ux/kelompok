// Fungsi untuk inisialisasi website
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi tanggal presentasi
    const presentationDate = new Date();
    presentationDate.setDate(presentationDate.getDate() + 7); // Presentasi 7 hari dari sekarang
    const dateElement = document.getElementById('presentation-date');
    if (dateElement) {
        dateElement.textContent = presentationDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Navigasi antar halaman
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hapus kelas active dari semua link
            navLinks.forEach(item => item.classList.remove('active'));
            
            // Tambah kelas active ke link yang diklik
            this.classList.add('active');
            
            // Sembunyikan semua section
            sections.forEach(section => section.classList.remove('active'));
            
            // Tampilkan section yang sesuai
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Scroll ke bagian atas section
                window.scrollTo({
                    top: 80,
                    behavior: 'smooth'
                });
            }
            
            // Tutup menu toggle di mobile
            const navLinksContainer = document.querySelector('.nav-links');
            navLinksContainer.classList.remove('active');
            
            // Update indikator presentasi
            updatePresentationIndicator();
        });
    });
    
    // Menu toggle untuk mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // Sistem tab untuk informasi virus
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus kelas active dari semua tab buttons dan contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Tambah kelas active ke tab button yang diklik
            this.classList.add('active');
            
            // Tampilkan content yang sesuai
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    
    // Kontrol presentasi
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const restartButton = document.getElementById('restart-presentation');
    
    // Urutan halaman untuk presentasi
    const presentationOrder = ['beranda', 'anggota', 'pengertian', 'informasi', 'penutup', 'kontak'];
    
    // Fungsi untuk mendapatkan indeks halaman aktif
    function getCurrentSlideIndex() {
        const activeSection = document.querySelector('.section.active');
        if (activeSection) {
            return presentationOrder.indexOf(activeSection.id);
        }
        return 0;
    }
    
    // Fungsi untuk berpindah slide
    function goToSlide(slideIndex) {
        // Validasi indeks
        if (slideIndex < 0) slideIndex = 0;
        if (slideIndex >= presentationOrder.length) slideIndex = presentationOrder.length - 1;
        
        // Dapatkan ID slide
        const slideId = presentationOrder[slideIndex];
        
        // Update navigasi
        navLinks.forEach(link => link.classList.remove('active'));
        const activeNavLink = document.querySelector(`a[href="#${slideId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Update section
        sections.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(slideId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Scroll ke atas
            window.scrollTo({
                top: 80,
                behavior: 'smooth'
            });
        }
        
        // Update indikator presentasi
        updatePresentationIndicator();
    }
    
    // Event listener untuk tombol sebelumnya
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            const currentIndex = getCurrentSlideIndex();
            goToSlide(currentIndex - 1);
        });
    }
    
    // Event listener untuk tombol selanjutnya
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            const currentIndex = getCurrentSlideIndex();
            goToSlide(currentIndex + 1);
        });
    }
    
    // Event listener untuk tombol restart
    if (restartButton) {
        restartButton.addEventListener('click', function() {
            goToSlide(0);
        });
    }
    
    // Tambah efek visual saat hover pada kartu
    const cards = document.querySelectorAll('.content-card, .info-card, .member-card, .visual-card, .contact-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });
    
    // Tambah efek ketik pada judul hero
    const heroTitle = document.querySelector('.hero-content h2');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Mulai efek ketik setelah 500ms
        setTimeout(typeWriter, 500);
    }
    
    // Fitur dark mode sederhana (toggle dengan double click pada logo)
    const logo = document.querySelector('.logo');
    if (logo) {
        let clickCount = 0;
        let clickTimer;
        
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                document.body.classList.toggle('dark-mode');
                clickCount = 0;
                
                // Update icon dark mode toggle
                const darkModeIcon = document.querySelector('.dark-mode-toggle i');
                if (darkModeIcon) {
                    if (document.body.classList.contains('dark-mode')) {
                        darkModeIcon.className = 'fas fa-sun';
                        darkModeToggle.title = 'Toggle Light Mode (Double Click Logo)';
                    } else {
                        darkModeIcon.className = 'fas fa-moon';
                        darkModeToggle.title = 'Toggle Dark Mode (Double Click Logo)';
                    }
                }
            }
        });
    }
    
    // Tambah animasi saat scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Amati elemen untuk animasi
    const animatedElements = document.querySelectorAll('.content-card, .info-card, .member-card, .type-card, .visual-card, .contact-card');
    animatedElements.forEach(el => {
        observer.observe(el);
        
        // Tambah kelas untuk animasi
        el.classList.add('fade-up');
    });
    
    // Tambah gaya untuk animasi fade-up
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .fade-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-up.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Fitur shortcut keyboard untuk presentasi
    document.addEventListener('keydown', function(e) {
        const currentIndex = getCurrentSlideIndex();
        
        switch(e.key) {
            case 'ArrowLeft':
                goToSlide(currentIndex - 1);
                break;
            case 'ArrowRight':
                goToSlide(currentIndex + 1);
                break;
            case 'Home':
                goToSlide(0);
                break;
            case 'End':
                goToSlide(presentationOrder.length - 1);
                break;
            case ' ':
            case 'Spacebar':
                goToSlide(currentIndex + 1);
                e.preventDefault();
                break;
        }
    });
    
    // Tambah indikator presentasi di pojok kanan bawah
    const presentationIndicator = document.createElement('div');
    presentationIndicator.className = 'presentation-indicator';
    presentationIndicator.innerHTML = `
        <span id="current-slide">1</span> / <span id="total-slides">${presentationOrder.length}</span>
    `;
    document.body.appendChild(presentationIndicator);
    
    // Update indikator saat berpindah slide
    function updatePresentationIndicator() {
        const currentIndex = getCurrentSlideIndex();
        const currentSlideElement = document.getElementById('current-slide');
        if (currentSlideElement) {
            currentSlideElement.textContent = currentIndex + 1;
        }
    }
    
    // Tambah tombol dark mode toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.title = 'Toggle Dark Mode (Double Click Logo)';
    document.body.appendChild(darkModeToggle);
    
    // Tambah event listener untuk dark mode toggle
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            this.title = 'Toggle Light Mode (Double Click Logo)';
        } else {
            icon.className = 'fas fa-moon';
            this.title = 'Toggle Dark Mode (Double Click Logo)';
        }
    });
    
    // Inisialisasi indikator
    updatePresentationIndicator();
    
    // Fungsi untuk memperbesar gambar
    function setupImageModal() {
        const images = document.querySelectorAll('.content-img img, .tab-image img, .type-img img, .info-img img, .hero-image img');
        
        images.forEach(img => {
            img.addEventListener('click', function() {
                const imgSrc = this.src;
                const imgAlt = this.alt;
                const caption = this.nextElementSibling ? this.nextElementSibling.textContent : '';
                
                // Buat modal untuk gambar
                const imageModal = document.createElement('div');
                imageModal.className = 'image-modal';
                
                imageModal.innerHTML = `
                    <div class="image-modal-content">
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <p class="image-modal-caption">${imgAlt}</p>
                    </div>
                    <div class="image-modal-close">&times;</div>
                `;
                
                document.body.appendChild(imageModal);
                
                // Tambah event listener untuk menutup modal
                const closeBtn = imageModal.querySelector('.image-modal-close');
                closeBtn.addEventListener('click', function() {
                    document.body.removeChild(imageModal);
                });
                
                // Tutup modal saat klik di luar gambar
                imageModal.addEventListener('click', function(e) {
                    if (e.target === imageModal) {
                        document.body.removeChild(imageModal);
                    }
                });
                
                // Tutup modal dengan tombol ESC
                document.addEventListener('keydown', function closeModalOnEsc(e) {
                    if (e.key === 'Escape') {
                        document.body.removeChild(imageModal);
                        document.removeEventListener('keydown', closeModalOnEsc);
                    }
                });
            });
        });
    }
    
    // Panggil fungsi setup image modal
    setupImageModal();
    
    // Fungsi untuk mengubah gambar dengan URL kustom
    window.changeImage = function(elementId, imageUrl, caption) {
        const element = document.getElementById(elementId);
        if (element) {
            const imgElement = element.querySelector('img');
            if (imgElement) {
                imgElement.src = imageUrl;
                if (caption) {
                    const captionElement = element.querySelector('.img-caption');
                    if (captionElement) {
                        captionElement.textContent = caption;
                    }
                }
            }
        }
    };
    
    // Contoh penggunaan: window.changeImage('hero-image', 'https://example.com/image.jpg', 'Deskripsi baru');
    
    // Fungsi untuk mengubah semua gambar sekaligus
    window.updateAllImages = function(imagesData) {
        // imagesData adalah array objek: [{id: 'elementId', url: 'imageUrl', caption: 'captionText'}, ...]
        imagesData.forEach(imgData => {
            window.changeImage(imgData.id, imgData.url, imgData.caption);
        });
    };
    
    console.log('Website siap digunakan!');
    console.log('Untuk mengganti gambar, gunakan:');
    console.log('1. window.changeImage("elementId", "imageUrl", "caption")');
    console.log('2. window.updateAllImages([{id: "id1", url: "url1", caption: "cap1"}, ...])');
});