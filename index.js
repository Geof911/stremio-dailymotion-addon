
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const series = {
  id: "dailymotion:muhtemel-ask",
  type: "series",
  name: "Muhtemel Aşk",
  description: "Turkish series with English subtitles",
  videos: [
    {
      id: "dailymotion:muhtemel-ask:1:1",
      title: "Episode 1",
      season: 1,
      episode: 1
    }
  ]
};

const manifest = {
  id: "com.geof911.dailymotion",
  version: "1.0.0",
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
  if (req.params.id !== "dailymotion:muhtemel-ask:1:1") {
    return res.json({ streams: [] });
  }

  res.json({
    streams: [
      {
        name: "Dailymotion Test",
        title: "Muhtemel Aşk - Episode 1 (English Sub)",
        externalUrl: "https://www.dailymotion.com/video/xaspi1i"
      }
    ]
  });
});


app.get("/", (req, res) => {
  res.send("Dailymotion Stremio addon is running");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Addon running on port ${PORT}`);
});
