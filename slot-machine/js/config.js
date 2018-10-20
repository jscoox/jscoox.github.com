const config = {
    defaults() {

        return {
            imgWidth: 235,
            imgHeight: 930,
            canvasWidth: 235,
            canvasHeight: 155,
            image: this.slotImage(),
            numberOfFrames: 6,
            ticksPerFrame: 3,
        }

    },

    slotImage() {

        let slotImage = new Image();
        slotImage.src = "../img/fruits.png";
        return slotImage;

    },

    slots() {

        return [
            {
                ...this.defaults(),
                canvas: document.querySelector("#slot-one"),
                stopAfter: 1000
            },

            {
                ...this.defaults(),
                canvas: document.querySelector("#slot-two"),
                stopAfter: 1500
            },

            {
                ...this.defaults(),
                canvas: document.querySelector("#slot-three"),
                stopAfter: 2000
            }
        ];
        
    },

    dom: {
        spinBtn: document.querySelector('#spin'),
        prompt: document.querySelector('#prompt'),
        bonus: document.querySelector('#bonus'),
        error: document.querySelector('#error'),
    },

    localizations: {
        info: {
            default: 'Pull the lever, Kronk (<a target="_blank" href="https://www.youtube.com/watch?v=HfIxMNm7roU">reference</a>)',
            spinning: 'Spinning...',
            error: 'Server error',
            bonus: 'Bonus Round',
        },

        prompts: [
            'No Win',
            '',
            'Small Win',
            'Big Win'
        ],
    }
};

export default config;