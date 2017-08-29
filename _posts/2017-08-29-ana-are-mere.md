---
title: Ana are mere
author: JS Cooks
layout: post
date: 2017-08-28
permalink: /ana-are-mere/
path: 2017-08-29-ana-are-mere.md
---

<span class="toc">
  <p class="toc_h">Table of Contents</p>
  
  - [Example](#example)
  - [Example2](#example2)
      - 2.1 [Another example](#another-example)
  - [Third Example](#third-example)
</span>

- [Example](#example)
  - [Example2](#example2)
      - 2.1 [Another example](#another-example)
  - [Third Example](#third-example)

## Example

<p>Just once I’d like to eat dinner with a <a title="test link" href="#">celebrity</a> who isn’t bound and gagged. I am Singing Wind, Chief of the Martians. No, she’ll probably make me do it.</p>

<p>Say what? Who are you, my warranty?! Yes, except the Dave Matthews Band doesn’t rock. Or a guy who burns down a bar for the insurance money! Leela’s gonna kill me. Son, as your lawyer, I declare y’all are in a 12-piece bucket o’ trouble. But I done struck you a deal: Five hours of community service cleanin’ up that ol’ mess you caused.</p>

## Example2

<p>Calculon is gonna <em>kill</em> us and it’s all everybody else’s fault! We’ll need to have a look inside you with this camera. I’m just glad my fat, ugly mama isn’t alive to see this day. Now, now. Perfectly symmetrical violence never solved anything. Morbo can’t understand his teleprompter because he forgot how you say that letter that’s shaped like a man wearing a hat. You’ve killed me! Oh, you’ve killed me!</p>

<blockquote><p>Don’t watch the clock; do what it does. Keep Going.<cite>Sam Levenson</cite></p></blockquote>

### Another example

<p>So I really am important? How I feel when I’m drunk is correct? Then we’ll go with that data file! Good news, everyone! There’s a report on TV with some very bad news! And yet you haven’t said what I told you to say! How can any of us trust you?</p>

<p>I had more, but you go ahead. But I know you in the future. I cleaned your poop. There’s one way and only one way to determine if an animal is intelligent. Dissect its brain! Kif might! Hey, whatcha watching? Five hours? Aw, man! Couldn’t you just get me the death penalty?</p>

#### UI DESIGN

<p>Lorem ipsum dolor sit amet, <a title="test link" href="#">test link</a> adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>

<p>Lorem ipsum dolor sit amet, <em>emphasis</em> consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>

```javascript
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
```

###### MUCH SMALLER STUFF

<p>Lorem ipsum dolor sit amet, <a title="test link" href="#">test link</a> adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>

<p>Lorem ipsum dolor sit amet, <em>emphasis</em> consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>

## Third Example

<p>Lorem ipsum dolor sit amet, <em>emphasis</em> consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor. Donec sed tellus eget sapien fringilla nonummy. Mauris a ante. Suspendisse quam sem, consequat at, commodo vitae, feugiat in, nunc. Morbi imperdiet augue quis tellus.</p>
