---
layout: post
title: "Coercion - 07 toNumber"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

```toNumber``` morphs any value and turns it into a number. Or into a NaN. Take a look at the following code and test it in your browser console.

```javascript
Number("0"); // returns 0
Number("-0"); // returns -0
Number("9.75"); // returns 9.75
Number("9."); // returns 9
Number("."); // returns NaN
Number("009.75"); // returns 9.75
Number(".75"); // returns 0.75
Number(""); // returns 0
Number(null); // returns 0
Number(undefined); // returns NaN
Number(false); // returns 0
Number(true); // returns 1
```

Line 2 is asymmetrical to its String cousin. ```Number(-0)``` returns ```-0```, while ```String(-0)``` returns ```"0"```. It's not a two way mirror, which is another weird thing with a JavaScript trademark imprinted all over it.

Float values, see lines 3 and 4, work as you might have expected, but if you put a dot all by itself, you get a NaN (see line 5). Don't really know what the reason behind that is.

What's interesting on line 6, the 009.75 example returns 9.75, and ignores the leading zeros.

This is somewhat reasonable, all in all. Line 8, though, is the special cousin of the other lines of code above it. <u>This is what I believe to be the most toxic reason why coders hate coercion and don't understand it</u>.

```Number("") converting to a zero is one of the key concepts you need to remember, if you want to understand coercion.```

Again, if it were my call, I'd change this and maybe 90% of all this coercion hate in JavaScript would disappear overnight.

Turns out that other languages don't have this, but all languages have special cases, anyway.

What's unique to JavaScript is that they made a not so great decision about this particular special case. If it were my call, ```Number("")``` would return a NaN.

Ok, line 9. Number(null) returns 0 but Number(undefined) returns NaN. I'd say make them both NaN or both 0. This is just madness.

The last 2 lines make sense, when you think about what the boolean values should be.

Now, I don't know if you've worked with databases and flags, but this is the same logic behind them: ```0``` signifies invalidness or better yet an inactive state, while ```1``` signifies validness or better yet active state.

To understand better, think about something like an active or inactive blog post. If you were to save your blog post as a draft in a backend dashboard but you didn't want to display it for your audience, you might do something like ```is_active``` flag as 0. It's not the best example, but I hope you see that Number of true and Number of false do make sense.
