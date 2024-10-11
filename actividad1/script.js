// Clase Nodo para representar el nodo en la lista enlazada
class Nodo {
    constructor(data) {
        this.data = data; // El producto que será el dato del nodo
        this.next = null; // Referencia al siguiente nodo
    }
}

// Clase Producto
class Producto {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = parseFloat(price).toFixed(2);
        this.quantity = parseInt(quantity);
    }
}

// Clase ListaEnlazada para manejar una lista enlazada simple
class ListaEnlazada {
    constructor() {
        this.head = null; // Primer nodo de la lista
    }

    // Método para añadir un nodo al final de la lista
    append(data) {
        const newNode = new Nodo(data);

        if (!this.head) {
            this.head = newNode; // Si la lista está vacía, el nuevo nodo es la cabeza
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next; // Moverse al final de la lista
            }
            current.next = newNode; // Añadir el nuevo nodo al final
        }
    }

    // Método para eliminar un nodo de la lista por su índice
    removeAt(index) {
        if (!this.head) return null;

        let current = this.head;
        let previous = null;
        let count = 0;

        if (index === 0) {
            this.head = current.next; // Eliminar la cabeza
        } else {
            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }
            previous.next = current.next; // Saltar el nodo en la lista
        }

        return current.data; // Retornar el producto removido
    }

    // Método para recorrer la lista y ejecutar una función en cada nodo
    forEach(callback) {
        let current = this.head;
        let index = 0;
        while (current) {
            callback(current.data, index);
            current = current.next;
            index++;
        }
    }
}

// Clase Supermercado para manejar productos
class Supermercado {
    constructor() {
        this.availableProducts = new ListaEnlazada();
        this.removedProducts = new ListaEnlazada();
    }

    // Método para añadir un producto manualmente
    addProductManual(event) {
        event.preventDefault();  // Prevenir el envío del formulario

        const productName = document.getElementById('productName').value;
        const productPrice = document.getElementById('productPrice').value;
        const productQuantity = document.getElementById('productQuantity').value;

        if (productName && productPrice && productQuantity) {
            const newProduct = new Producto(productName, productPrice, productQuantity);
            this.availableProducts.append(newProduct);
            this.displayProducts();
            document.getElementById('productForm').reset();  // Limpiar el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    // Método para retirar un producto específico
    removeProduct(index) {
        const removedProduct = this.availableProducts.removeAt(index);
        if (removedProduct) {
            this.removedProducts.append(removedProduct);
            this.displayProducts();
        }
    }

    // Método para mostrar los productos disponibles y retirados
    displayProducts() {
        const availableList = document.getElementById("availableProducts");
        const removedList = document.getElementById("removedProducts");

        // Limpiar listas
        availableList.innerHTML = "";
        removedList.innerHTML = "";

        // Mostrar productos disponibles
        this.availableProducts.forEach((product, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${product.name} - Precio: $${product.price} - Cantidad: ${product.quantity}
                            <button class="remove" onclick="supermercado.removeProduct(${index})">Retirar</button>`;
            availableList.appendChild(li);
        });

        // Mostrar productos retirados
        this.removedProducts.forEach((product) => {
            const li = document.createElement("li");
            li.textContent = `${product.name} - Precio: $${product.price} - Cantidad: ${product.quantity}`;
            removedList.appendChild(li);
        });
    }
}

// Crear una instancia de Supermercado
const supermercado = new Supermercado();

// Event listener para añadir productos
document.getElementById('productForm').addEventListener('submit', (event) => supermercado.addProductManual(event));
