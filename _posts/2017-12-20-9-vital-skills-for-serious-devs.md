---
layout: post
title: "9 vital skills for serious js engineers"
description: "How to become a js engineer"
comments: true
keywords: "javascript, engineers, javascript engineers, frontend developer"
---

You already have experience with JS and we don’t need to talk about basics like syntax or what loops are, right? Great! Let’s start.

<div class="divider"></div>

#### Table of Contents

1. [Become a JS berserker](#1-become-a-js-berserker)
2. [Professional dev tools](#2-professional-dev-tools)
3. [APIs](#3-apis)
4. [Node.js](#4-nodejs)
5. [Stick with a framework](#5-stick-with-a-framework)
6. [Design patterns, data structures and algorithms](#6-design-patterns-data-structures-and-algorithms)
7. [Know your share of CSS](#7-know-your-share-of-CSS)
8. [Accessibility](#8-accessibility)
9. [Stay in the loop](#9-stay-in-the-loop)

<div class="divider"></div>

## 1. Become a JS berserker
It includes:

- [DOM](javascript:;)
- [coercion]({% post_url 2018-01-01-coercion-01-javascript-types %}) (so overlooked)
- [scope]({% post_url 2018-01-14-scope-01-assignment-operation %})
- [closures](javascript:;)
- [hoisting](javascript:;)
- [prototypal](javascript:;) (this is how JavaScript does OOP)
- [proficient functions usage](javascript:;) (IIFEs, hoisting, first-class etc.)
- async code: everything from <a href="javascript:;">callbacks and promises</a>, to the <a href="javascript:;">event loop</a>, to newer stuff like <a href="javascript:;">async-await</a> and <a href="javascript:;">RxJS</a>.

Before jQuery[[^1]], React, Bower[[^2]], Node, TypeScript and so on, master JavaScript first. The tools come after [[^3]]. Why?

Because if you don’t learn JavaScript, you’ll be staring at those libraries and tools like a peon would at the base of Mount Hyjal: overwhelmed.

Not to mention that the language has boomed in terms of development, both at its core, as well as in ecosystems and tools. You can already <a href="javascript:;"><!-- <a href="link catre articol electron"> -->code desktop apps in JavaScript</a>, so don’t be surprised.

All in all, you’ll come to need those tools and libraries, but until that, master JavaScript first.

As with most things, practice makes perfect. Doesn’t matter how much theory you’ve got under your belt, if you ain’t got the chops of actual practice. So what are you waiting for, <a href="{{ site.baseurl }}{% link berserker.md %}">master javascript</a> already!

<div class="divider"></div>

## 2. Professional dev tools

JavaScript, lingua franca of the web, right? Well, with this status, you’d be amazed if JavaScript didn’t have so many dev tools lying around.

So google a good IDE (hint: WebStorm) and a browser with good dev tools (hint: you should know it by now[[^4]]).

Learn to use your IDE ecosystem, with everything it provides (GIT & terminal integration, linting etc.[[^5]]) and also learn to use your browser’s dev tools (watch mode, breakpoints, understand stack traces, network panel to debug requests etc.)

<div class="divider"></div>

## 3. APIs

I’m assuming API is no buzzword to you. It might have been the case once, when we were all marveling at the magnificence of Gmaps or YouTube APIs. But APIs are no new thing in the coding world.

Long story short, like a rich and tasty salad, you’d best know what HTTP requests are, what CRUD and XHR stand for, throw in a handful of REST terminology and you’re off to a good start. You can play with APIs like Google Maps or Github to get a taste of things.

Also, get familiar with fetch requests in JavaScript (XHR, jQuery’s AJAX methods etc.[[^6]] [[^7]])

<div class="divider"></div>

## 4. Node.js

If you’re a backend dev, strive to know how the frontend works. The same applies for frontend devs: strive to know the backend. I’m not saying “become guru-like,” I’m just saying it’s best if you have a feel for things.

And that means that if you’re not a backend dev, you should have a good grasp on what walking the file system is about. If not that, at least to get a grasp on what linters, Babel, Webpack, Typescript etc are doing behind the scenes.

While I do agree that it’s best not to get to a granular level when it comes to understanding abstractions, I consider it a good practice if you get a taste of said abstractions.

Besides, all those tools (mentioned above) are becoming essential by the minute, in each team’s workflow. And while it’s not necessary to write node.js apps (unless… that’s your job, lol), it’s important to know how to use the tools of the trade.

So get comfy with installing and configuring node and npm (yarn, why not) and all the dependencies (npm packages or custom libs) that your apps rely on [[^8]].

<div class="divider"></div>

## 5. Stick with a framework

You’re expected to earn your keep. That’s why, as you’re becoming more seasoned in the JS waters (at least that’s what your resume says, anyway), the handholding drops drastically.

It’s a fast and crazy world, so you’d better buckle up and start structuring your code like a grown-up. What I mean is once the onboarding sessions are over, you should understand the system architecture of your employer. And start writing code that fits into that architecture.

It also means that after your trial is over, you should be able to spot bugs in the platform. Or at least spot some possible improvements.

And usually, nowadays, this is happening under a framework-like umbrella, whether open source like Angular / React / Vue or some in-house custom ones.

Usually, it’s best to choose workplaces that work with open-source, as the learning curve tends to be smoother with them. Also, there are lots and lots of folks out there that already have rock-solid advice when it comes to architecture and logic.

<div class="divider"></div>

## 6. Design patterns, data structures and algorithms

<a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/">Design patterns</a>, <a href="https://eloquentjavascript.net/04_data.html" target="_blank">data structures</a> and <a href="http://www.thatjsdude.com/interview/js1.html" target="_blank">algos</a> are legacies of those smart and stubborn coders who wanted to make code a better place. If you agree with me that humans write code for other humans (otherwise we’d all write binary), then it should be easy to understand the concept of design patterns. Just in case you don’t know what these are, think of “paving the cowpaths”: look for common paths and walk them, rather than taking a shot on your own and ignore what history, common sense and (obviously, lol) cows have taught us.

Jokes aside, design patterns are software blueprints. You may have heard of GOF (<a href="https://www.amazon.com/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8" target="_blank">Gang of Four</a>) book. Design patterns offer you tried and tested cowpaths for writing code. So whether it’d be Module, Factory or Prototype patterns, knowing just Singletons is not enough. Nor sexy.

In fact, React, Angular and Vue may probably know more about patterns than you (google MV* patterns – or <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#detailmvcmvp" target="_blank">look it up yourself</a>).

Also, along with data structures, algos and design patterns, should come an innate spirit for observation and debugging, which will help you improve performance. And if it’s not innate, then you must cultivate that spirit and make it thrive inside you.

Because, if you don’t have attention to detail and a patience to match it, you’d be dragging yourself like a corpse through slow debugging processes, where you actually need to learn and understand what’s going on and why.

This is especially true if you’re vying for a place in a cool company that does cool stuff: you’ll have to sift through all that cool code, so you can understand the forming bits and pieces. Not to mention corner cases as well. Also, a good primer on computer science theory wouldn’t hurt [[^9]] [[^10]]

<div class="divider"></div>

## 7. Know your share of CSS

You may be the greatest JavaScript master this world has ever seen, but if you can’t couple that with visuals, you’re missing big time.

It means you’re way better off knowing how to display all your JavaScript magnificence. And you can’t do that if <a href="http://www.dontfeartheinternet.com/08-layout/" target="_blank">you don’t know CSS</a>.

Ok, say you’re a backend dev (though nowadays backend rhymes more with fullstack);  you’d still be better off with CSS in your bag of tricks, because you may never know who you’ll have to fill in for.

Maybe the UI is away in vacation and all that’s keeping you from making that pull request is a measly <code>display: grid</code> property. What can you do, then, if you don’t <a href="https://css-tricks.com/snippets/css/complete-guide-grid/" target="_blank">understand CSS grid</a>, for example?

School yourself in the <a href="http://blog.froont.com/9-basic-principles-of-responsive-web-design/" target="_blank">basics of design</a> and make yourself a favor and be on the same page with that weird breed of humans (hint: designers). You might someday want to apply for a UI opening somewhere and then you'll definitely need to know CSS [[^11]] to fill that in.

Start with books like <a href="https://www.amazon.com/Dont-Make-Think-Revisited-Usability-ebook/dp/B00HJUBRPG" target="_blank">Don’t make me think</a> [[^12]] or <a href="https://www.amazon.com/Non-Designers-Design-Book-Non-Designers-ebook/dp/B00PWDFWEE/" target="_blank">The Non-Designer's Design Book</a> and go from there. Don’t waste too much time on this topic, though. I’d say invest one week in this skill and just refresh it when you feel the need.

<div class="divider"></div>

## 8. Accessibility

Build apps for everyone, not just for people like you. There are folks with various drawbacks in life and maybe your app is one of the things that bring them comfort on a regular basis, turning them into your best friends: fans of your app.

If you don’t know what I’m talking about, read this: <a href="https://www.wuhcag.com/web-content-accessibility-guidelines/" target="_blank">https://www.wuhcag.com/web-content-accessibility-guidelines/</a>

<div class="divider"></div>

## 9. Stay in the loop

I’m not saying that you should be in a perpetual state of update, because then that’ll be all you’ll be doing. Just make sure to take the pulse of the community from time to time, follow relevant channels like twitter and reddit feeds, subscribe to newsletters (yes, they are more relevant than ever), youtube channels, medium publications, the world’s your oyster.

We have this blog and the <a href="{{ '/' | prepend: site.baseurl }}courses">javascript courses</a> to get up to speed.

So stay in the loop. Don’t rush into thinking “I’ve got this.”

<div class="divider"></div>



[^1]: 1: Learn jQuery only for <a href="javascript:;">understanding the DOM</a>. Don’t invest too much time, though, as jQuery is <a href="https://www.reddit.com/r/javascript/comments/3hq3o0/is_jquery_dying/" target="_blank">slowly dying</a>
[^2]: 2: Lol, <a href="https://github.com/bower/bower.github.io/issues/288">Bower is slowly dying</a> too
[^3]: 3: Because what you’re using today, you may end up dropping tomorrow; read on to find out more
[^4]: 4: Jumanji-man! Ever heard of Chrome?
[^5]: 5: Definitely give WebStorm a shot
[^6]: 6: jQuery is seeing its final years, as it is. So just do this for academic research
[^7]: 7: Some people still won’t agree with me when I say that jQuery is a dying breed. Don’t believe me? <a href="https://medium.com/@assertchris/when-developers-lose-interest-7bccfb4f1a39" target="blank">Read this article</a> by one of the Mootools guys
[^8]: 8: Take this with a pinch of salt, though. It’s not ok to depend on a bunch of 3rd party libraries, only to see support dropped or projects discontinued
[^9]: 9: I’m not a happy camper with <a href="http://www.stanforddaily.com/2017/02/28/cs-department-updates-introductory-courses/" target="_blank">this news</a>
[^10]: 10: I’m of the same opinion with <a href="https://disqus.com/home/discussion/stanforddaily/cs_department_updates_introductory_courses/#comment-3273087152" target="_blank">this gentleman</a>
[^11]: 11: And one css preprocessor (e.g SASS)
[^12]: 12: Good book. Third edition. Love it
