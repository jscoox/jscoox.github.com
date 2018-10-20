class Slot {
    constructor() {

        this.settings = {};

    }

    init(options) {

        this.settings = {
            ...options,
            currentFrame: 0,
            tickCount: 0,
            isSpinning: false,
            context: options.canvas.getContext("2d"),
            requestAF: null,
            stopAtIndex: null
        };

        this.settings.canvas.imgWidth = this.settings.canvasWidth;
        this.settings.canvas.canvasHeight = this.settings.canvasHeight;

    }

    render() {

        // Clear the canvas
        this.settings.context.clearRect(0, 0, this.settings.imgWidth, this.settings.imgHeight);

        if (this.isGoingToStop())
            this.stop();
            
        // Draw the animation
        this.settings.context.drawImage(
            this.settings.image,
            0,
            this.settings.currentFrame * this.settings.imgHeight / this.settings.numberOfFrames,
            this.settings.imgWidth,
            this.settings.imgHeight / this.settings.numberOfFrames,
            0,
            0,
            this.settings.imgWidth,
            this.settings.imgHeight / this.settings.numberOfFrames,
        );

    }

    update() {

        this.settings.tickCount += 1;

        if (this.settings.tickCount > this.settings.ticksPerFrame) {

            this.settings.tickCount = 0;

            // If the current frame index is in range
            if (this.settings.currentFrame < this.settings.numberOfFrames - 1) {
                // Go to the next frame
                this.settings.currentFrame += 1;
            } else {
                this.settings.currentFrame = 0;
            }
        }

    }

    spin() {

        this.settings.isSpinning = true;
        this.settings.requestAF = window.requestAnimationFrame(this.spin.bind(this));

        if (this.settings.isSpinning) {
            this.update();
            this.render();
        }

    }

    toggleSpinning(isSpinning) {

        this.settings.isSpinning = !!isSpinning;

        if (!this.settings.isSpinning) {
            cancelAnimationFrame(this.settings.requestAF);
            this.settings.requestAF = null;
        } else {
            if (!this.settings.requestAF) {
                this.spin();
            }
        }

    }

    isGoingToStop() {

        return this.settings.stopAtIndex;

    }

    stop() {

        setTimeout(() => {

            if (this.settings.currentFrame == this.settings.stopAtIndex) {
                this.toggleSpinning(false);
            }

        }, this.settings.stopAfter);

    }
};

export default Slot;