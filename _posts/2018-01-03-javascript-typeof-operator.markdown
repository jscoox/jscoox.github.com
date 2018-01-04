---
layout: post
title: "Javascript Typeof Operator"
description: "Javascript Typeof Operator"
comments: true
category: "berserker"
keywords: "javascript typeof, berserker, frontend developer"
---

{% include berserker_notice.html %}

Say you call typeof against the following:

```javascript
typeof orc; // "undefined"
typeof "peon"; // "string"
typeof 9.75; // "number"
typeof false; // "boolean"
typeof { building: "burrow" }; // "object"
typeof function() { console.log({ building: "Altar of Storms" }); } // "function"
```

Whenever you call it against a data type, you get a string back. One of these six strings:
- ```undefined```,
- ```string```,
- ```number```,
- ```boolean```,
- ```object```
- ```function```

That's all the types that come back when you use the typeof operator. Those six and another one that's been added to ES6, the symbol type.

Look at line 1. When you use ```typeof``` with a variable that's not declared, you'll see that you get ```undefined```, when actually you should think of it as "undeclared". It's all semantics. Because it's confusing. Many folks believe that undefined and undeclared are the same things, but at a semantic level, they are two very different things.

Think about a variable that's been formerly declared vs a variable that hasn't been formerly declared. I'll let you be the judge of this, but in the meantime, I think this is one of the many mistakes that the language should fix.

Moving on, you'll see that I used typeof against the data types themselves, not against a variable containing a data type. That suggests that the language has value types, as opposed to variable types.

Take C++, where you declare float farmedGold = 9.75; You are saying that the variable container "farmedGold", can never have a different value, other than a float number. JavaScript, though, doesn't come with such straightjackets. In JavaScript, variables can take whatever type and shape you want.

In JavaScript, you can do

```javascript
var farmedGold = 9.75;
typeof farmedGold; // "number"
```

And then you can go ahead and do

```javascript
farmedGold = "9 and a bunch of zeroes";
typeof farmedGold; // "string"
```

So when you say typeof farmedGold, you don't point to the variable, you point to the value the variable has in that given moment in time. This is very important to understand, as you'll see in the implicit and explicit coercion lectures.

It's very important to have this foundation. Now, let's see the type of null.

```javascript
typeof null; // "object"
```

If you're scratching your head in confusion, know that you're not the only one. Remember what I said about ```null```? That back in the day JavaScript thought about null as pertaining to objects in one way or another? Turns out it's just a big fat bug. The language should've returned the string ```"null"``` and instead it returns string ```"object"``` ever since.

This is one of those many bugs in the language. So what happens? Why does no one seem to fix the bugs? Because each iteration of EcmaScript, ES4, ES5, ES6, ES7 sees the light of day under the browser vendors' scrutiny. If a major browser, like Chrome, says "we don't think it's a good idea to implement into our browser what you want to do in the language," then it won't get implemented. Because JavaScript is, at the moment, browser dependent. And a lot of legacy websites and platforms, have adapted to the bugs. And if you'd fix these known glitches in the JavaScript language, you'd crash and burn millions of such platforms.

Judging from that, at least there's a consensus that there'd be one specification for every browser, otherwise we'd have what CSS has: vendor specific prefixes. Which, if you ask me, without a preprocessor plugin, sucks big time. But that's a different can of worms and we don't want to get into that.
