const axios = require('axios').default;

const token = 'e0556639-48d6-40dd-9644-d088decdd6d6' // thiago
// const token = `1b0aabcb-f42c-4e99-9892-b9499180b0e2`; //fake
const peopleWhoLikedMe = 'https://api.gotinder.com/v2/fast-match/teasers';
// const thiagoUserId = '5d705ce7ede3321500dea069';
// const fakeUserId = '5dc77d277a2dba01006fefea';
const getPersons = async () => {
    const { data } = await axios.get('https://api.gotinder.com/v2/recs/core?locale=en', { headers: { 
        'x-auth-token': token
     } });
     const results = data.data.results;
     results.forEach(async (result) => {
        const match = await likePerson(result.user._id);
        // const match = '';
        
        console.log(`${result.user.name} - ${result.user._id} - ${result.common_like_count} - match: ${match}`);
        // console.log(result);
     });
}

const likePerson = async (personId) => {
    try {
        const { data } = await axios.post(`https://api.gotinder.com/like/${personId}?locale=en`, {}, { headers: {
            'x-auth-token': token
        }});
        console.log(data);
        return data.match;
    } catch (error) {
        console.log(error.response.status);
    }
}

const getPeopleWhoLikedMe = async () => {
    try {
        const { data } = await axios.get(peopleWhoLikedMe, { headers: { 'x-auth-token': token }});
        const listOfPeople = data.data.results;
        // console.log(listOfPeople);
        listOfPeople.forEach((person) => {
            console.log(person.user.photos[0].url);
        });
    } catch (error) {
        
    }
}

// getPersons();
// likePerson(fakeUserId);
getPeopleWhoLikedMe();