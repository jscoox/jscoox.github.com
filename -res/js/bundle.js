(function (winObj) {
    "use strict";

    var CONST = {
        window: winObj,
        htmlElem: document.getElementsByTagName('html')[0],
        bodyElem: document.getElementsByTagName('body')[0],
        header: document.getElementsByTagName('body')[0].querySelector('.header'),
        menuToggle: document.getElementsByTagName('body')[0].querySelector('#menu-toggle'),
        searchInput: document.getElementsByTagName('body')[0].querySelector('#search-input'),
        stickySearch: document.getElementsByTagName('body')[0].querySelector(".sticky-search"),
        filters: document.getElementsByTagName('body')[0].querySelector("#filters"),
        searchList: ".search-results"
    };

    onDomReady(initAPP);

    function onDomReady(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    function initAPP() {
        $.loadPolyfills();
        activateSearchFunction();
        mobileMenuSwitcher();
        enableHeadroom();
        hideSearchAndFilters();
    };


    function activateSearchFunction() {
        if (CONST.searchInput) {
            var searchForPosts = function () {
                if (CONST.searchInput.value.length) {
                    $.search({
                        "url": 'posts.json',
                        "keyword": CONST.searchInput.value
                    });

                    return;
                }

                $.setHtml({
                    "selector": CONST.searchList,
                    "html": ""
                });
            };

            $.event({
                "onElement": CONST.searchInput,
                "event": "keyup",
                "callback": $.debounce(searchForPosts, 1000)
            });
        }
    };

    function mobileMenuSwitcher() {
        if (CONST.menuToggle) {
            $.event({
                "onElement": CONST.menuToggle,
                "event": "click",
                "callback": function () {
                    $.toggleClass(CONST.htmlElem, 'is-menu-toggled-on');
                    $.toggleClass(CONST.bodyElem, 'is-menu-toggled-on');
                }
            });
        }
    };

    function hideSearchAndFilters() {
        var filters = new Headroom(CONST.filters),
            search = new Headroom(CONST.stickySearch),
            header = new Headroom(CONST.header);

        _enableBasedOnScreenSize();

        $.event({
            "onElement": CONST.window,
            "event": "resize",
            "callback": _enableBasedOnScreenSize
        });

        function _enableBasedOnScreenSize() {
            search.init();

            if (CONST.window.innerWidth < 768)
                header.init();
            else
                header.destroy();

            if (CONST.window.innerWidth > 849) {
                filters.init();
            } else {
                filters.destroy();

            }
        }
    }

    var $ = (function $() {
        var $ = {
            loadPolyfills: function loadPolyfills() {
                $._polyfills();
            },

            event: function event(data) {
                $._addEvent(data.onElement, data.event, data.callback);
            },

            toggleClass: function toggleClass(el, className) {
                if (el.classList) {
                    el.classList.toggle(className);
                } else {
                    var classes = el.className.split(' ');
                    var existingIndex = classes.indexOf(className);

                    if (existingIndex >= 0)
                        classes.splice(existingIndex, 1);
                    else
                        classes.push(className);

                    el.className = classes.join(' ');
                }
            },

            removeClass: function removeClass(el, className) {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);

                el.className = classes.join(' ');
            },

            addClass: function addClass(el, className) {
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex < 0)
                    classes.push(className);

                el.className = classes.join(' ');
            },

            get: function get(url) {
                return $._xhr({
                    "method": "GET",
                    "url": url
                });
            },

            search: function search(data) {
                return $.get(data.url).then(function (posts) {
                    var results = $.filter({
                        "posts": posts,
                        "keyword": data.keyword
                    });

                    if (results.length) {
                        var resultList = '';

                        results.forEach(function (item) {
                            resultList += "<li><a href='" + item.url + "'>" + item.name + "</a></li>";
                        });

                        $.setHtml({
                            "selector": CONST.searchList,
                            "html": resultList
                        });

                        return;
                    }

                    $.setHtml({
                        "selector": CONST.searchList,
                        "html": "<li class='not-found'>No results found</li>"
                    });
                });
            },

            filter: function filter(data) {
                var results = undefined,
                    keyword = data.keyword.toLowerCase(),
                    posts = JSON.parse(data.posts);

                return posts.filter(function (item) {
                    return ~item.name.toLowerCase().indexOf(keyword) ? item : null;
                });
            },

            setHtml: function setHtml(data) {
                document.querySelector(data.selector).innerHTML = data.html;
            },

            debounce: function debounce(func, wait, immediate) {
                var timeout;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            },

            _addEvent: function _addEvent(element, event, callback) {
                if (element.attachEvent)
                    return element.attachEvent('on' + event, callback);
                else
                    return element.addEventListener(event, callback, false);
            },

            _xhr: function _xhr(data) {
                return new Promise((resolve, reject) = > {
                    const xhr = new XMLHttpRequest();
                xhr.open(data.method, data.url);
                xhr.onload = () =
            >
                resolve(xhr.responseText);
                xhr.onerror = () =
            >
                reject(xhr.statusText);
                xhr.send();
            })
                ;
            },

            _polyfills: function _polyfills() {
                $._filterObjectPolyfill();
            },

            _filterObjectPolyfill: function _filterObjectPolyfill() {
                Object.filter = function (obj, predicate) {
                    var result = {}, key;

                    for (key in obj) {
                        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
                            result[key] = obj[key];
                        }
                    }

                    return result;
                };
            }
        };

        var Helpers = {
            loadPolyfills: $.loadPolyfills,
            event: $.event,
            toggleClass: $.toggleClass,
            removeClass: $.removeClass,
            addClass: $.addClass,
            get: $.get,
            search: $.search,
            filter: $.filter,
            setHtml: $.setHtml,
            debounce: $.debounce,
        };

        return Helpers;
    })();

    function enableHeadroom() {

        /*!
          * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
          * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
          * License: MIT
          */

        (function (root, factory) {
            'use strict';

            if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define([], factory);
            }
            else if (typeof exports === 'object') {
                // COMMONJS
                module.exports = factory();
            }
            else {
                // BROWSER
                root.Headroom = factory();
            }
        }(CONST.window, function () {
            'use strict';

            /* exported features */

            var features = {
                bind: !!(function () {
                }.bind),
                classList: 'classList' in document.documentElement,
                rAF: !!(CONST.window.requestAnimationFrame || CONST.window.webkitRequestAnimationFrame || CONST.window.mozRequestAnimationFrame)
            };
            CONST.window.requestAnimationFrame = CONST.window.requestAnimationFrame || CONST.window.webkitRequestAnimationFrame || CONST.window.mozRequestAnimationFrame;

            /**
             * Handles debouncing of events via requestAnimationFrame
             * @see http://www.html5rocks.com/en/tutorials/speed/animations/
             * @param {Function} callback The callback to handle whichever event
             */
            function Debouncer(callback) {
                this.callback = callback;
                this.ticking = false;
            }
            Debouncer.prototype = {
                constructor: Debouncer,

                /**
                 * dispatches the event to the supplied callback
                 * @private
                 */
                update: function () {
                    this.callback && this.callback();
                    this.ticking = false;
                },

                /**
                 * ensures events don't get stacked
                 * @private
                 */
                requestTick: function () {
                    if (!this.ticking) {
                        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
                        this.ticking = true;
                    }
                },

                /**
                 * Attach this as the event listeners
                 */
                handleEvent: function () {
                    this.requestTick();
                }
            };
            /**
             * Check if object is part of the DOM
             * @constructor
             * @param {Object} obj element to check
             */
            function isDOMElement(obj) {
                return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
            }

            /**
             * Helper function for extending objects
             */
            function extend(object /*, objectN ... */) {
                if (arguments.length <= 0) {
                    throw new Error('Missing arguments in extend function');
                }

                var result = object || {},
                    key,
                    i;

                for (i = 1; i < arguments.length; i++) {
                    var replacement = arguments[i] || {};

                    for (key in replacement) {
                        // Recurse into object except if the object is a DOM element
                        if (typeof result[key] === 'object' && !isDOMElement(result[key])) {
                            result[key] = extend(result[key], replacement[key]);
                        }
                        else {
                            result[key] = result[key] || replacement[key];
                        }
                    }
                }

                return result;
            }

            /**
             * Helper function for normalizing tolerance option to object format
             */
            function normalizeTolerance(t) {
                return t === Object(t) ? t : {down: t, up: t};
            }

            /**
             * UI enhancement for fixed headers.
             * Hides header when scrolling down
             * Shows header when scrolling up
             * @constructor
             * @param {DOMElement} elem the header element
             * @param {Object} options options for the widget
             */
            function Headroom(elem, options) {
                options = extend(options, Headroom.options);

                this.lastKnownScrollY = 0;
                this.elem = elem;
                this.tolerance = normalizeTolerance(options.tolerance);
                this.classes = options.classes;
                this.offset = options.offset;
                this.scroller = options.scroller;
                this.initialised = false;
                this.onPin = options.onPin;
                this.onUnpin = options.onUnpin;
                this.onTop = options.onTop;
                this.onNotTop = options.onNotTop;
                this.onBottom = options.onBottom;
                this.onNotBottom = options.onNotBottom;
            }
            Headroom.prototype = {
                constructor: Headroom,

                /**
                 * Initialises the widget
                 */
                init: function () {
                    if (!Headroom.cutsTheMustard) {
                        return;
                    }

                    this.debouncer = new Debouncer(this.update.bind(this));
                    this.elem.classList.add(this.classes.initial);

                    // defer event registration to handle browser
                    // potentially restoring previous scroll position
                    setTimeout(this.attachEvent.bind(this), 100);

                    return this;
                },

                /**
                 * Unattaches events and removes any classes that were added
                 */
                destroy: function () {
                    var classes = this.classes;

                    this.initialised = false;

                    for (var key in classes) {
                        $.removeClass(this.elem, classes[key]);
                    }

                    this.scroller.removeEventListener('scroll', this.debouncer, false);
                },

                /**
                 * Attaches the scroll event
                 * @private
                 */
                attachEvent: function () {
                    if (!this.initialised) {
                        this.lastKnownScrollY = this.getScrollY();
                        this.initialised = true;
                        this.scroller.addEventListener('scroll', this.debouncer, false);

                        this.debouncer.handleEvent();
                    }
                },

                /**
                 * Unpins the header if it's currently pinned
                 */
                unpin: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
                        classList.add(classes.unpinned);
                        classList.remove(classes.pinned);
                        this.onUnpin && this.onUnpin.call(this);
                    }
                },

                /**
                 * Pins the header if it's currently unpinned
                 */
                pin: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (classList.contains(classes.unpinned)) {
                        classList.remove(classes.unpinned);
                        classList.add(classes.pinned);
                        this.onPin && this.onPin.call(this);
                    }
                },

                /**
                 * Handles the top states
                 */
                top: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.top)) {
                        classList.add(classes.top);
                        classList.remove(classes.notTop);
                        this.onTop && this.onTop.call(this);
                    }
                },

                /**
                 * Handles the not top state
                 */
                notTop: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.notTop)) {
                        classList.add(classes.notTop);
                        classList.remove(classes.top);
                        this.onNotTop && this.onNotTop.call(this);
                    }
                },

                bottom: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.bottom)) {
                        classList.add(classes.bottom);
                        classList.remove(classes.notBottom);
                        this.onBottom && this.onBottom.call(this);
                    }
                },

                /**
                 * Handles the not top state
                 */
                notBottom: function () {
                    var classList = this.elem.classList,
                        classes = this.classes;

                    if (!classList.contains(classes.notBottom)) {
                        classList.add(classes.notBottom);
                        classList.remove(classes.bottom);
                        this.onNotBottom && this.onNotBottom.call(this);
                    }
                },

                /**
                 * Gets the Y scroll position
                 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
                 * @return {Number} pixels the page has scrolled along the Y-axis
                 */
                getScrollY: function () {
                    return (this.scroller.pageYOffset !== undefined)
                        ? this.scroller.pageYOffset
                        : (this.scroller.scrollTop !== undefined)
                            ? this.scroller.scrollTop
                            : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                },

                /**
                 * Gets the height of the viewport
                 * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
                 * @return {int} the height of the viewport in pixels
                 */
                getViewportHeight: function () {
                    return CONST.window.innerHeight
                        || document.documentElement.clientHeight
                        || document.body.clientHeight;
                },

                /**
                 * Gets the physical height of the DOM element
                 * @param  {Object}  elm the element to calculate the physical height of which
                 * @return {int}     the physical height of the element in pixels
                 */
                getElementPhysicalHeight: function (elm) {
                    return Math.max(
                        elm.offsetHeight,
                        elm.clientHeight
                    );
                },

                /**
                 * Gets the physical height of the scroller element
                 * @return {int} the physical height of the scroller element in pixels
                 */
                getScrollerPhysicalHeight: function () {
                    return (this.scroller === window || this.scroller === document.body)
                        ? this.getViewportHeight()
                        : this.getElementPhysicalHeight(this.scroller);
                },

                /**
                 * Gets the height of the document
                 * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
                 * @return {int} the height of the document in pixels
                 */
                getDocumentHeight: function () {
                    var body = document.body,
                        documentElement = document.documentElement;

                    return Math.max(
                        body.scrollHeight, documentElement.scrollHeight,
                        body.offsetHeight, documentElement.offsetHeight,
                        body.clientHeight, documentElement.clientHeight
                    );
                },

                /**
                 * Gets the height of the DOM element
                 * @param  {Object}  elm the element to calculate the height of which
                 * @return {int}     the height of the element in pixels
                 */
                getElementHeight: function (elm) {
                    return Math.max(
                        elm.scrollHeight,
                        elm.offsetHeight,
                        elm.clientHeight
                    );
                },

                /**
                 * Gets the height of the scroller element
                 * @return {int} the height of the scroller element in pixels
                 */
                getScrollerHeight: function () {
                    return (this.scroller === window || this.scroller === document.body)
                        ? this.getDocumentHeight()
                        : this.getElementHeight(this.scroller);
                },

                /**
                 * determines if the scroll position is outside of document boundaries
                 * @param  {int}  currentScrollY the current y scroll position
                 * @return {bool} true if out of bounds, false otherwise
                 */
                isOutOfBounds: function (currentScrollY) {
                    var pastTop = currentScrollY < 0,
                        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();

                    return pastTop || pastBottom;
                },

                /**
                 * determines if the tolerance has been exceeded
                 * @param  {int} currentScrollY the current scroll y position
                 * @return {bool} true if tolerance exceeded, false otherwise
                 */
                toleranceExceeded: function (currentScrollY, direction) {
                    return Math.abs(currentScrollY - this.lastKnownScrollY) >= this.tolerance[direction];
                },

                /**
                 * determine if it is appropriate to unpin
                 * @param  {int} currentScrollY the current y scroll position
                 * @param  {bool} toleranceExceeded has the tolerance been exceeded?
                 * @return {bool} true if should unpin, false otherwise
                 */
                shouldUnpin: function (currentScrollY, toleranceExceeded) {
                    var scrollingDown = currentScrollY > this.lastKnownScrollY,
                        pastOffset = currentScrollY >= this.offset;

                    return scrollingDown && pastOffset && toleranceExceeded;
                },

                /**
                 * determine if it is appropriate to pin
                 * @param  {int} currentScrollY the current y scroll position
                 * @param  {bool} toleranceExceeded has the tolerance been exceeded?
                 * @return {bool} true if should pin, false otherwise
                 */
                shouldPin: function (currentScrollY, toleranceExceeded) {
                    var scrollingUp = currentScrollY < this.lastKnownScrollY,
                        pastOffset = currentScrollY <= this.offset;

                    return (scrollingUp && toleranceExceeded) || pastOffset;
                },

                /**
                 * Handles updating the state of the widget
                 */
                update: function () {
                    var currentScrollY = this.getScrollY(),
                        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
                        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);

                    if (this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
                        return;
                    }

                    if (currentScrollY <= this.offset) {
                        this.top();
                    } else {
                        this.notTop();
                    }

                    if (currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
                        this.bottom();
                    }
                    else {
                        this.notBottom();
                    }

                    if (this.shouldUnpin(currentScrollY, toleranceExceeded)) {
                        this.unpin();
                    }
                    else if (this.shouldPin(currentScrollY, toleranceExceeded)) {
                        this.pin();
                    }

                    this.lastKnownScrollY = currentScrollY;
                }
            };
            /**
             * Default options
             * @type {Object}
             */
            Headroom.options = {
                tolerance: {
                    up: 0,
                    down: 0
                },
                offset: 0,
                scroller: window,
                classes: {
                    pinned: 'headroom--pinned',
                    unpinned: 'headroom--unpinned',
                    top: 'headroom--top',
                    notTop: 'headroom--not-top',
                    bottom: 'headroom--bottom',
                    notBottom: 'headroom--not-bottom',
                    initial: 'headroom'
                }
            };
            Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

            return Headroom;
        }));
    }
})(window);
