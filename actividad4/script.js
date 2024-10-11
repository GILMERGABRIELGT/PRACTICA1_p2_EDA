// Clase Nodo para representar un elemento de la lista enlazada
class Nodo {
    constructor(product) {
        this.product = product;
        this.next = null; // Apuntador al siguiente nodo
    }
}

// Clase ListaEnlazada para manejar la lista de productos
class ListaEnlazada {
    constructor() {
        this.head = null; // La cabeza de la lista enlazada
    }

    // Método para agregar un producto a la lista
    addProduct(product) {
        const newNodo = new Nodo(product);
        if (!this.head) {
            this.head = newNodo; // Si la lista está vacía, el nuevo nodo es la cabeza
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next; // Avanzar hasta el último nodo
            }
            current.next = newNodo; // Añadir el nuevo nodo al final
        }
    }

    // Método para eliminar un producto por su clave
    deleteProduct(key) {
        if (!this.head) return;

        if (this.head.product.key === key) {
            this.head = this.head.next; // Si la cabeza tiene el producto que queremos eliminar
            return;
        }

        let current = this.head;
        while (current.next && current.next.product.key !== key) {
            current = current.next; // Avanzar hasta encontrar el producto a eliminar
        }

        if (current.next) {
            current.next = current.next.next; // Saltarse el nodo que queremos eliminar
        }
    }

    // Método para obtener todos los productos en la lista como un array
    getProducts() {
        const products = [];
        let current = this.head;
        while (current) {
            products.push(current.product);
            current = current.next;
        }
        return products;
    }
}

// Clase GestionProductos para manejar la gestión de productos
class GestionProductos {
    constructor() {
        this.products = new ListaEnlazada(); // Usar la lista enlazada
        this.keyCounter = 1; // Contador para las claves de los productos
    }

    // Método para agregar un producto
    addProduct(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const productName = document.getElementById('productName').value;
        const productPrice = parseFloat(document.getElementById('productPrice').value);

        const newProduct = {
            key: this.keyCounter++,
            name: productName,
            price: productPrice.toFixed(2),
        };

        this.products.addProduct(newProduct);
        this.displayProducts();
        this.calculateTotalCost();
        document.getElementById('productForm').reset(); // Limpiar el formulario
    }

    // Método para eliminar un producto
    deleteProduct(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        const productKey = parseInt(document.getElementById('productKey').value);
        this.products.deleteProduct(productKey);
        this.displayProducts();
        this.calculateTotalCost();
        document.getElementById('deleteProductForm').reset(); // Limpiar el formulario
    }

    // Método para mostrar los productos
    displayProducts() {
        const productList = document.getElementById('productList');
        productList.innerHTML = ''; // Limpiar la lista anterior

        const sortedProducts = this.products.getProducts().sort((a, b) => a.name.localeCompare(b.name));

        sortedProducts.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `Clave: ${product.key} - ${product.name} - Precio: $${product.price}`;
            productList.appendChild(li);
        });
    }

    // Método para calcular el costo total
    calculateTotalCost() {
        const totalCost = this.products.getProducts().reduce((acc, product) => acc + parseFloat(product.price), 0);
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    }
}

// Crear una instancia de GestionProductos
const gestionProductos = new GestionProductos();

// Event listeners para agregar y eliminar productos
document.getElementById('productForm').addEventListener('submit', (event) => gestionProductos.addProduct(event));
document.getElementById('deleteProductForm').addEventListener('submit', (event) => gestionProductos.deleteProduct(event));
