class CustomSelect extends HTMLElement {
  static style = null;
  constructor() {
    super();

    // Crear el Shadow DOM para el componente
    const shadow = this.attachShadow({ mode: 'open' });

    // Crear el contenedor del select
    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'custom-select-wrapper');

    // Crear la caja de selección (donde se muestra la opción seleccionada)
    const selectedBox = document.createElement('div');
    selectedBox.setAttribute('class', 'custom-select-box');
    selectedBox.innerHTML = '<span class="selected-option">Selecciona una opción</span>';

    // Crear el contenedor de opciones (para mostrar todas las opciones del select)
    const optionsContainer = document.createElement('div');
    optionsContainer.setAttribute('class', 'custom-options-container');

    // Crear el campo input oculto que se enviará con el formulario
    const hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', this.getAttribute('name')); // Usar el name del custom-select

    // Añadir el contenedor, caja de selección y el input oculto al shadow DOM
    shadow.appendChild(wrapper);
    wrapper.appendChild(selectedBox);
    wrapper.appendChild(optionsContainer);
    shadow.appendChild(hiddenInput);

    // Añadir las opciones del select original al contenedor de opciones
    const options = this.querySelectorAll('option');
    options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.setAttribute('class', 'custom-option');
      optionDiv.setAttribute('data-value', option.value);
      optionDiv.innerHTML = `<img src="${option.getAttribute('data-icon')}" class="icon" alt="${option.textContent}"> ${option.textContent}`;
      optionsContainer.appendChild(optionDiv);
    });

    // Comportamiento de abrir/cerrar las opciones al hacer clic en la caja de selección
    selectedBox.addEventListener('click', () => {
      optionsContainer.classList.toggle('show');
    });

    // Comportamiento para seleccionar una opción
    optionsContainer.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('custom-option')) {
        const selectedValue = e.target.getAttribute('data-value');
        const selectedText = e.target.textContent.trim();
        const selectedIcon = e.target.querySelector('img').getAttribute('src');

        selectedBox.innerHTML = `<img src="${selectedIcon}" class="icon" alt="${selectedText}"> ${selectedText}`;

        // Actualizar el valor del input oculto
        hiddenInput.value = selectedValue;

        // Cambiar el valor del custom-select
        this.value = selectedValue;

        // Cerrar el contenedor de opciones
        optionsContainer.classList.remove('show');
      }
    });

    // Cargar el archivo CSS externo para el componente
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    const linkAtt = window.select13Style ?? "";
    link.setAttribute('href', linkAtt); // Ruta del archivo CSS externo
    shadow.appendChild(link);
  }

  // Método para obtener y establecer el valor del select
  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    this.setAttribute('value', val);
  }

  // Método para manejar cambios en el componente (esto es útil para los formularios)
  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.querySelector('.selected-option').textContent = newValue;
    }
  }
}

// Definir el nuevo elemento personalizado
customElements.define('custom-select', CustomSelect);
