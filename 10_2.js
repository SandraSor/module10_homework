const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

const data = JSON.parse(jsonString);
console.log('data',data);

const list = data.list;

const listNew=[];

list.forEach( student => {
  listNew.push({
    name: student.name,
    age: +student.age,
    prof: student.prof,
  });
});

const result = {
  list: listNew,
};
console.log('result', result);
