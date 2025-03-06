from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuration de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Autoriser le frontend
    allow_methods=["*"],  # Autoriser toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autoriser tous les en-têtes
)

# Vos routes existantes...
# Modèle Pydantic pour un étudiant
class Student(BaseModel):
    id: int
    name: str
    age: int

# Liste d'étudiants (base de données temporaire)
students = []

# Route pour obtenir la liste des étudiants
@app.get("/students", response_model=List[Student])
def get_students():
    return students

# Route pour ajouter un étudiant
@app.post("/students", response_model=Student)
def add_student(student: Student):
    students.append(student)
    return student

# Route pour obtenir un étudiant par son ID
@app.get("/students/{student_id}", response_model=Student)
def get_student(student_id: int):
    for student in students:
        if student.id == student_id:
            return student
    raise HTTPException(status_code=404, detail="Student not found")

# Route pour supprimer un étudiant par son ID
@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    for student in students:
        if student.id == student_id:
            students.remove(student)
            return {"message": "Student deleted"}
    raise HTTPException(status_code=404, detail="Student not found")