---
layout: post
title: "Coercion - 13 Implicit Coercion part 3"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

Booleans and double equals

Moving on from where we've left off, let's take a look at how the ```==``` can set you back. Let's take a look at that code again.

```javascript
var selectedUnit = "shaman";
if(selectedUnit){ // true
	console.log("feel the ground tremble");
}

selectedUnit = 0;
if(selectedUnit){ // false
	console.log("no unit selected");
}

if(selectedUnit==false){ // true; why?
	console.log("you thought this is easy");
}
```

Going over through line 11 again, where you check to see if ```selectedUnit == false```, it seems to suggest that ```selectedUnit``` goes through a ```toBoolean``` coercion in order to compare to ```false```.

As you've seen earlier, the exact opposite happens: the ```false``` becomes a ```0``` in order to evaluate the expression.

With that in mind, let's check the next piece of code:

```javascript
var peonsSelected = "2";
if(peonsSelected == true){ // no work today
	console.log("work work");
}

var peonsTotal = [];
if(peonsTotal){
	console.log("here are your peons");
}
if(peonsTotal == false){
	console.log("just kidding, you have no peons");
}
```

```peonsSelected``` gets assigned a string of ```"2"``` and you check that against the ```true``` boolean value.

And you'd most likely expect that to console log your message, because you know that ```"2"``` is a truthy value. But ```"2" == true``` won't work and this is an example of what I've told you earlier:

<blockquote> ```==``` against a truthy value will come and cause some problems for you</blockquote>

Why?

Because this operation won't convert ```peonsSelected``` into a boolean. Instead what it does is it converts ```true``` into the number ```1``` and the string ```"2"``` (which is the value of ```peonsSelected```) becomes number ```2```.

And as far as math goes, 2 is never going to be equal to 1 ```¯\_(ツ)_/¯```[[^1]]

Moving on, looking on line 6, we know from the truthy list of values that <u>an empty array will evaluate to ```true``` when implicitly coerced to ```boolean```</u>, thus executing your console log on line 7.

But when you compare it against a ```false``` value, you get your second gotcha.

And at this point you might be tempted to be done with JavaScript, because how can a thing be ```true``` and ```false``` at the same time?

Well, the empty array is always ```true```, it just doesn't stop here.

If you consider the number of operations that the JavaScript compiler does, you'll then begin to understand. So what's actually happening?

If you go back to the previous lectures and you check the case for objects, in our example of arrays, our <u>empty array ends up as an empty string</u>.

And into what does the empty string get coerced? Into the number 0.

Why? Because the ```false``` value from the right-hand of this comparison on line 10 will get coerced into the number ```0```.

Thus, ```0 == 0``` and the expression evaluates to ```true``` and so, our console log displays the message from line 11.

If you get past the initial mental acrobatics, you'll begin to understand and apply these rules into your own code.

<div class="divider"></div>

[^1]:```¯\_(ツ)_/¯``` represents nihilism, “bemused resignation,” and “a Zen-like tool to accept the chaos of universe.” It is Sisyphus in unicode.
