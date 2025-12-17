// Фильтрация портфолио (исправленная версия)
document.addEventListener('DOMContentLoaded', function() {
  // Фильтрация работ в портфолио
  const filterBtns = document.querySelectorAll('.filter_btn');
  const portfolioItems = document.querySelectorAll('.portfolio_item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Удаляем активный класс у всех кнопок
      filterBtns.forEach(b => b.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
          // Показываем плашку плавно
          item.style.display = 'block';
          // Задержка для анимации
          setTimeout(() => {
            item.classList.remove('hidden');
          }, 10);
        } else {
          // Скрываем плашку
          item.classList.add('hidden');
          // После анимации скрываем полностью
          setTimeout(() => {
            if (item.classList.contains('hidden')) {
              item.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
  
  // Слайдер отзывов
  const sliderTrack = document.getElementById('testimonialsTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.getElementById('sliderDots');
  
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Создаем точки для навигации
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  createDots();
  const dots = document.querySelectorAll('.dot');
  
  function updateSlider() {
    // Плавное перемещение слайдера
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateSlider();
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateSlider();
  }
  
  // Обработчики событий для кнопок
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  // Автопрокрутка слайдера (медленнее)
  let autoSlideInterval = setInterval(nextSlide, 6000);
  
  // Останавливаем автопрокрутку при наведении
  const slider = document.getElementById('testimonialsSlider');
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, 6000);
  });
  
  // Инициализация слайдера
  updateSlider();
  
  // Пересчет при изменении размера окна
  window.addEventListener('resize', updateSlider);
  
  // Тема
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  
  function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    
    themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
    if (mobileThemeToggle) {
      mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i> Сменить тему`;
    }
    
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
  // Загружаем сохраненную тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    if (mobileThemeToggle) {
      mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Сменить тему';
    }
  }
  
  themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }
  
  // Мобильное меню
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      menuToggle.innerHTML = mobileNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }
  
  // Закрытие меню при клике на ссылку
  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) {
        mobileNav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
  
  // Аккордеон
  const accordionHeaders = document.querySelectorAll('.accordion_header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Закрываем все элементы
      document.querySelectorAll('.accordion_item').forEach(el => {
        el.classList.remove('active');
      });
      
      // Открываем текущий, если он был закрыт
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Кнопки "Подробнее" и "Написать мне"
  const moreBtn = document.getElementById('moreBtn');
  const contactBtn = document.getElementById('contactBtn');
  
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      document.querySelector('#about').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
  
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      document.querySelector('#contact').scrollIntoView({ 
        behavior: 'smooth' 
      });
    });
  }
  
  // Форма обратной связи
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const messageText = document.getElementById('messageText').value;
      
      if (messageText.trim() !== '') {
        alert('Сообщение отправлено! Скоро я с вами свяжусь.');
        document.getElementById('messageText').value = '';
      } else {
        alert('Пожалуйста, напишите сообщение перед отправкой.');
      }
    });
  }
  
  // Плавная прокрутка для всех якорных ссылок
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});