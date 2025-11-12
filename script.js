class MayhemSite {
    constructor() {
        this.currentStage = 'green-pill';
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const greenPill = document.getElementById('green-pill');
        const enterButton = document.getElementById('enter-button');
        const twitterIcon = document.getElementById('twitter-icon');
        const caAddress = document.querySelector('.ca-address');

        // Green pill click handler
        greenPill.addEventListener('click', () => {
            if (this.currentStage === 'green-pill') {
                this.transformToRedPill();
            }
        });

        // Enter button click handler
        enterButton.addEventListener('click', () => {
            if (this.currentStage === 'red-pill') {
                this.showMayhemStage();
            }
        });

        // Twitter icon click handler
        twitterIcon.addEventListener('click', () => {
            window.open('https://twitter.com', '_blank');
        });

        // CA address click handler (copy to clipboard)
        caAddress.addEventListener('click', () => {
            navigator.clipboard.writeText('xxxxxxxxxxxxxxxxxxxxxxxxxpump').then(() => {
                this.showCopyFeedback();
            });
        });
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
        }, 400);
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
