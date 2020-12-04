import fetch from 'node-fetch'
import * as fs from 'fs'

const STARWARS_BASE_URL = 'https://swapi.dev/api'
const CHARACTER_CACHE_FILENAME = 'characters.json'


class StarwarsApi {

    characters: any[] = [];

    config: [
        {
            key: string,
            resolver: (value) => boolean
        }
    ]

    public async filterBy(filter) {
        if(this.characters.length === 0)
            await this.getCharacters();

        let filteredCharacters = this.characters.filter(character => {
            let keys = Object.keys(filter);

            for (const key of keys) {
                const actualValue = character[key]
                const expectedValue = filter[key];
                if (actualValue != null && actualValue !== expectedValue) 
                    return false;
            }

            return true;
        })

        return filteredCharacters;
    }
 
    public async getCharacters() {
        // ToDo add unit test for both of these cases
        if(fs.existsSync(`./${CHARACTER_CACHE_FILENAME}`)) {
            console.log('Getting cached data from local storage');

            this.characters = this.readFile(CHARACTER_CACHE_FILENAME);

            return this.characters;
        } else {
            console.log('Getting data from the API');

            this.characters = await this.fetchCharacters(); 

            this.writeFile(CHARACTER_CACHE_FILENAME, this.characters);

            return this.characters
        }
    }

    private async fetchCharacters() {
        let results = [];
        let response = await fetch(`${STARWARS_BASE_URL}/people/`)
        let json = await response.json();

        results = results.concat(json.results);
        while(json.next != null) {
            response = await fetch(json.next)

            json = await response.json();

            results = results.concat(json.results);
        }

        return results;
    }

    private readFile(fileName: string) {
        let rawdata = fs.readFileSync(`./${fileName}`);
        return JSON.parse(rawdata.toString());
    }

    private writeFile(fileName: string, data) {
        fs.writeFileSync(`./${fileName}`, JSON.stringify(data, null, 2));
    }
}

export default StarwarsApi;