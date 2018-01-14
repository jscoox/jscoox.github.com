---
layout: post
title: "Coercion - 06 - toString"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

This is where we start talking about the topic of coercion.

So coercion is taking one value type and transforming it into another value type. It's happening when something in your code requires one value type to be used as a different value type.

That's where coercion operations come in: the ```toString```, ```toNumber``` and ```toBoolean``` operations. You can get a glimpse into their abstraction mechanism by using the functions ```String```, ```Number``` and ```Boolean```.

First up is the ```toString``` operation. Rather than getting into all the bushy details about this operation, I'd encourage you to study the specification and I'll just focus on what you'd be using for more than 90% of the time. So, before we jump into the most used cases, here's where you can find the spec:

<a href="https://www.ecma-international.org/ecma-262/5.1/#sec-9.8">https://www.ecma-international.org/ecma-262/5.1/#sec-9.8</a>

Or if you prefer a PDF version (without the toString bookmark):

<a href="https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf">https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf</a>

So, here are the most widely used cases of the ```toString``` operation (hint: you can check these out in your favorite browser):

```javascript
String(true); //outputs "true"
String(false); //outputs "false"
String(undefined); //outputs "undefined"
String(null); //outputs "null"
String(9.75); //outputs "9.75"
String(-0); //outputs "0"
```

Lines 1 through 5 make sense. They are logically coerced to string. But the last example, the -0, is just a blatant lie. That's what the compiler actually says: -0 is outputted as 0.

If it were up to me, these would be the things that I would fix. Not implementing syntactic sugar like prototypes disguised as classes. I'd make the compiler stop lying to me and also I'd talk with the browser vendors to give the coders a buffer and basically tell them

<blockquote>Gentlemen, you have say 2 to 5 years to prepare your codebase so that it won't crash when we fix these bugs that seem to persist from the stoneage.</blockquote>

Coming back to our example from line 7, if you'd give me the string "-0," that's what would make me happy. Because then I'd be accurate. But sadly, that's not going to happen very soon.

Let's talk about the ```String``` Object method. If you want to use ```toString``` on an object, or an array or on a function, you'd be using the ```toString``` method of that data type, if it's there. If it's not, then it does some other stuff. It invokes this thing called ```toPrimitive```, which we'll discuss in a future lecture.

So let's take an object. You'd do it like this:

```javascript
var resources = {farmedGold:9.75};
resources.farmedGold.toString(); // "9.75"
```

This toString method could be the default method that the object, or array or function has built in or the one you create yourself. Because, as you'll see in the objects section, you can override the native methods.

Now, what do you think happens when you create a ```toString``` method for a given value and you return something other than a string from it? That would be stupid and misleading, but say you do this:

```javascript
var resources = {farmedGold: 9.75};
resources.toString = function(){ return 9.75; };
```

This just overrides the ```toString``` native method of the object and returns a number, while JavaScript just pretends that the native method for this particular object just went poof. Didn't even exist.

So, ```toString```. It's best if you leave it the way it is and let it return a string. If you return anything else, you just made it invalid and unusable.

Arrays
------------------------------

Let's see, now, some of the problems that the native ```toString``` has with arrays. Again, you can use your favorite browser to test these out.

```javascript
[].toString(); // returns ""
[null].toString(); // ""
[undefined].toString(); // ""
[null, undefined].toString(); // ","
[4,9.75].toString(); // returns "4,9.75"
[[4,9.75], [7,6,3]].toString(); // returns "4,9.75,7,6,3"
```

If you've ever used JSONification, you know, the ```JSON.stringify()```, you'd then have the brackets. That's infinitely more useful and logical than doing what toString does with an array. It pretends that at the end of the day, these arrays are anything BUT arrays. Doesn't make any sense.

Here, try the same examples, but with ```JSON.stringify()``` in your browser. See what you get. You'll also see what I meant by sticking with either ```undefined``` or ```null```, earlier in the course, on lines 8 through 10.

```javascript
[].toString(); // returns ""
[null].toString(); // returns ""
[undefined].toString(); // returns ""
[null, undefined].toString(); // returns ","
[4,9.75].toString(); // returns "4,9.75"
[[4,9.75], [7,6,3]].toString(); // returns "4,9.75,7,6,3"

//
JSON.stringify([]); // returns "[]"
JSON.stringify([null]); // returns"[null]"
JSON.stringify([undefined]); // returns "[null]"
JSON.stringify([null, undefined]); // returns "[null, null]"
JSON.stringify([4,9.75]); // returns "[4,9.75]"
JSON.stringify([[4,9.75], [7,6,3]]); // returns "[[4,9.75], [7,6,3]]"
```

This is another mistake in the language and it's a mistake for not putting the brackets where they should be and also eliminating values where they should just be stringified.

Who in their right mind would make nulls and undefineds act differently inside an array than they do on their own?

```So, don't use toString on arrays, lots of bugs, big fat no-no, stay away, danger, turn back```

Don't ever rely on it, at least not until TC39 decides to do something about it.

Objects
---------------------------

Even if they don't have as many bugs, they do have some.

Try this in your browser console:

```javascript
var resources = {farmedGold:9.75};
resources.toString();  // returns "[object Object]"

var farmedGold = {};
farmedGold.toString(); // returns "[object Object]"
```

No matter what you do, if you call the toString method directly on the object, you'll get the same quote object object. Utterly useless. Why can't it do the same as ```JSON.stringify```? Why can't it do what String does to arrays, even? Utter crap. You must call the method on the object's methods or properties.

Functions
-----------------------------------

Stringifying a function is not so standard as one may come to believe. This is a complicated topic.

If you call ```function.toString()```, it depends on how browsers choose to implement the function.

Some engines leave functions as they are, some will strip down to the bare minimum, making the comments and whitespaces go poof.

If you're trying to parse function stringifications, you're doing kind of the same as messing around with parsing user agents. You're venturing into unknown territory, but it is definitely available and you can use it.

As an aside, regarding user agents, I heard a js dev say once

  <blockquote>relying on user agents for writing code is like an ode to our failure as developers.</blockquote>

Ok, so function stringification: I don't use it and also don't recommend it, therefore I won't talk about this topic.
