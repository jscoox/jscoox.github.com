---
layout: post
title: "Coercion - 14 Implicit Coercion part 4"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

Worst case scenario examples

```javascript
0 = []; // true => 1st strike
0 = {}; // fasle
0 = undefined; // false
0 = null; // false
0 = NaN; // false

"0" == undefined; //false
"0" == null; // false
"0" == NaN; // false
"0" == 0; // true
"0" == ""; //false
"0" == false; // true => 2nd strike

"" == []; // true => 3rd strike
"" == {}; // false
"" == undefined; // false
"" == null; // false
"" == NaN; // false
"" == 0; // true => 4th strike

false == []; // ttrue => 5th strike
false == {}; // false
false == undefined; // false
false == null; // false
false == NaN; // false
false == 0; // true => 6th strike
false == ""; // true => 7th strike
```

Let's take a look at this list for worst case scenarios.

For example, looking at line 4, ```0 == null```, evaluates to false. They're not the same thing, they don't represent the same values and therefore they don't coerce to ```true```.

Actually, if you remember what we've discussed in the beginning of this little coercion trip, ```null``` and ```undefined``` are coercively equal to each other and to no other values, so ```null``` cannot be coercively equal to anything else.

Line 1, on the other hand, is something royally wrong. Because number ```0``` and ```[]``` are two totally different values. And still they coerce into equality. Strike 1.

So, essentially we have 24 scenarios, out of which 7 of them are really worst case scenarios. And if you take those 7 worst case scenarios and you remember what I said in the beginning, that <u>the worst thing in coercion is evaluating the comparison between 0 and false to true</u>, you'll see what I'm getting at.

These hateful 7 if you'd like, are the reason why developers stay away from coercion like it's the plague.

Let's see, then, in the order of the highest offending ones, what these worst case scenarios are.

```javascript
0 == [];
"0" == false;
"" == [];
"" == 0;
false == [];
false == 0;
false == "";
```

Out of these 7, what I think are the truly horrible, nightmarish and unspeakable scenarios, lines 2, 5, 6 and 7 make the grid for me, even if I've come to terms with line 5, as you might have, also.

What this does is, again, telling us about the rule from the previous lecture, where we've seen that you should avoid comparing against a ```true``` or ```false``` value as much as possible.

So you'd never do something like ```== true``` or ```== false```.

If you'd consider this as a future rule of thumb, lines 2, 5, 6 and 7 are already obsolete and they don't even count anymore, thus killing 4 worst case scenarios out of 7.

What now? You'd be left with three worst case scenarios:

```javascript
0 == [];
"" == [];
"" == 0;
```

Now consider what I told you: say TC39 fixes the ```""``` becoming a ```0``` and from tomorrow on you'd never have that in your code. If you'd do that, all these remaining three worst case scenarios would vanish. Instantly.

But there's a good side to these three: they don't turn up all that often in codebases, especially lines 1 and 2, where you end up comparing number ```0``` against ```[]``` (an empty array), or for that matter, an empty array against any other value.

So, given that, we're only actually left with one worst case scenario: the root of all evil in coercion, line 3.

I'm not saying that what you've seen in this lecture is the only list of weird coercions and bad examples.

There are many others out there, which I've not taken into account but I strongly believe that most of them will come down to one of the examples I've shown you in this lecture here.

Now, before we end the implicit coercion lectures, let's see one of the weirdest examples around the web. Well, weird if you don't know the coercion algorithms and operator precedence.

```javascript
var peons = [];
peons == !peons;
```

On a first glance, this looks and sounds crazy. How can an array be equal to the negation of itself? Actually, it's not crazy at all. Remember: operator precedence.

The ```!``` and ```==``` operators don't happen in the same time. Let's break this operation into steps:

1. The negation operator (```!```) has precedence,
2. and it will coerce the array (```[]```) into a truthy value,
3. which will then evaluate into the negation of ```true``` (which is ```false```)
4. and then ```false``` will be compared against an empty array (```[]```) -- which (by the way) we've already handled on the previous line 5, when we've originally met and busted the hateful 7 worst scenarios of implicit coercion.

So you'd never have that problem if you'd ditch comparing against a ```true``` or ```false``` value.

Hoping that this has shed some light on implicit coercion, rather than blindly applying some rules that you've heard from this or that JavaScript guru claiming that implicit coercion is evil, you can now sit down and digest the rules and your code along these rules, hopefully making the best judgment for yourself.
