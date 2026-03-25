let totalGeneral = 0;
    let totalProductos = 0;

    document.addEventListener("DOMContentLoaded", function() {
        // Buscamos todos los botones de "Agregar"
        const botonesAgregar = document.querySelectorAll('.btn-add-long');

        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', function() {
                // 1. Buscamos el contenedor del plato más cercano
                const item = this.closest('.item-order-long');
                
                // 2. Obtenemos el nombre, precio y cantidad
                const nombre = item.querySelector('.txt9').innerText;
                const precioTexto = item.querySelector('.txt10').innerText; // Ejemplo: "$25.000"
                const cantidad = parseInt(item.querySelector('input[type="number"]').value);

                // 3. Limpiamos el precio para que sea un número (quitamos $ y puntos)
                const precioLimpio = parseInt(precioTexto.replace(/[^0-9]/g, ''));

                // 4. Calculamos
                const subtotal = precioLimpio * cantidad;
                totalGeneral += subtotal;
                totalProductos += cantidad;

                // 5. Actualizamos la vista
                actualizarInterfaz();
                
                // Efecto visual en el total
                const totalDisplay = document.getElementById('cart-total');
                totalDisplay.classList.add('bump');
                setTimeout(() => totalDisplay.classList.remove('bump'), 200);
            });
        });
    });

    function actualizarInterfaz() {
        // Formatear a moneda colombiana
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });

        document.getElementById('cart-total').innerText = formatter.format(totalGeneral);
        document.getElementById('cart-count').innerText = totalProductos + " items";
    }

    function vaciarCarrito() {
        totalGeneral = 0;
        totalProductos = 0;
        actualizarInterfaz();
    }