---
title: News
layout: base.njk
permalink: "/news/index.html"
---

{% if collections.allNews %}

{% for article in collections.allNews %}

<a href="{{ article.data.url }}">{{ article.title }}</a>—{{ article.date | articleDateFormat }}
{%- if article.remoteURL -%} <a href="{{article.remoteURL}}">(original link)</a> {%- endif -%}

{% endfor %}

{% else %}

Weird, there's no news found.

{% endif %}