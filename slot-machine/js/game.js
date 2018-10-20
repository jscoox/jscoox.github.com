import _ from './utils.js';
import config from './config.js';
import Slot from './slotConstructor.js';

class Game {
    constructor() {

        this.settings = {
            gameStarted: false,

            slots: [
                new Slot(),
                new Slot(),
                new Slot()
            ],


            isSpinning() {

                return !!this.slots[0].settings.isSpinning &&
                    !!this.slots[1].settings.isSpinning &&
                    !!this.slots[2].settings.isSpinning;

            }
        };

    }

    init() {

        config.dom.prompt.innerHTML = config.localizations.info.default;
        this.initSlots();
        this.initButton();

    }

    initSlots() {

        this.settings.slots.map((s, i) => {
            s.init(config.slots()[i]);
        });

        this.spinSlots();

    }

    initButton() {

        config.dom.spinBtn.addEventListener("click", e => {
            if (this.settings.gameStarted && this.settings.isSpinning()) return;

            this.newRound();

        });

    }

    newRound() {

        config.dom.prompt.innerHTML = config.localizations.info.spinning;

        if (!this.settings.isSpinning())
            this.spinSlots();

        this.disableBtnWhileSpinning();

        if (this.settings.isSpinning()) {
            setTimeout(this.fetchResults(), 1000);
        }

    }

    spinSlots() {

        this.settings.slots.map(s => {
            s.settings.stopAtIndex = null;
            s.spin();
        });

    }

    fetchResults() {

        function randomIntFromInterval(min,max) {
            return Math.floor(Math.random()*(max-min+1)+min);
        }

        let randomAnswer = randomIntFromInterval(1,3);

        let request = _.fetchFrom(`answer${randomAnswer}.json`);

        request.then(answer => {
            if (answer.result.status > 200) {
                this.errorDiv.innerHTML = config.localizations.info.error;
                return;
            }

            this.digest(answer.json);
        });

    }

    digest(answer) {

        this.setSlots(answer.sequence);

        if (answer.bonus) {
            setTimeout(() => {
                config.dom.bonus.innerHTML = config.localizations.info.bonus;
                this.newRound();
            }, 5000);

            return;
        }

        this.enableBtnAfterSpinningIsDone(answer.win);
        
    }

    setSlots(sequence) {

        sequence.map((value, i) => {
            this.settings.slots[i].settings.stopAtIndex = value;
        });

    }

    disableBtnWhileSpinning() {

        config.dom.spinBtn.setAttribute('disabled', 'disabled');
        config.dom.spinBtn.style.display = 'none';

    }

    enableBtnAfterSpinningIsDone(winType) {
        
        if (config.dom.spinBtn.hasAttribute('disabled')) {
            setTimeout(() => {
                if (!this.settings.isSpinning()) {
                    config.dom.prompt.innerHTML = config.localizations.prompts[winType];
                    config.dom.spinBtn.removeAttribute('disabled');
                    config.dom.spinBtn.style.display = 'block';
                    config.dom.bonus.innerHTML = '';
                }
            }, 4000);
        }
        
    }
}

var instance = new Game;
instance.init();