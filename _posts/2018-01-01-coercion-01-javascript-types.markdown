---
layout: post
title: "Coercion - 01 Javascript Types"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

The first topic of this course is JavaScript types. JS is known to be an UNtyped language. Or if you're more benevolent towards it, you might call it a weakly typed language.

Well, I say that's a false statement.

The EcmaScript spec clearly states that the language has the following types:
- ```undefined```
- ```string```
- ```number```
- ```boolean```
- ```object```
- ```function```
- ```null```

<div class="divider"></div>

With this in mind, there are differences between them. If you use the string 10 versus the number 10 in your code, your intentions are quite different in each of the case, because a string and a number have different behaviors and outcomes.

On the other hand, one of many confusions developers suffer from, when it comes to type coercion, is they believe that the language shouldn't have any kind of coercion at all.

That's somewhat hard, if not impossible, to write code that at some point doesn't convert from one type to the desired type.

My assuption is that every language should have a method of conversion from one type to the next.

<div class="divider"></div>

So this idea that JavaScript shouldn't coerce types is somewhat invalid, from my perspective. There are two ways you can coerce stuff in JavaScript:
- explicit
- and implicit

Once you understand the concepts behind these words, you'll get to make your own decisions about how to call them. Explicit coercion means that you, the coder, is the one who's deciding upon the coercion. Whereas the implicit coercion is the one where the engine decides for you.

We'll cover these coercion types in later lectures but now I want you to think of the last two types that JavaScript has:
- ```function```
- and ```null```

<div class="divider"></div>

If you think about it, ```function``` is a special value that you can work with. Back in the day I thought that ```function``` was in itself a type of JavaScript. Especially when I used the typeof operator with a ```function```. I would get back the word ```function```.

But, as you may have found out, JavaScript has actually two kinds of types: primitives and objects. And at their base, functions are nothing more than callable objects.

You can add properties and methods to them and manipulate them in the same way that you can with objects. Don't worry if you don't understand this concept yet. I will fully cover it in the Objects and Prototype sections.

So functions are unofficially a sub-type of the object type.

What about the ```null``` type? Let's analyze the difference between ```null``` and undefined.

<div class="divider"></div>

EcmaScript says something like "```undefined``` is an empty value, while ```null``` is the empty OBJECT value." That's the reason why these two are different. And it sounds like a load of BS to me and it may sound the same to you, because it doesn't make much sense, especially if you're coming from other languages. ```Null``` doesn't behave like an object at all.

What I think happened, as with most things that go south with JavaScript, is it used to be used for something (in this case, an object) and now it's not.

Why do I say that? Because if you want to empty a variable, say you have ```var farmedGold = 900``` and you want to unset it  (like PHP does), you have to do it like this: ```farmedGold = undefined```.

Nowadays, though, I don't think there needs to be a difference, a real useful difference between the two, because they're both used as empty values.

What I'd recommend is that you treat them the same. Pick either one of them and stick with it. Don't worry about the other one. If, on the other hand, you find yourself in a special situation, use coercion properly, as you'll see in the next lectures. If you do that, there should be no issues whatsoever.

There are some exceptions to this rule that I presented, where undefined is different than null, like in ES6, where there are default paramaters on functions. But from a practical perspective I think it's better to treat them as being the same.
