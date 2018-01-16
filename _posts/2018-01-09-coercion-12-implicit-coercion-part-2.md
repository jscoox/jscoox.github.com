---
layout: post
title: "Coercion - 12 - Implicit Coercion part 2"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

Booleans and implicit coercion. This should be fun.

Let's see the code.

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

On line 2, the if statement needs a boolean. If I give it anything other than a boolean, it's going to implicitly coerce it, and it does that using the ```toBoolean``` operation.

This means that everything that gets passed to that if statement on line 2, it's going to be evaluated checking the truthy and the falsy lists.

In this case, ```selectedUnit``` is on the truthy list, so we get a var that's coerced to ```true```.

<blockquote>When you coerce 0 to boolean, it's going to get coerced using the falsy list.</blockquote>

So line 7 will get evaluated as being ```false```, while line 8 will not execute.

What happens on line 11, ```one of the most horrible code examples out there```?

Well, you might be tricked into thinking that ```selectedUnit``` gets coerced into a boolean, so that it can be compared with the false value.

Surprise, though, there's no ```toBoolean``` operation taking place on this line. It is the most sheep thing in wolf's clothing that you can do in JavaScript, because it does the opposite of what you'd expect.

So what happens is that instead of ```selectedUnit``` becoming a false (like you'd expect it to, given it's been set to the 0 value, on line 6), both ```selectedUnit``` and ```false``` get treated like a <u>number comparison</u>.

So ```selectedUnit``` is already 0, a number.

Now, what the compiler is left to do is get the false value and convert it into a 0.

And, of course, 0 is equal to 0.

This just works. And if you'd write such code, you might get lucky once. Or twice.

But if you don't understand what's going on, you might be playing with fire. You'll encounter code that will screw you over big time if you expect line 10 to just work.

<blockquote>That's why it's not a best practice to use a double equals comparison with one of the arguments being true or false, because you'll create code that may at some point break your logic and create confusion when debugged.</blockquote>

And this is not the path to becoming warchief.

Now that we got that out of the way, let's see what the double pipe (```||``` - the ```OR``` operator) and the double ampersand (```&&``` - the ```AND``` operator) tend to do for us. For starters, they work differently in JavaScript than they do in other programming languages, like in PHP for example.

Looking at line 14, ```||``` is used to assign a default value to something.

What line 14 says is

<blockquote>if selectedUnit is not set or it has a falsy value, the currentlySelectedUnit var will get assigned the string "selectedUnit".</blockquote>

Like said earlier, in other languages the ```||``` doesn't behave like that.

In PHP, for example, it will return either ```true``` or ```false``` values, which means that it does a literal logical OR, which can only result in the ```true``` or ```false``` values.

In the present age of programming, JavaScript has given the ```||``` and the ```&&``` operators different behaviors than the ones that were initially intended.

To get what I mean, let's see the following lines of code.

``javascript
var unit = "peon";
var selectedUnit = unit || "witch doctor";
```

Let's say we have a ```var selectedUnit```

It gets assigned a test of whether the ```unit``` var is truthy and if it is, ```selectedUnit``` will get around the ```unit``` var and finally get assigned the ```"witch doctor"``` string. But if the ```unit``` var is indeed truthy, then the ```selectedUnit``` will get assigned the ```unit``` var, which will finally return the ```"peon"``` string.

Imagine that the ```||``` does the following ternary:

```javascript
var selectedUnit = unit ? unit : "witch doctor";
```

It's going to test the ```unit``` var and if ```unit``` is truthy, it will pass the ```unit``` value. Otherwise it will pass the ```"witch doctor"``` string. This is just how JavaScript works.

Let's turn our attention to the ```&&```, now that we've evaluated the ```||```.

```javascript
var selectedUnit = unit && "witch doctor";
```

What this does is:

```javascript
var selectedUnit = unit ? "witch doctor" : unit;
```

As you've noticed, it's the swapped operation from the ```||```.

So the ```||``` and the ```&&``` don't result in actual ```true``` or ```false``` values.

Instead, you should just think of them as <u>selection operators</u>.

That's how I do and that's my recommendation, because they select one of the two values that get passed on their left and right sides.

To wrap it up, both ```||``` and ```&&``` are doing implicit coercions to boolean.

It doesn't matter if you're against implicit coercion or not, as long as you use these two operators, because if you use them, guess what? You've just invoked the powers of implicit coercion to come to your aid.

So is implicit coercion that evil as you've been told or is it actually useful? Food for thought.
