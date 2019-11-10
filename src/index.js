const variables = require('../bin/variables')
const tinder = require('./services/tinder.service');
/*
Pegar informações dos usuarios que gostaram de voce e armazená-los em um banco de dados:
1 - Pegar info das pessoas que te curtiram
    - Retornar uma lista com todos os usuarios que gostaram de voce (done)
    - Armazenar a foto principal do perfil dessas pessoas (done)
2 - Encontrar as pessoas da foto:
    - Fazer requests para o endpoint de recomendacoes (done)
    - Para cada pessoa do endpoint, armazenar a primeira foto e o link para o perfil (done)
    - Comparar as fotos das pessoas que gostaram de voce com as fotos das recomendações, e caso tenha 

3 - Exibir as pessoas:
    - Após isso o usuario podera ver o link do perfil de todas as pessoas que o curtiram, e se o desejar, dar match com a mesma
 */
const run = async () => {
    require('./startup/database')();
    const numberOfLikes = await tinder.getNumberOfTeasers();
    let matchesFound = 0;
    while (matchesFound < numberOfLikes) {
        const images = await tinder.getTeasers();
        const users = await tinder.getListOfRecomendations()
        const res = await tinder.getPeopleWhoLikedMe(images);
        matchesFound = res.length;        
        console.log({ numberOfLikes, matchesFound, res });
    }
}
run();