const mongoose = require('mongoose');
const dburl = process.env.DB_URL || "";
mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    err ? console.log("db connection failed") : console.log("DB Connected");
})