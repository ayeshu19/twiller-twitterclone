// vimeoClient.js
const Vimeo = require('vimeo').Vimeo;

const CLIENT_ID = '64bca3dab54822bea8ca6f51ae0f557a8831f5c3';
const CLIENT_SECRET = 'RKBgoVKebuE+Zj0LJ1RG42rMUd5lx1T9T7J3Bf5P+LiQcx6sB1N6rDf3Z3h/i8oC1TeV1jZKA5n11leNHl/A/cVjCUb11X2iFAEL3LFhg7aL6uNs7lbILS6kxyjAP5GR';
const ACCESS_TOKEN = '1996605c2c0c353dd456ec11d2992c06';

const client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN);

module.exports = client;
