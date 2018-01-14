---
layout: post
title: "Quiz 2 - Javascript Types"
description: "JS Berserker Course"
comments: true
category: "berserker"
keywords: "javascript, berserker, frontend developer"
---

{% include berserker_notice.html %}

Here's a hint: on line 4 lies a trick, see if you can spot it.

```javascript
var farmedGold = 9.75;
typeof farmedGold; // "number"
var farmedGold;
typeof farmedGold; // ?
farmedGold = null;
typeof farmedGold;
farmedGold = "farmedGold" * 9;
farmedGold; // ?
typeof farmedGold; // ?
farmedGold = 1/0;
farmedGold; // ?
typeof farmedGold; // ?
```

<div class="divider"></div>

Got it? Don't read this part if you haven't solved the quiz.

Ok, so there's a mistake of understanding that JavaScript's ```var``` declaration is occuring at that precise moment. But line 3 is just a re-declaration of ```var farmedGold``` and that means that line 4 is also returning ```number```. It's the same mistake as thinking that you're redeclaring variables inside your loops.

Remember: A variable is only declared once per scope.
