const path = require('path')
const fs = require('fs')

function Drop(file) {
    fs.rm(path.resolve(__dirname, "..", "uploads", file+''), { recursive: true }, (err) => {
        if (err) {
            console.error(err.message);
            return;
        } 
        console.log("File deleted successfully");
    })
}

module.exports = {Drop}