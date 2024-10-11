// Clase Nodo para representar cada número en la lista enlazada
class Nodo {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Clase ListaEnlazada para manejar la lista de números pares e impares
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

// Clase GeneradorNumeros para manejar la generación y separación de números pares e impares
class GeneradorNumeros {
    constructor() {
        this.evenNumbers = new ListaEnlazada();
        this.oddNumbers = new ListaEnlazada();
    }

    // Método para generar 20 números aleatorios y separarlos en pares e impares
    generateNumbers() {
        this.evenNumbers.clear();
        this.oddNumbers.clear();

        for (let i = 0; i < 20; i++) {
            const randomNumber = Math.floor(Math.random() * 100) + 1;
            if (randomNumber % 2 === 0) {
                this.evenNumbers.append(randomNumber);
            } else {
                this.oddNumbers.append(randomNumber);
            }
        }

        // Mostrar los números en las listas
        this.displayNumbers();
    }

    // Método para mostrar los números en las listas de HTML
    displayNumbers() {
        const evenList = document.getElementById('evenNumbers');
        const oddList = document.getElementById('oddNumbers');

        evenList.innerHTML = '';
        oddList.innerHTML = '';

        // Mostrar números pares
        this.evenNumbers.forEach((number) => {
            const li = document.createElement('li');
            li.textContent = number;
            evenList.appendChild(li);
        });

        // Mostrar números impares
        this.oddNumbers.forEach((number) => {
            const li = document.createElement('li');
            li.textContent = number;
            oddList.appendChild(li);
        });
    }
}

// Crear una instancia de GeneradorNumeros
const generadorNumeros = new GeneradorNumeros();

// Event listener para el botón de generar números
document.getElementById('generateBtn').addEventListener('click', () => generadorNumeros.generateNumbers());
