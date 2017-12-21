---
layout: post
title: "Markdown Cheatsheet Demo"
comments: true
description: "Markdown Cheatsheet Demo..."
keywords: "markdown, typography components, dummy content"
---

## Typography Elements in One

Let's start with a informative paragraph. **This text is bolded.** But not this one! _How about italic text?_ Cool right? Ok, let's **_combine_** them together. Yeah, that's right! I have code to highlight, so `ThisIsMyCode()`. What a nice! Good people will hyperlink away, so [here we go](#) or [http://www.example.com](http://www.example.com).

<div class="divider"></div>

## Headings H1 to H6

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

<div class="divider"></div>

## Footnote

Let's say you have text that you want to refer with a footnote, you can do that too! This is an example for the footnote number one [[^1]]. You can even add more footnotes, with link! [[^2]]

<div class="divider"></div>

## Blockquote

> Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible. --Francis of Assisi

**NOTE:** This theme does NOT support nested blockquotes.

<div class="divider"></div>

## List Items

1. First order list item
2. Second item

* Unordered list can use asterisks
- Or minuses
+ Or pluses

<div class="divider"></div>

## Code Blocks

```javascript
var modularpattern = (function() {
    // your module code goes here
    var sum = 0 ;

    return {
        add:function() {
            sum = sum + 1;
            return sum;
        },
        reset:function() {
            return sum = 0;    
        }  
    }   
}());
alert(modularpattern.add());    // alerts: 1
alert(modularpattern.add());    // alerts: 2
alert(modularpattern.reset());  // alerts: 0
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

<div class="divider"></div>

## Table

### Table 1: With Alignment

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Table 2: With Typography Elements

Markdown | Less | Pretty
--- | --- | ---
*Still* | `renders` | **nicely**
1 | 2 | 3

<div class="divider"></div>

## Horizontal Line

The HTML `<hr>` element is for creating a "thematic break" between paragraph-level elements. In markdown, you can create a `<hr>` with any of the following:

* `___`: three consecutive underscores
* `---`: three consecutive dashes
* `***`: three consecutive asterisks

renders to:

___

---

***

<div class="divider"></div>

## Media

### YouTube Embedded Iframe

<div class="video-container"><iframe src="https://www.youtube.com/embed/n1a7o44WxNo" frameborder="0" allowfullscreen></iframe></div>

### Image

![Minion](http://octodex.github.com/images/minion.png)

---
Footnote:

[^1]: 1: Footnote number one yeah baby!

[^2]: 2: A footnote you can link to - [click here!](#)



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
