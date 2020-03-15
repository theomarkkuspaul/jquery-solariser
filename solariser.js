const INTERVAL_MS = 10;

class Solariser {
    constructor (element, intervalSpeedMS) {
        this.element = element;
        this.intervalSpeedMS = intervalSpeedMS || INTERVAL_MS;
        this.rotationCounter = 0;
        this.hovering = false;
        this.intervalID = setInterval(this.rotateImageHue.bind(this), this.intervalSpeedMS);
        this.handleImageInteraction();
        return element;
    }

    handleImageInteraction () {
        this.element.mouseenter(e => {
            this.hovering = true;
        }).mouseleave(e => {
            this.hovering = false;
        });
    }

    rotateImageHue () {
        if (this.hovering) {
            this.rotationCounter++;
            this.element.css('filter', `hue-rotate(${this.rotationCounter}deg`);
        }
    }
}

(function ( $ ) {
    $.fn.solarise = function (params) {
        const element = this;

        if (!element.is('img'))
            throw 'Element is not an image';

        if (!params)
            return new Solariser(element);

        let intervalSpeedMS = parseInt(params.intervalSpeedMS);
        return new Solariser(element, intervalSpeedMS);
    }
}( jQuery ));
