// cloudjp ポートフォリオサイト - メインJavaScript
// 目的: ナビゲーション、言語切替、アニメーション、フォーム処理の実装
document.addEventListener('DOMContentLoaded', function() {
    // 年齢計算機能
    // 生年月日から現在の年齢を自動計算して表示
    function calculateAge() {
        const birthDate = new Date('1999-10-30');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        // 誕生日未到来の場合は年齢を1減算
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    // 年齢表示の更新
    const ageElement = document.getElementById('age-display');
    if (ageElement) {
        ageElement.textContent = `${calculateAge()}`;
    }

    // ナビゲーションシステムの初期化
    // スクロール位置に応じてアクティブなナビゲーションリンクを動的に更新
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + 100;
        
        // 全てのアクティブ状態をクリア
        navLinks.forEach(link => link.classList.remove('active'));
        
        // 現在のセクションを検出 (ホームセクションは除外)
        let currentSection = '';
        
        sections.forEach(section => {
            const id = section.getAttribute('id');
            if (id === 'home') return;
            
            const rect = section.getBoundingClientRect();
            const sectionTop = window.pageYOffset + rect.top;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop - 50 && scrollPos < sectionTop + sectionHeight - 50) {
                currentSection = id;
            }
        });
        
        // アクティブなナビゲーションリンクを設定
        if (currentSection) {
            const activeLink = document.querySelector(`[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // スムーススクロール機能
    // ナビゲーションリンククリック時に対象セクションへアニメーションでスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // モバイル表示時はヘッダーオフセットを調整
                const isMobile = window.innerWidth <= 768;
                const offset = isMobile ? 0 : 70;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ロゴクリック時の処理
    // ページトップへスクロールし、全ナビゲーションのアクティブ状態を解除
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(link => link.classList.remove('active'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 言語切替ドロップダウン機能
    // 英語/日本語の切替インターフェース
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageToggle = document.querySelector('.language-toggle');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageToggle) {
        // ドロップダウンの開閉トグル
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });

        // ドロップダウン外クリック時の自動クローズ
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target)) {
                languageDropdown.classList.remove('active');
            }
        });

        // 言語選択時の処理
        // 選択された言語に対応するページへ遷移
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                const langCode = this.dataset.lang.toUpperCase();
                const langText = languageToggle.querySelector('.language-text');
                if (langText) langText.textContent = langCode;
                
                languageDropdown.classList.remove('active');
                
                const href = this.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    }

    // お問い合わせフォームの処理
    // 送信中の状態表示とボタン無効化
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('.btn-submit');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    }

    // フェードインアニメーション機能
    // Intersection Observer APIによるスクロールトリガーアニメーション
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // アニメーション対象要素の設定
    // タイムライン、プロジェクトカード、情報カードに段階的なフェードインを適用
    document.querySelectorAll('.timeline-item, .project-card, .info-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s ease ${i * 0.1}s`;
        observer.observe(el);
    });

    // スロットル処理されたスクロールハンドラー
    // パフォーマンス最適化: 10msごとにナビゲーション更新を制限
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            updateActiveNav();
            scrollTimeout = null;
        }, 10);
    });

    // 初期化: ページ読み込み時のナビゲーション状態を設定
    updateActiveNav();
});