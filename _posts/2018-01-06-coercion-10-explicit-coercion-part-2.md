---
layout: post
title: "Coercion - 10 Explicit Coercion part 2"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

We've talked about coercing strings and numbers, let's see what happens when you want to coerce something to a boolean. Here's where we discuss one of the special cases where you might trick yourself into a trap, thinking that something's happening but it's not. Let's shed some light and force some types into booleans.

```javascript
var daytime = "9.75";
var boolDaytime = Boolean(daytime);
boolDaytime; // true;

boolDaytime = !!daytime;
boolDaytime; // true;

boolDaytime = daytime ? true : false;
boolDaytime;
```

Looking at line 2, you can call the ```Boolean``` function, which will explicitly coerce the ```boolDaytime``` var into a boolean. And if you'd argue for purism, you'd vote this method all day, everyday.

But. I've never seen nor heard anyone use this method. That's why everyone I know does the 5th line. I'm not saying you should do too. All I'm saying is that this is the only way I've encountered boolean coercion in codebases.

So what's going on with this double negate thing? The single negation operator converts whatever it is you want to convert into the opposite boolean value.

It's a bit awkward, at first.

When you think that the negation operator flips your values, you'll have an aha moment. It's more philosophical in nature, but an aha nevertheless.

So if the exclamation sign takes your variable and asserts it as being true, it will switch it to false, the same way it'll do with false: it'll switch it to true.

<blockquote>That's what the negation does: it coerces and it switches the boolean value.</blockquote>

If you'd want only to evaluate the ```daytime``` var as a boolean, you'd find this a bit annoying. That's why you get to use two negation operators, to switch it back to its original state. So there you have it, the explicit way of coercing to a boolean.

Again, if it were to stick to my guns, I'd say, for clarity's sake, just use the ```Boolean``` function, but I'm going to say "just stick to one method," preferably the double negation one, because that's the most used one.

Even if it takes a bit of time and self-reasoning to get it to sink in.

Let's now switch our attention to line 8.

What it basically says is evaluate the ```daytime``` var and if it's truthy return true, if it's falsy return false.

On a first glance, this may seem as an explicit coercion, because the value that will get assigned to ```boolDaytime``` will be either true or false, there's no beating around the bush on this one. But there's a problem, because if you want to test the ```daytime``` var, you have to implicitly coerce it to boolean and only after that you get to return either true or false. See where I'm getting at?

An implicit coercion takes place, before any ```true``` or ```false``` is returned. This is, from my perspective, a waste of time for both the developer writing the code and the one who's going to read it later on. It may even be your future self. And you'll spend a few dozen seconds, if not minutes, understanding what you wanted to do there, in the first place.

That's why I recommend you either use line 2 or line 5.

Even line 2 is better than line 8.

Just do yourself a favor and ditch this implementation, if that's you.
