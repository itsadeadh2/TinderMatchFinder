const axios = require('axios');
const { credentials } = require('../../bin/variables');
const { User } = require('../models/user.model');
const token = credentials.token;

const getUri = (uri) => {
    const firstSlashIndex = uri.indexOf('/', 9);
    let updatedString = uri.substr(firstSlashIndex + 1);
    const secondSlashIndex = updatedString.indexOf('/', 0);
    updatedString = updatedString.substr(secondSlashIndex + 1);
    return updatedString;
}
const tinderService = {

    async getTeasers() {
        const { data } = await axios.get('https://api.gotinder.com/v2/fast-match/teasers', { headers: { 'x-auth-token': token }});
        const listOfPeople = data.data.results;
        let images = [];
        listOfPeople.forEach((person) => {
            // save urls on database
            images.push(person.user.photos[0].url)
        });
        return images;
    },

    async getNumberOfTeasers() {
        // https://api.gotinder.com/v2/fast-match/count
        const { data } = await axios.get('https://api.gotinder.com/v2/fast-match/count', { headers: { 'x-auth-token': token }});
        return data.data.count;
    },

    async getListOfRecomendations() {
        const { data } = await axios.get('https://api.gotinder.com/v2/recs/core?locale=en', { headers: { 'x-auth-token': token }});
        const results = data.data.results;
        const users = [];
        for (person of results) {
            const name = person.user.name;
            const image = person.user.photos[0].url;
            const photos = person.user.photos;
            const images = [];
            photos.forEach((photo) => {
                images.push({"url": photo.url, "uri": getUri(photo.url)})
            });
            const personId = person.user._id;
            const profile = `https://api.gotinder.com/user/${personId}?locale=en`;
            const userFromDb = await User.findOne({ profile });
            if (!userFromDb) {
                const user = new User({ profile, images, image, name });
                await user.save();
                console.log(name);
                users.push(name);
            }
        }        
        return users;
    },

    async getPeopleWhoLikedMe(urls) {
        for (image of urls) {
            let uri = getUri(image);
            console.log(uri);
            const user = await User.findOne({ "images.uri": uri });
            if (user) {
                user.likedMe = true;
                await user.save();
            }           
        }
        return await User.find({ likedMe: true });
    }
}

module.exports = tinderService;