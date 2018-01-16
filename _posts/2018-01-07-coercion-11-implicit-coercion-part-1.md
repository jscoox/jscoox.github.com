---
layout: post
title: "Coercion - 11 - Implicit Coercion part 1"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

We've covered explicit coercion, so now let's take a look at the implicit side.

<blockquote>Implicit coercion is something that is a result of some behind the scenes operations, operations that aren't obvious when you look at your codebase.</blockquote>

With that statement, we're going to see if implicit coercion is indeed smelling of brimstone, as in ```"is implicit coercion the devil's work?"```

If you're a starting developer or even a seasoned one with some shaky knowledge about this topic, you'll say "yes".

<blockquote>This is where I step in and tell you that ```not all implicitness is bad``` and that you should begin to use it and implement it in your codebase, once you get a good grasp of it.</blockquote>

With that said, take a look at the following lines of code.

```javascript
var daytime = "9.75";
var daytimeCoerced = daytime - 0;
console.log(daytimeCoerced); // 9.75

daytimeCoerced = daytime - "0";
console.log(daytimeCoerced); // 9.75

daytimeCoerced = daytime / 1;
console.log(daytimeCoerced); // 9.75

var houses = 4;
var housesCoerced = houses + "";
console.log(housesCoerced); // "4"

housesCoerced = houses - "";
console.log(housesCoerced); // 4 ... what the doomhammer?
```

Take a look at line 2. When you say ```daytimeCoerced = daytime - 0```, you're doing a subtraction operation, which comes from math.

So, given that the subtraction operation is only available for numbers, it means that the minus operator will coerce the left-hand variable (which is a string) into a number. And that results into ```daytimeCoerced``` getting assigned a value of the 9.75 number. This is what's called implicit coercion: from the string 9.75 to the number 9.75.

Now, this is where you're starting to say WTF, I've never seen that in real life. Well, I can tell you that this is one of many debatable cases regarding JavaScript's decisions on how to coerce your code.

If you take a look at line 12, you'll probably say "ah, well, here's a case of implicit coercion that I've stumbled upon before!" And then I'd say that line 2, while not as popular as line 12, is just as used in codebases, you just didn't mind it all that much. Until now.

It's all a matter of getting used to, that's all.

Moving on to line 5, you'll see that it does just the same thing as line 2, because, as stated before, the subtraction operator is only available in math. So it doesn't matter if both of your arguments are string or one of them is a number, ```the minus sign will always coerce your arguments to numbers```.

Line 8 is yet another example of number coercion. You might have encountered this one more often than the minus sign, in terms of popularity, especially if you come from other programming languages.

<blockquote>So the minus and the divison signs are used to coerce from string to number.</blockquote>

You might say "it doesn't feel good," or "I don't quite get why you'd do that" and that would stem from the fact that you still view implicit coercion as one of the roots of evil in JavaScript. And that's because it abstracts away some operations that you don't yet feel comfortable with.

Again, with time, it will pass. Just give these two, the subtraction and division operators, a chance. Oh, yeah, and the same happens with line 15, because the empty string coerces to 0.

Yes, I know, the empty string should've coerced into something else entirely, like a NaN or somehting. But... TC39 ```¯\_(ツ)_/¯```

Now let's tackle the last lines of code, where we'll talk about coercing from numbers to strings. As you've probably seen by now, the example from line 12 doesn't have any secrets to you anymore. If you haven't or you don't quite understand how it works, here's the jest of it: if the assignment operator sees that one of the following two parameters is a string, it just coerces the number parameter (in our case the ```houses``` variable) into a string and then it attaches the following parameter, which is a string (in our case, an empty string), therefore resulting into an overall string of ```"4"```.

Why is that? Well, it's because unlike other programming languages, like, say, PHP, which has an addition operator (the ```+```) and a totally different concatenation operator (the ```.```), JavaScript has the same operator for both adding and concatenating.

<blockquote>So, when the compiler sees that you're placing the + sign between two numbers, it will do addition, the math operation. But when it sees that one or more parameters are strings, it will do concatenation.</blockquote>

I'm still in the camp of those who say that JavaScript should've had different operators for these two very separate things, but as with all the other miscreants nested deep into the language, ```¯\_(ツ)_/¯```, there's nothing to be done anymore.
