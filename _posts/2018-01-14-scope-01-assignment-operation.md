---
layout: post
title: "Scope - 01 Assignment Operations"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

```javascript
var orc = "work work";
var buildings = ["altar of storm", "barracks"];
```

What's scope? [[^1]] It's where things are located.

So what are you looking for? Everything you give an identifier to.

Like ```var orc = "work work"``` or ```var buildings = ["altar of storm", "barracks"]``` and so on.

The javascript compiler has to go and search for these identifiers and see where they exist and where they were declared.

There can be a whole bunch of scopes, as you'll get to learn in this chapter.

So the questions the compiler needs to ask, so that it can retrieve your data are:
1. what do you need?
2. who do you need it for?

Now, before we dive into the nitty gritty of scoping, you need to understand <u>why javascript has scoping</u>.

You probably noticed that during the coercion chapter I said things like "javascript compiles this" and "javascript compiles that" and so on.

That's because, even if you use your browser as the environment in which javascript runs, javascript is still a compiled language.

It means that it doesn't read and interpret your script files line by line, like, say, bash scripting does.

<blockquote>Javascript takes your whole file, reads it and <strong>afterwards</strong> it analyzes it, knowing which line is intended to do what</blockquote>.

So if on line 3 of your script (whatever script you may have written) you use a function that's been declared on line 12 from the same script, javascript has already seen the function declaration on that line 12, even before it executes it on line 3.

That's the reason you have scoping. And closures.

With no further due... here's some code!

```javascript
var orc = "I'm a peon!";

function grunt(){
	var orc = "Me no sound like Yoda.";
}

function twoOtherOrcs(orc){
	orc = "You ever get hit by lightning where the Sun don't shine?";
	spiritWalker = "Fear my moo of fury!";
}

grunt();
twoOtherOrcs();
```

One very important part of the compiler is for it to find ```var``` and ```function``` declarations and to place them in their each appropriate scopes.

So, as mentioned earlier, you need to think that the compiler has already stepped through all of your code once and then it'll pass it one more time, where it will execute your code, step by step.

Now that we understand how we'll dissect the code in this chapter, from the compiler's point of view, let's see what these lines of code do.

So, on line 1 you already see the ```orc``` var declaration.

You see that the variable has been immediately initialized, with an initial value of string ```"i'm a peon"```.

Most ppl will think of this as a whole statement, left to right, no questions asked. This is what we'll fix today, in this lecture.

As before, maybe you've heard me say earlier, in the coercion chapter, when I blabbed about "var orc gets assigned this or that value".

That's what's actually happening: two different operations.

<blockquote>First you're declaring the ```orc``` var and the second is assigning it a string value</blockquote>

And it's not happening just for variables, it applies to functions as well.

Let's pretend for a moment that the javascript compiler is a human being, like, say, Bob the neighbour

Let's pretend that Bob, you neighbour javascript compiler walks down your path and says:

"Hey, neighbour, I see that on line 1 we have a variable declaration with an identifier named ```orc```! What scope do you think it resides in?"

And you'll be answering, like a friendly neighbour, "why, Bob, this is the ```global scope```, of course!"

Now, the next thing Bob does is look for the next declaration, which happens to be on ```line 3```, with an identifier of ```grunt```, in the same scope with the ```orc``` variable, from earlier on ```line 1```. The same happens with the ```twoOtherOrcs``` function.

Now, after all three data types have been declared and analyzed, let's dive into each of the two functions: the ```grunt``` and ```twoOtherOrcs``` functions. The ```orc``` variable has no more secrets for us, so we can move on.

Now that the ```grunt``` function has been declared, let's step into it for a bit.

Bob comes along and observes: "Hello, neighbour, I see a variable declaration with the identifier of ```orc```, on ```line 4```. Do you have any idea what scope this variable resides in?"

And you will answer "Evidently, in the scope of the ```grunt``` function."

Bob, having no more declarations inside the scope of ```grunt```, will go back into the ```global scope``` and move on, to the ```twoOtherOrcs``` function.

And Bob asks "Hey, I see ```twoOtherOrcs```. Let's see what other declarations we might find!"

And you might forget about that parameter that ```twoOtherOrcs``` has, the ```orc``` variable.

It's just as doing ```var orc``` inside the ```twoOtherOrcs``` function, except that it's been declared on the parameter list.

So the compiler reads that as a new declaration inside the scope of ```twoOtherOrcs``` function, making it a new local variable.

Next, when the execution phase comes into play, the assignments start happening.

Given that the declarations have been taken care of in the compilation phase, what's left for ```line 1``` to do is to assign the value to the ```orc``` variable.

The type identifier, the ```var``` part, doesn't exist in this phase.

If you can't visualize this, imagine you do this:

```javascript
var orc
var orc
var orc
var orc
var orc
var orc
var orc
```

Everything after the first ```var orc``` declaration will be ignored, because ```orc``` has already been declared.

Say you do the same two thousand lines later, you rewrite ```var orc```. This wouldn't re-declare the ```orc``` var. The compiler will just work with it and do whatever it is it needs to do, because the declaration has already happened at compile time.

You'll understand this in the hoisting lecture, which comes later in this chapter of scoping.

As reminded with my assignment semantics, when I told you that ```var orc``` gets assigned this or that value, let's be geeks for a moment and use the language of Bob the compiler.

Let's think about the LHS assignment and RHS assignment, which stand for ```Left Hand Side Assignment``` and ```Right Hand Side Assignment```.

So, on ```line 1```, ```var orc``` is an LHS assignment of a string value. It takes the string value of ```I'm a peon``` and assigns it to the target, which is the orc variable.

So, this time you get to ask Bob the compiler "Hey, Bob, here's a good one for you: you have an LHS assignment for an orc var, got any idea where it might be?"

And Bob will kindly answer you "Yes, I do, it's in my ```global scope```, you just declared it a short while ago."

Given that we have a simple assignment of a string to the orc var, we're not forced to look any further, like we would've had to if we'd had something like

```var orc = anotherOrc;```

This would've been an RHS and it would've made us look into a different scope, outside our current one. But this is something we'll talk about later.

So Bob is giving us back the reference to the ```orc``` var, which we've declared earlier, in the declaration phase and gives us the string value we want to assign to the orc var. And with that, we can move on executing past ```line 1```.

<div class="divider"></div>

[^1]: I'll add some pictures along the lines to illustrate the concepts from this lecture, given that it's quite text-heavy and ```Scoping``` is one very important aspect of javascipt. This acts as placeholder for a ```TODO``` item.
