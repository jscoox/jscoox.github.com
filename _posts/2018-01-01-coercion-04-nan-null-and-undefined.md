---
layout: post
title: "Coercion - 04 NaN, Null and Undefined"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

NaN
---------------------------

NaN, yet another semantic flop. It almost never means "not a number," as you might have guessed by now. What it actually means is that what's evaluated by NaN as an invalid number is its value as a number is invalid.

Take the following piece of code:

```javascript
var warcraftRaces = "warcraftRaces"/4;
warcraftRaces; // NaN
typeof warcraftRaces; // number
```

In this example, there's not much you can actually do. The compiler can't tell what you meant by ```warcraftRaces``` and it has to fail in some way, so it spits out this invalid numer value, the ```NaN```.

NaN's problem is that it's not equal to anything, not even with itself. Crazy, right? That's why you can't directly test it.

If you say ```typeof warcraftRaces```, it will return "number" instead of what any sane person would expect, which is ```NaN```. Is JavaScript evaluating the type of not a number as a number? JavaScript would say "yes, because ```typeof NaN``` is a number value, which means invalid number and type of invalid number is ```number```."

So given the mind-numbing effect of this explanation, the JS folks decided to introduce a utility called ```isNaN```, which returns true if your variable is NaN and false if it's not.

Now take a look at this:

```javascript
isNaN(warcraftRaces);
```

This returns true, right?

Now, how about this?

```javascript
isNaN("warcraftRaces");
```

Guess what it returns? Surprise: also true. Is the ```warcraftRaces``` value a number? Obviously no. So we can say ```warcraftRaces``` is NOT A NUMBER, which is exactly what ```isNaN``` does.

This is nonsensical, if you'd ask me, because it was supposed to check for that single case where there's an invalid ```NaN``` value, but the JS folks just decided that if you pass an argument that's anything BUT a number, the function itself will return true.

And if you ask yourself, "well, maybe it coerces things inside," the answer is "no, it doesn't".

It doesn't do any coercion whatsoever. This function is just defined badly, another glorified bug in the spec, because ```NaN``` was taken literally when it was created. Anything that's not a number, let's return TRUE!

So if you have some code that does math inside, with values that can have untrustworthy values, you can have a big surprise that it may return a ```NaN``` out of its calculations. And if you're testing for that NaN with the ```isNaN``` function, you'll get a bug and you'll blindly test for something that's not there.

So how can we fix it? Short answer, use a polyfill that's available with ES6, on the number object. You can find it on MDN (mozilla development network).

And here's how it looks:

```javascript
Number.isNaN = Number.isNaN || function(value) {
    return typeof value === 'number' && isNaN(value);
}
```

// <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN</a>

A polyfill is a chunk of code that makes possible for a feature to be available to browsers that do not support the feature in itself.

I'm getting a bit ahead here, but you might have come across this. Think about the ```Object.create``` or ```Object.assign``` polyfills for older IE browsers.

So whenever you feel the need to use isNaN, just drop this polyfill in and instead of using isNaN by itself, just use ```Number.isNaN``` and do your job with it.

As a closing statement and a not so fun fact, if you come to think of it, NaN is the only value in JavaScript that's not equal to itself.

So riding this hilarious monkey, you can simplify the earlier polyfill to this:

```javascript
Number.isNaN = Number.isNaN || function(value) {     
    return value !== value;
}
```

// <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" target="_blank">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN</a>

And it evaluates like this: the only way it returns true is if you pass a NaN value.

Null
-------------------------------

Other than the null data type itself, there's also a value. And the null value is the one and single value of the null type.

Undefined
-------------------------------

There's also an ```undefined``` value, which, as with ```null```, is the one and only value of the undefined type. You may go ahead and type something like

```javascript
undefined = 9.75
```

But if you'd use strict mode, you'd get a type error.

As a side note, even if ```use strict``` doesn't work on versions earlier than Internet Explorer 10, that's the standard you should strive towards. It's what the future's made of for JavaScript.

Infinity and -Infinity.
-------------------------------

This is another can of worms. Type ```-1/0``` and ```1/0`` in your console and see what you get. Even if math-wise it's impossible to reach either infinity or -infinity, given that we have a definite set of numbers in computer science, you can perform an operation that exceedes all possible bits and it just results as infinity or -infinity.

While that may be tripping in itself, I've yet to meet someone's code that translates its math into infinity.

0 and -0.
-------------------------------

Just like the positive and negative infinity.

It's just reversed, though. Instead of doing ```1/0```, you do ```0/1``` and the same goes for the negative: instead of ```-1/0``` you do ```0/-1```.

It's not terribly useful, but this is embedded in the laguage.

As an aside, JavaScript isn't the only one that has this plus zero, negative zero thing. Python, Ruby and a plethora of other languages have it. They're all quite good at hiding this.
