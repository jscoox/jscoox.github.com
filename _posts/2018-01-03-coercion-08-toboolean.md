---
layout: post
title: "Coercion - 08 toBoolean"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

The ```toBoolean``` operation makes way more sense than the other two operations we've talked about, the ```toString``` and ```toNumber```.

Now, there are some cases where you might think that you're doing Boolean coercion, but you're actually not. As you'll see from the following examples, there are only some cases where Boolean coerces to false, while the rest of the cases will return true.

Boolean defines falsy and truthy values. It doesn't say anywhere on the ECMA specification about ```"truthy"``` or ```"falsy"```, these are just jargon.

Truthy = if you explicitely coerce something to boolean, it will return true.

And the other way applies for falsiness.

See how we're playing here with invented words? Just like JavaScript invented its own rules ^.^

Ok, so here's what it all boils down to (try and remember this):

<blockquote>if what you're trying to coerce isn't found on the <strong>falsy list</strong>, it automatically translates into truthiness.</blockquote>

So it doesn't matter if you do Boolean of an empty array, or an empty function, or an empty object.

```As long as what you pass in doesn't exist in the falsy boolean coercions, it will always return true.```

```javascript
Boolean(null); // returns false;
Boolean(undefined); // returns false;
Boolean(NaN); // returns false;
Boolean(""); // returns false;
Boolean(0); // returns false;
Boolean(-0); // returns false;
```

So ```null```, ```undefined```, ```NaN```, ```""```, ```0``` and ```-0``` <u>will always produce a false value when coerced</u>.

If you go back to the previous operations, whenever you think about an empty array, you get the feeling that you'd have to get a false value back. An empty array coerced to string returns an empty string, which is <u>falsy</u>.

This is where most entry developers get tripped up, because they think "if ```toString``` and ```toNumber``` coerce to falsy values, then ```toBoolean``` coerces to the same values as well."

I don't know what to say, other than this is JavaScript for you: crazy rules and bugs that outlasted the passage of time.
