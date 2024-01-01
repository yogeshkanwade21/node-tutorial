const express = require('express')

const urlencoded = () => {
    return express.urlencoded({ extended: false });
}

module.exports = urlencoded;