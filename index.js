
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// Dailymotion episode links
const episodes = [
  { episode: 1, id: "xat69ry" },
  { episode: 2, id: "xat6bru" },
  { episode: 3, id: "xat6dqm" },
  { episode: 4, id: "xat6hzi" },
  { episode: 5, id: "xat6l2y" },
  { episode: 6, id: "xat6gqe" },
  { episode: 7, id: "xatp3sm" },
  { episode: 8, id: "xavqe82" },
  { episode: 9, id: "xaxlo4m" },
  { episode: 10, id: "xb1a2vu" },
  { episode: 11, id: "xb1igaq" },
  { episode: 12, id: "xb3uem2" },
  { episode: 13, id: "xbk9yfa" },
  { episode: 14, id: "xb9me4i" },
  { episode: 15, id: "xbfr2ge" },
  { episode: 16, id: "xbgcfhu" }
];

const series = {
  poster: "DIRECT_POSTER_IMAGE_URL",
  background: "DIRECT_BACKGROUND_IMAGE_URL",
  id: "dailymotion:muhtemel-ask",
  type: "series",
  name: "Muhtemel Aşk",
  description: "Turkish series with English subtitles",
  videos: episodes.map(item => ({
    id: `dailymotion:muhtemel-ask:1:${item.episode}`,
    title: `Episode ${item.episode}`,
    season: 1,
    episode: item.episode
  }))
};

const manifest = {
  id: "com.geof911.dailymotion",
  version: "1.1.0",
  name: "Dailymotion Turkish Series",
  description: "Personal catalog of Turkish series",
  resources: ["catalog", "meta", "stream"],
  types: ["series"],
  catalogs: [
    {
      type: "series",
      id: "dailymotion-series",
      name: "Dailymotion Turkish Series"
    }
  ],
  idPrefixes: ["dailymotion:"]
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

app.get("/catalog/series/dailymotion-series.json", (req, res) => {
  res.json({
    metas: [{
      id: series.id,
      type: series.type,
      name: series.name,
      description: series.description
    }]
  });
});

app.get("/meta/series/:id.json", (req, res) => {
  if (req.params.id !== series.id) {
    return res.json({ meta: null });
  }

  res.json({ meta: series });
});

app.get("/stream/series/:id.json", (req, res) => {
  const episode = episodes.find(item =>
    `dailymotion:muhtemel-ask:1:${item.episode}` ===
    req.params.id
  );

  if (!episode) {
    return res.json({ streams: [] });
  }

  res.json({
    streams: [{
      name: "Dailymotion",
      title:
        `Muhtemel Aşk - Episode ${episode.episode} (English Sub)`,
      externalUrl:
        `https://www.dailymotion.com/video/${episode.id}`
    }]
  });
});

app.get("/", (req, res) => {
  res.send("Dailymotion Stremio addon is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Addon running on port ${PORT}`);
});
