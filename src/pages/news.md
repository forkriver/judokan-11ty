---
title: News
layout: base.njk
permalink: "/news/index.html"
---

<!-- @todo Get the remote news and local news merged properly -->

{% if remoteNews %}

## Judo Manitoba

{% for article in remoteNews %}

<a href="{{ article.url }}">{{ article.title.rendered }}</a>—{{ article.date | articleDateFormat }}
{%- if article.remoteURL -%} <a href="{{article.remoteURL}}">(original link)</a> {%- endif -%}

{% endfor %}

{% else %}

Weird, there's no news found.

{% endif %}