(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gallery: () => (/* binding */ Gallery)
/* harmony export */ });


class Gallery {
    constructor(element, options) {
        element.innerHTML = `<div class="gallery">
            <button class="prev">-</button>
                <span class="result"></span>
            <button class="next">+</button>
            <img src="/" alt="">
            <ul>
            </ul>
        </div>`
        this.res = element.querySelector('.result')
        this.plus = element.querySelector('.next')
        this.minus = element.querySelector('.prev')
        this.img = element.querySelector('img')
        this.dots = element.querySelector('ul')

        this.time = options.time
        this.infinity = options.infinity
        this.dotsApply = options.dotsApply
        this.buttons = options.buttons
        this.imgs = options.imgs

        this._value = 0
        this.maxValue = this.imgs.length - 1
        this.time && this.startInterval()
        this.dotsApply && this.pagination()
        this.value = 0
        this.listeners()

        if (!this.buttons) {
            this.plus.hidden = true
            this.minus.hidden = true
        }
    }

    get value() {
        return this._value
    }

    set value(v) {
        this._value = v
        if (v === this.maxValue + 1) {
            if (!this.infinity) return
            this._value = 0
        }
        if (v === -1) {
            if (this.infinity) this._value = this.maxValue
        }
        this.update(this._value)
    }

    startInterval() {
        clearInterval(this.interval)
        this.interval = setInterval(() => this.value++, this.time)
    }

    update(index) {
        this.res.textContent = index
        this.img.src = this.imgs[index]
        const active = document.querySelector('.active')
        active?.classList.remove('active')
        this.dots.children[index].classList.add('active')
        this.startInterval()
        if (this.infinity) return
        this.minus.disabled = index === 0
        this.plus.disabled = index === this.maxValue
    }

    pagination() {
        this.imgs.forEach((_, i) => {
            const dot = document.createElement('li')
            this.dots.append(dot)
            dot.textContent = i
            dot.onclick = () => {
                this.value = i
            }
        });
    }

    listeners() {
        this.plus.onclick = () => {
            this.value++
        }

        this.minus.onclick = () => {
            this.value--
        }

        this.img.onclick = () => {
            this.value++
        }
    }
}


/******/ 	return __webpack_exports__;
/******/ })()
;
});