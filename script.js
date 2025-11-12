class MayhemSite {
    constructor() {
        this.currentStage = 'green-pill';
        this.isGreenVersion = false; // Track which version of mayhem logo is showing
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoProgression();
    }

    setupEventListeners() {
        const twitterIcon = document.getElementById('twitter-icon');
        const caAddress = document.querySelector('.ca-address');

        // Twitter icon click handler
        twitterIcon.addEventListener('click', () => {
            window.open('https://twitter.com/i/communities/1988568188607479885', '_blank');
        });

        // CA address click handler (copy to clipboard)
        caAddress.addEventListener('click', () => {
            navigator.clipboard.writeText('xxxxxxxxxxxxxxxxxxxxxxxxxpump').then(() => {
                this.showCopyFeedback();
            });
        });

        // Mayhem logo hover handlers
        this.setupMayhemLogoHover();
    }

    startAutoProgression() {
        // Auto-progress from green pill to red pill after 3 seconds
        setTimeout(() => {
            if (this.currentStage === 'green-pill') {
                this.transformToRedPill();
            }
        }, 3000);
    }

    setupMayhemLogoHover() {
        // Wait for mayhem stage to be available
        const checkMayhemLogo = () => {
            const mayhemLogo = document.getElementById('mayhem-logo');
            if (mayhemLogo) {
                mayhemLogo.addEventListener('mouseenter', () => {
                    this.handleMayhemHover();
                });
            } else {
                // If not available yet, check again in 100ms
                setTimeout(checkMayhemLogo, 100);
            }
        };
        checkMayhemLogo();
    }

    handleMayhemHover() {
        const mayhemLogo = document.getElementById('mayhem-logo');
        const mayhemStage = document.getElementById('mayhem-stage');
        const caDisplay = document.getElementById('ca-display');
        const caLabel = document.querySelector('.ca-label');
        const caAddress = document.querySelector('.ca-address');
        const topPill = document.getElementById('top-red-pill');
        
        // Add glitch animation class
        mayhemLogo.classList.add('glitch');
        
        // Toggle between normal and green versions
        if (this.isGreenVersion) {
            // Switch back to normal (red theme)
            mayhemLogo.src = 'mayhemtransparent.png';
            this.isGreenVersion = false;
            
            // Remove green theme classes
            mayhemStage.classList.remove('green-theme');
            caDisplay.classList.remove('green-theme');
            caLabel.classList.remove('green-theme');
            caAddress.classList.remove('green-theme');
            
            // Switch top pill back to red pill
            topPill.src = 'redpill.png';
        } else {
            // Switch to green version
            mayhemLogo.src = 'mayhemtransparentgreen.png';
            this.isGreenVersion = true;
            
            // Add green theme classes
            mayhemStage.classList.add('green-theme');
            caDisplay.classList.add('green-theme');
            caLabel.classList.add('green-theme');
            caAddress.classList.add('green-theme');
            
            // Switch top pill to green pill
            topPill.src = 'greenpill.png';
        }
        
        // Remove glitch class after animation completes
        setTimeout(() => {
            mayhemLogo.classList.remove('glitch');
        }, 600);
    }

    transformToRedPill() {
        const greenPillStage = document.getElementById('green-pill-stage');
        const redPillStage = document.getElementById('red-pill-stage');
        const greenPill = document.getElementById('green-pill');

        // Add transform animation class
        greenPill.classList.add('pill-transform');

        // Wait for animation to complete, then switch stages
        setTimeout(() => {
            greenPillStage.classList.remove('active');
            redPillStage.classList.add('active');
            this.currentStage = 'red-pill';
            
            // Start auto-transition after loading completes
            this.startLoadingSequence();
        }, 400);
    }

    startLoadingSequence() {
        // Auto-transition to mayhem stage after loading animation completes
        setTimeout(() => {
            this.showMayhemStage();
        }, 3400); // 3.4 seconds to allow loading animation to complete (3.2s + 0.2s buffer)
    }

    showMayhemStage() {
        const redPillStage = document.getElementById('red-pill-stage');
        const mayhemStage = document.getElementById('mayhem-stage');

        redPillStage.classList.remove('active');
        mayhemStage.classList.add('active');
        this.currentStage = 'mayhem';
    }


    showCopyFeedback() {
        const caAddress = document.querySelector('.ca-address');
        const originalText = caAddress.textContent;
        
        caAddress.textContent = 'Copied!';
        caAddress.style.color = 'rgba(0, 255, 100, 0.8)';
        
        setTimeout(() => {
            caAddress.textContent = originalText;
            caAddress.style.color = 'rgba(255, 255, 255, 0.9)';
        }, 1500);
    }

}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const site = new MayhemSite();
});
