---
title: News
layout: base.njk
permalink: "/news/index.html"
---

{% for article in collections.remote-news %}

{{ article.title.rendered }}

{% endfor %}