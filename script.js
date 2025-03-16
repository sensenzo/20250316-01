
        document.addEventListener("DOMContentLoaded", function() {
            var video = document.getElementById("intro-video");
            var enterButton = document.getElementById("enter-button");
            var videoContainer = document.getElementById("video-container");
            var mainContent = document.getElementById("main-content");

            // 動画が終わったら Enter ボタンを表示
            video.addEventListener("ended", function() {
                enterButton.style.display = "block";
            });

            // Enter ボタンをクリックしたら動画をフェードアウトしてメインコンテンツを表示
            enterButton.addEventListener("click", function() {
                videoContainer.style.transition = "opacity 1s ease-out";
                videoContainer.style.opacity = "0";

                setTimeout(function() {
                    videoContainer.style.display = "none";
                    mainContent.style.display = "block";
                    setTimeout(() => mainContent.style.opacity = "1", 100);
                }, 1000);
            });
        });




// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        const closeLink = submenu.querySelector('.close-link');
        const link = item.querySelector('a');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.submenu').forEach(menu => {
                if (menu !== submenu) {
                    menu.classList.remove('active');
                }
            });
            submenu.classList.toggle('active');
        });
        
        closeLink.addEventListener('click', () => {
            submenu.classList.remove('active');
        });
        
        submenu.querySelectorAll('a').forEach(a => {
            if (!a.classList.contains('close-link')) {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    submenu.classList.remove('active');
                });
            }
        });
    });

    class LoginFormManager {
        constructor() {
            this.initializeElements();
            this.setupEventListeners();
            this.signInText.style.display = 'block';
            this.loginContainer.style.display = 'none';
            this.toggleLoginButton();
        }

        initializeElements() {
            this.usernameInput = document.getElementById("username");
            this.passwordInput = document.getElementById("password");
            this.loginBtn = document.getElementById("login-btn");
            this.signInText = document.getElementById("sign-in-text");
            this.loginContainer = document.getElementById("login-container");
            this.successMessage = document.getElementById("success-message");
            this.backBtn = document.getElementById("back-btn");
        }

        setupEventListeners() {
            this.loginBtn.addEventListener("click", (event) => this.handleLogin(event));
            [this.usernameInput, this.passwordInput].forEach(input => {
                input.addEventListener("input", () => this.toggleLoginButton());
            });
            this.signInText.addEventListener("click", () => this.showLoginForm());
            this.backBtn.addEventListener("click", () => this.hideLoginForm());
        }

        handleLogin(event) {
            const username = this.usernameInput.value.trim();
            const password = this.passwordInput.value.trim();
            
            if (!username || !password) {
                alert("ユーザー名とパスワードを入力してください。");
                event.preventDefault();
                return;
            }
            
            this.showSuccessMessage();
        }

        toggleLoginButton() {
            const isValid = 
                this.usernameInput.value.trim() && 
                this.passwordInput.value.trim();
            this.loginBtn.disabled = !isValid;
        }

        async showLoginForm() {
            this.signInText.classList.add('fade-out');
            await this.timeout(400);
            this.signInText.style.display = 'none';
            
            this.loginContainer.style.display = 'block';
            this.timeout(50).then(() => {
                this.loginContainer.classList.add('visible');
            });
        }

        async hideLoginForm() {
            this.loginContainer.classList.remove('visible');
            await this.timeout(400);
            this.loginContainer.style.display = 'none';
            
            this.signInText.style.display = 'block';
            this.timeout(50).then(() => {
                this.signInText.classList.remove('fade-out');
            });
        }

        async showSuccessMessage() {
            this.successMessage.classList.add('visible');
            await this.timeout(4000);
            this.successMessage.classList.remove('visible');
        }

        timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }

    const loginForm = new LoginFormManager();
});

class HackerEffect {
    constructor(targetElement) {
        this.targetElement = targetElement;
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|;:,.<>?";
        this.interval = null;
    }

    startEffect(message) {
        let iteration = 0;
        clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.targetElement.innerText = message
                .split("")
                .map((char, index) => {
                    if (index < iteration) {
                        return char;
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join("");

            if (iteration >= message.length) {
                clearInterval(this.interval);
            }

            iteration += 1 / 2;
        }, 50);
    }
}

// 成功メッセージの表示と連携
LoginFormManager.prototype.showSuccessMessage = async function () {
    const hackerEffect = new HackerEffect(this.successMessage);
    hackerEffect.startEffect("ACCESS GRANTED");

    this.successMessage.classList.add('visible');
    await this.timeout(4000);
    this.successMessage.classList.remove('visible');
}