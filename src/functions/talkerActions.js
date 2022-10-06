const path = require('path');

const arquive = path.resolve(__dirname, '..', 'talker.json');
const fs = require('fs');

function readTalkers() {
    try {
        return JSON.parse(fs.readFileSync(arquive, 'utf8'));
    } catch (error) {
        throw new Error(`Erro ao ler o arquivo ${arquive}`);
    }
}

function getTalkers(request, response) {
    try {
        const talkersList = readTalkers();
        return response.status(200).json(talkersList);
    } catch (error) {
        return response.status(200).json({ message: `${error.message}` });
    }
}

async function getTalkerSpecify(request, response) {
    try {
        const { id } = request.params;
        const talkersList = readTalkers();
        const talkerFiltered = talkersList.find((talker) => talker.id === Number(id));
        if (!talkerFiltered) {
            throw new Error('Pessoa palestrante não encontrada');
        }
            response.status(200).json(talkerFiltered);
        } catch (error) {
        response.status(404).json({ message: `${error.message}` });
    }
}

async function deleteTalker(request, response) {
    const { id } = request.params;
    const talkersList = readTalkers();
    try {
        if (talkersList.some((e) => e.id === Number(id)) === false) {
            throw new Error('O id passado não se encontra na lista de talkers!');
        }
        const talkerFiltered = talkersList.filter((talker) => talker.id !== Number(id));
        await fs.promises.writeFile(arquive, JSON.stringify(talkerFiltered));
        return response.status(204).json();
    } catch (error) {
        return response.status(404).json({ message: `${error.message}` });
    }
}

async function registerTalker(request, response) {
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const talkersList = readTalkers();
    const newTalker = {
        id: talkersList.length + 1,
        name,
        age,
        talk: {
            watchedAt,
            rate,
        },
    };
    talkersList.push(newTalker);
    await fs.promises.writeFile(arquive, JSON.stringify(talkersList));
    return response.status(201).json(newTalker);
}

function searchTalker(request, response) {
    const { q } = request.query;
    const talkersList = readTalkers();

    if (!q || q === '') return response.status(200).json(talkersList);
    const listFiltered = talkersList.filter((talker) => talker.name.includes(q));
    if (!listFiltered) return response.status(200).json([]);
    return response.status(200).json(listFiltered);
}

// eslint-disable-next-line max-lines-per-function
async function updateTalker(request, response) {
    const { id } = request.params;
    const { name, age, talk: { watchedAt, rate } } = request.body;
    const talkersList = readTalkers();
    try {
        if (talkersList.some((e) => e.id === Number(id)) === false) {
        throw new Error('O id passado não se encontra na lista de talkers!');
        }
    const talkerFiltered = talkersList.filter((talker) => talker.id !== Number(id));
    const newTalker = {
        id: Number(id),
        name,
        age,
        talk: {
        watchedAt,
        rate,
        },
    };
    talkerFiltered.push(newTalker);
    await fs.promises.writeFile(arquive, JSON.stringify(talkerFiltered));
    return response.status(200).json(newTalker);
    } catch (error) {
        return response.status(404).json({ message: `${error.message}` });
    }
}

module.exports = {
    getTalkers,
    readTalkers,
    getTalkerSpecify,
    deleteTalker,
    registerTalker,
    searchTalker,
    updateTalker,
};