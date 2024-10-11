// Clase Nodo para representar cada alumno en la lista enlazada
class Nodo {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Clase ListaEnlazada para manejar la lista de alumnos aprobados y reprobados
class ListaEnlazada {
    constructor() {
        this.head = null;
    }

    // Método para añadir un nodo al final de la lista
    append(data) {
        const newNode = new Nodo(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    // Método para recorrer la lista y ejecutar una función en cada nodo
    forEach(callback) {
        let current = this.head;
        while (current) {
            callback(current.data);
            current = current.next;
        }
    }

    // Método para limpiar la lista
    clear() {
        this.head = null;
    }
}

// Clase GestionAlumnos para manejar aprobados y reprobados
class GestionAlumnos {
    constructor() {
        this.approvedStudents = new ListaEnlazada();
        this.failedStudents = new ListaEnlazada();
    }

    // Método para agregar un alumno y clasificarlo
    addStudent(event) {
        event.preventDefault();  // Prevenir que el formulario se envíe

        const studentName = document.getElementById('studentName').value;
        const studentGrade = parseFloat(document.getElementById('studentGrade').value);

        const student = { name: studentName, grade: studentGrade };

        if (studentGrade >= 7) {
            this.approvedStudents.append(student);
        } else {
            this.failedStudents.append(student);
        }

        // Mostrar los alumnos en las listas
        this.displayStudents();
        document.getElementById('studentForm').reset();  // Limpiar el formulario
    }

    // Método para mostrar los alumnos aprobados y reprobados
    displayStudents() {
        const approvedList = document.getElementById('approvedStudents');
        const failedList = document.getElementById('failedStudents');

        // Limpiar las listas previas
        approvedList.innerHTML = '';
        failedList.innerHTML = '';

        // Añadir alumnos aprobados a la lista
        this.approvedStudents.forEach((student) => {
            const li = document.createElement('li');
            li.textContent = `${student.name} - Calificación: ${student.grade}`;
            approvedList.appendChild(li);
        });

        // Añadir alumnos reprobados a la lista
        this.failedStudents.forEach((student) => {
            const li = document.createElement('li');
            li.textContent = `${student.name} - Calificación: ${student.grade}`;
            failedList.appendChild(li);
        });
    }
}

// Crear una instancia de GestionAlumnos
const gestionAlumnos = new GestionAlumnos();

// Event listener para agregar el alumno
document.getElementById('studentForm').addEventListener('submit', (event) => gestionAlumnos.addStudent(event));
