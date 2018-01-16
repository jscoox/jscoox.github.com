---
layout: post
title: "Coercion - 09 Explicit Coercion part 1"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

Now we're going to talk about how you can use explicit coercion in your JavaScript code.

<blockquote>Explicit means "this is what you want to do and this is what is going to happen," mirrored in your code for everyone to see</blockquote>

So when looking at the code that you write, anyone would be able to say 'yes, I understand that this will coerce to that.' And once you'll use it in your code, you'll understand why it's so necessary in your day to day programs.

As you know already, approximately 70% of the time, you're maintaining codebases, you're not creating them. So I doubt that you'll never have to use coercion in your code. I'm not saying that it happens on every line of your programs, I'm just saying that you'll come to need it, one way or another, as any self-respected coder does.

Let's start with coercion from strings to numbers and vice versa.

```javascript
var stringDaytime = "9.75";
var numberDaytime = parseFloat(stringDaytime);
numberDaytime; // 9.75

numberDaytime = Number(9.75);
numberDaytime; // 9.75

numberDaytime = +stringDaytime // explicit
numberDaytime; // 9.75

numberDaytime = 10;
stringDaytime = String(numberDaytime);
stringDaytime; //"10"

stringDaytime = numberDaytime.toString();
stringDaytime; // "10"
```

Let's say I have a string, like the one you see on line 1, the 9.75 string. And I want to coerce it from its string type to a numeric type.

What do I use? parseFloat with a string argument.

Note, I'm not using ```parseInt```, because given the integer nature of the function, ```parseInt``` will shave my .75 value and leave me with just the whole value of 9.

Ok, so ```parseFloat```. What do you think it is? Coercion? Many people think it is, but technically speaking it's not, it's just a parse function.

If you're feeding it the string 9.75, you'll get back the number 9.75.

What about if you give it a 9.75rem? Still 9.75, because the function is parsing left to right. That's all it does. It's a distant cousin of coercion, but not in the nucleus of the coercion family. The parse functions are useful, but separate these concerns in your mind: parseFloat is parsing, coercion is coercing.

Now what about line 5? As you've seen in the previous lectures, that's a true coercion right there. I'm calling the ```Number``` function, notice that it's WITHOUT the "new" keyword. I say ```Number("9.75")``` and I get back the number 9.75. Now that's an explicit coercion.

This line we're talking about, line 5, is in my opinion the cleanest way you can coerce types. It's not the shortest, as the one on line 8 is, but it's got that official syntax to it. Line 5 is without question, clear as day about what it does.

Now, what about line 8? I've put the + symbol in front of the ```stringDaytime``` variable and it does the same thing as line 5. The +, when used with values, invokes the ```toNumber``` algorithm.

So, both lines 5 and 8 are explicitly coercing types, from string to number. But what makes explicit coercion? Is it what the code does? Is it what the code is intended to do? Or maybe is it what the coder understands from the code?

Now, as you know, people code for other people, they don't code for machines. If it were that easy, to code for machines, we'd have machines doing all the grunt work of coding and we'd have a bunch of binaries all across the globe.

But that's not it, is it? We code so that other folks can read what we meant. Now this may seem far fetched to you, but writing code is no lesser that writing a story.

If you don't have a premise (design patterns), story structure (code logic) and a well-defined three dimensional hero (naming conventions for vars, methods and components), then all you have is a garbled mess of characters, which the computer is still capable of understanding.

Let compressors and minifyiers obfuscate your code. They are very good at taking your carefully chosen names you've given to your variables and objects and turning them into expresionless, meaningless "o"s and "a"s.

Your main concern as a developer should be writing well-performing and self-described code.

<blockquote>This is a whole topic in and of itself but a key takeaway would be <strong>don't be afraid to express your meaning in your code, through clean and human-readable code</strong></blockquote>

Coming back to explicit coercion, this is the same case: explicit coercion is not objective. It's purely subjective. Because not all coders are made the same.

If one coder understands what line 5 is all about, that doesn't mean that he or she will understand what line 8 tends to do. So it all comes down to your experience as a coder, as well as what the code in itself does.

If you learn about what it does, then line 8 will never present a mystery to you again.

What it all comes down to, regardless of the way you do coercion, as with <a href="{% post_url 2018-01-01-coercion-01-javascript-types %}">the ```null``` or ```undefined``` dilemma</a>, just pick one way of doing coercion and stick to it.

Chances are that if you're consistent throughout your code, you and your fellow coders will have an easy time debugging and understanding your previously written code.

<blockquote>Key takeaway: it's great if you stick to one way of explicitely coercing things.</blockquote>

Ok, now what about coercing from a number to a string? The same way, we have two methods for doing this, illustrated on lines 12 and 15.

While line 12 is pretty straightforward, line 15 is a bit more special. You'd say, WTF, I thought primitives didn't have methods, because primitives are NOT objects.

Well, this is a magic trick, albeit another one, that JavaScript pulls off, because behind the scenes, what that line of code actually does is it invokes a ```new Number``` object, after which it automatically applies the toString method.

So it actually goes like this:

```javascript
stringDaytime = new Number(numberDaytime);
//new Number(10);
//stringDaytime.toString()
//finally, we get the new number 10
```

We first call a new constructor function that takes a parameter of 10 (the value of ```numberDaytime```), it calls the ```toString``` method on ```stringDaytime``` and finally, we get the new number 10

Subtle. And also evil, you might think. And this is where explicit meets implicit. Because you never invoked a new object, you didn't even think that this would happen.

So, while JavaScript invokes the ```Number``` object wrapper around this primitive value, it's actually useful. Because I don't think you'd want to type it all out.

Well, I know what you may be saying: you'd rather type it all out and know what's happening under your nose, than having all this witchcraft unveil in front of your eyes. Well, once you get the hang of this, you'll see that it also comes with its own benefits.

Given that we've talked about the philosophy behind what explicit and implicit means and also touched a bit on another favorite topic of mine, story structure, consider this implicitly explicit coercion of the ```toString``` method a foreshadowing into the conclusion of the coercion chapter: <u>not all implicit coercions are evil</u>.

To close this lecture, as long as you have the option of line 12 and you don't yet feel comfortable around line 15, use line 12. It's more straightforward and cleaner than the implicitly explicit option.
