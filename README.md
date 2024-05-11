# Crowd polling site

This site is a proof of concept for a crowd polling site inspired by a similar concept i saw on a primagen live stream [ twitter link](https://x.com/tigawanna/status/1788623786553548867).

It can be hooked up to an external api to for example listen to the youtube livesream comments like seen in the video

but for now it's all in a ocketbase collection that will be felike d by a textbox
with a simple aggregation query

I might add a hook to clear the records periodically in the future

```sql
SELECT id AS id, value, COUNT(*) AS count
FROM "rendercon_crowd_polls"
GROUP BY value;
```

please do't break it as it's just a proof of concept put together ina an afternoon
