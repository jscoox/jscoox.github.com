---
layout: post
title: "Coercion - 15 == v ==="
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

We've talked about this coercion business for quite some time now. Let's finally see the differences between ```==``` and ```===```.

No doubt, you've heard the old addage: ```==``` checks the value, while ```===``` checks both value AND type.

You'll eventually see that the first thing the algorithm says about the ```==``` is a question about "are the two types the same?" So the ```==``` checks the type, the same way the ```===``` does.

<blockquote> The best thing to say about these two operators is that the ```==``` lets you coerce stuff, while the ```===``` doesn't </blockquote>

So, it doesn't matter what you've been led to think, as long as you're comparing the same types.

Before we dive into some code examples, which one do you think is more labor intensive?

Which one do you think that has to work more than the other?

If you'd say ```===```, you'd be wrong.

Why? Well, here's why:

```==``` lets you coerce stuff
```===``` doesnt' let you coerce stuff

What's your answer now? :)

With each step of coercion that the ```==``` takes, you get a slightly bit more work from it.

Let's see some cases.

```javascript
var orc = [];
var peon = "";
if(orc == peon){ // yup
	console.log("be happy to");
}
if(orc === peon){ // nope
	console.log("me not that kind of orc!");
}

orc = 0;
if(orc == ""){ // yup
	console.log("work work!");
}
if(orc === ""){ // nope
	console.log("me not that kind of orc!");
}
```

You have an ```orc``` array and a ```peon``` empty string.

By ways of unsafe comparison (as you've seen in the previous lectures), these two will evaluate to ```true```, when compared with the ```==``` (see line 3).

That's why you get line 6, where ```===``` comes in and saves the day.

Cool, no coercion for line 6!

That's the way you think about ```==``` v ```===``` equals: Do I want to avoid coercion?

<blockquote>If I want to avoid coercion, I'll use ```===```. Otherwise, just use ```==``` and see how far the rabbit hole goes</blockquote>

Similar cases on lines 11 and 14: ```""``` (an empty string) can and will be coerced into the number ```0```. That's why you use line 14, so that empty string (```""```) remains an empty string (```""```) and won't get converted into a number.
