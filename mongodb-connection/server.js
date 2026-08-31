import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'student_database';

async function main() {

  await client.connect();
  console.log('Successfully connected to MongoDB');
  
  const db = client.db(dbName);
  const collection = db.collection('students');

  const newUser = { name: 'Ajay Verma', age: 20, course: 'Btech' };
  const insertResult = await collection.insertOne(newUser);
  console.log('Created User ID:', insertResult.insertedId);

  const studentsArray = [
    { name: 'Rahul Sharma', age: 21, course: 'Computer Science' },
    { name: 'Priya Joshi', age: 20, course: 'Data Science' },
    { name: 'Riya Patel', age: 22, course: 'Computer Science' }
  ];
  
  const insertManyResult = await collection.insertMany(studentsArray);
  console.log('Created User IDs:', insertManyResult.insertedIds);

  const user = await collection.findOne({ name: 'Ajay Verma' });
  console.log('Read User:', user);
  

  const allStudents = await collection.find({}).toArray();
  console.log('All Students in DB:', allStudents);
  

  const csStudents = await collection.find({ course: 'Computer Science' }).toArray();
  console.log('Found CS Students:', csStudents);

  await client.close();
  console.log('Connection closed.');
}

main();

