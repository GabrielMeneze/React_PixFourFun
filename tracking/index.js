const express = require('express');
const cors = require('cors');
const TrackingCorreios = require('tracking-correios');
const app = express();
app.use(cors());

const PORT = 3001;

const get = (object, path, fallback = null) => {
    const pathKeys = typeof path === "string" ? path.split(".").filter(key => key.length) : [];
    const result = pathKeys.reduce((dive, key) => dive && dive[key], object);
    return result || fallback;
  };

app.get('/', (req, res) => {
    const tracking = get(req, 'query.tracking')


    TrackingCorreios.track(tracking)
    .then((result)=>{

        const events = get(result, '0.evento');

        res.json({message: 'OK', tracking, events});
    })
    .catch((error)=>{
        res.json({message: 'error', error});
    });
    
});

app.listen(PORT, () => console.log('listening on port' + PORT));