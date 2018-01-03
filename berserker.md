---
layout: page
title: JS Berserker Course
permalink: /berserker/
---

{% for post in site.posts %}
{% if post.category == "berserker" %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a>
  </li>
{% endif %}
{% endfor %}
