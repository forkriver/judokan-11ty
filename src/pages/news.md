---
title: News
layout: base.njk
permalink: "/news/index.html"
---

{% if collections.allNews %}

{% for article in collections.allNews %}

<a href="{{ article.url }}">{{ article.data.title }}</a>—{{ article.date | articleDateFormat }}
{%- if article.data.remoteURL -%} <a href="{{article.data.remoteURL}}">(original link)</a> {%- endif -%}

{% endfor %}

{% else %}

Weird, there's no news found.

{% endif %}