
    function selectPayment(element, method) {
        // 1. Buscamos todos los botones dentro del contenedor de pagos
        const buttons = document.querySelectorAll('.btn-pay');
        
        // 2. Quitamos la clase 'active' de todos
        buttons.forEach(btn => btn.classList.remove('active'));

        // 3. Se la ponemos solo al que tocamos
        element.classList.add('active');

        // 4. Actualizamos el valor oculto para el formulario
        document.getElementById('selected-payment').value = method;
    }
    function selectPayment(element, method) {
        const buttons = document.querySelectorAll('.btn-pay');
        buttons.forEach(btn => btn.classList.remove('active'));
        element.classList.add('active');
        document.getElementById('selected-payment').value = method;
    }