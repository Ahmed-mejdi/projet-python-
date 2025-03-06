import { useState, useEffect } from 'react';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/students')
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const addStudent = async () => {
    const response = await fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: students.length + 1,
        name: name,
        age: parseInt(age),
      }),
    });
    const newStudent = await response.json();
    setStudents([...students, newStudent]);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Liste des étudiants
      </h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            {student.name} - {student.age} ans
          </li>
        ))}
      </ul>
      <div className="mt-6 flex space-x-4">
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={addStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Ajouter un étudiant
        </button>
      </div>
    </div>
  );
}