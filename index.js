const Tubu = require('./lib/Tubu');

const tubu = new Tubu('02cd0336-c424-46ae-ac8c-d0b84dd949b4');

const basicContract = tubu.createContract('c6da6a7441804bca');

basicContract
    .send('addItem', { args: ['xyz', 13, false] })
    .then((result) => {
        console.log(result.data);
    })
    .catch((err) => {
        console.log(err);
    });

basicContract
    .call('getLastItem')
    .then((result) => {
        console.log(result.data);
    })
    .catch((err) => {
        console.log(err);
    });
