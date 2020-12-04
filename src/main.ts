// import {createInterface } from 'readline';
import StarwarsApi from './services/StarwarsApi'



async function index() {
  let api = new StarwarsApi();

  // let characters = await api.filterBy({"name": "Luke Skywalker"});


  let males = await api.filterBy({"gender": "male", "eye_color": "blue"});
  let females = await api.filterBy({"gender": "female", "eye_color": "blue"});

  console.log(`${males.length} males`);
  console.log(`${females.length} females`);
  // console.table(characters)
}
index();

// function hello() {

//   let rl = createInterface({
//     input: process.stdin,
//     output: process.stdout
//   })

//   rl.question('How are you?', (answer) => {
//     console.log(`You said ${answer}`);

//     rl.close();
//   })

// }
// hello();