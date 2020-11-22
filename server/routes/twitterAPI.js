/* jshint esversion: 6 */
// Author:Arihant Chhajed
// Description:This script is to define route for accesing twitter api

'use strict';

/* Dependency injection and initialization */

const express = require('express');
const Twitter = require('twitter');
const router = express.Router(); //eslint-disable-line
const fs = require('fs');

const AUTH_PARAM = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
}
const client = new Twitter(AUTH_PARAM);


const getTweets = async (SearchParam,count) => {
    const params = {
        q: SearchParam,
        count
    };

    return new Promise((resolve, reject) => {
        client.get('search/tweets.json', params, (error, tweets, response) => {
            if (!error) {
                resolve(tweets);
            }
            else {
                console.log(error);
                reject(error)
            }
        });

    })

}
router.get("/getTweets/:SearchParam/:count", async (req, res) => {
    console.log(req.params)
    const tweets = await getTweets(req.params.SearchParam,req.params.count);
    res.send(tweets);
    fs.writeFile('tweets_data.json', tweets);
})

module.exports = router;
