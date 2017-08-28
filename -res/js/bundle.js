(function(window) {
    "use strict";

    var globals = {};
    onDomReady(initAPP);

    function initAPP(){
        $.initHelpers();
        enableGlobals();
        activateSearchFunction();
        activateMobileMenuSwitch();
    };

    var $ = (function $(){

        var $ = {
            initHelpers: function initHelpers(){
                $._polyfills();
            },

            event: function event(data){
                $._addEvent(data.onElement, data.event, data.callback);
            },

            toggleClass : function toggleClass(el, className){
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

            removeClass: function removeClass(el, className){
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);

                el.className = classes.join(' ');
            },

            addClass: function addClass(el, className){
                var classes = el.className.split(' ');
                var existingIndex = classes.indexOf(className);

                if (existingIndex < 0)
                    classes.push(className);

                el.className = classes.join(' ');
            },

            get: function get(url){
                return $._xhr({
                    "method":"GET",
                    "url":url
                });
            },

            search: function search(data){
                return $.get(data.url).then(function(posts){
                    var results = $.filter({
                        "posts" : posts,
                        "keyword" : data.keyword
                    });

                    if(results.length){
                        var resultList = '';

                        results.forEach(function(item){
                            resultList += "<li><a href='"+item.url+"'>"+item.name+"</a></li>";
                        });

                        $.setHtml({
                            "selector": globals.searchList,
                            "html": resultList
                        });

                        return;
                    }

                    $.setHtml({
                        "selector": globals.searchList,
                        "html": "<li class='not-found'>No results found</li>"
                    });
                });
            },

            filter: function filter(data){
                var results = undefined,
                    keyword = data.keyword.toLowerCase(),
                    posts = JSON.parse(data.posts);

                return posts.filter(function(item){
                    return ~item.name.toLowerCase().indexOf(keyword) ? item : null;
                });
            },

            setHtml: function setHtml(data){
                document.querySelector(data.selector).innerHTML = data.html;
            },

            debounce: function debounce(func, wait, immediate){
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            },

            _addEvent : function _addEvent(element, event, callback){
                if (element.attachEvent)
                    return element.attachEvent('on'+event, callback);
                else
                    return element.addEventListener(event, callback, false);
            },

            _xhr: function _xhr(data){
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open(data.method, data.url);
                    xhr.onload = () => resolve(xhr.responseText);
                    xhr.onerror = () => reject(xhr.statusText);
                    xhr.send();
                });
            },

            _polyfills: function _polyfills(){
                $._filterObjectPolyfill();
            },

            _filterObjectPolyfill: function _filterObjectPolyfill(){
                Object.filter = function( obj, predicate) {
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
            initHelpers : $.initHelpers,
            event: $.event,
            toggleClass : $.toggleClass,
            removeClass : $.removeClass,
            addClass : $.addClass,
            get : $.get,
            search : $.search,
            filter : $.filter,
            setHtml : $.setHtml,
            debounce : $.debounce,
        };

        return Helpers;
    })();

    function onDomReady(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };

    function activateSearchFunction(){
        if(globals.searchInput){
            var searchForPosts = function (){
                if(globals.searchInput.value.length) {
                    $.search({
                        "url": 'posts.json',
                        "keyword": globals.searchInput.value
                    });

                    return;
                }

                $.setHtml({
                    "selector": globals.searchList,
                    "html": ""
                });
            };

            $.event({
                "onElement":globals.searchInput,
                "event":"keyup",
                "callback":$.debounce(searchForPosts, 1000)
            });
        }
    };

    function activateMobileMenuSwitch(){
        if(globals.menuToggle){
            $.event({
                "onElement":globals.menuToggle,
                "event":"click",
                "callback":function(){
                    $.toggleClass(globals.htmlElem, 'is-menu-toggled-on');
                    $.toggleClass(globals.bodyElem, 'is-menu-toggled-on');
                }
            });
        }
    };

    function enableGlobals(){
        globals.htmlElem = document.getElementsByTagName('html')[0];
        globals.bodyElem = document.getElementsByTagName('body')[0];
        globals.menuToggle = globals.bodyElem.querySelector('#menu-toggle');
        globals.searchInput = globals.bodyElem.querySelector('#search-input');
        globals.searchList = ".search-results";
    };
})(window);
