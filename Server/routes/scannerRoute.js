// const express = require('express');
// const fs = require('fs');
// const router = require('express').Router()
// const app = express();
// const filename = 'barcodes.txt';

// app.post('/', (req, res) => {
//    // console.log("hi")
//     const barcode = req.body.barcode;

//     console.log(`Received barcode: ${barcode}`);

//     fs.appendFile(filename, `${barcode}\n`, (err) => {
//         if (err) throw err;
//         console.log(`Barcode ${barcode} written to ${filename}`);
//     });

//     res.sendStatus(200);
// });

// module.exports = router