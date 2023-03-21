import icons from 'url:../../img/icons.svg'

export default class View {
    _data;
    render(data,render = true) {
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        // console.log(data    )
        const markup = this._generateMarkup();
        // previwe 的数据传出去了
        if(!render) return markup;
        // console.log(markup)
        this._clean();
        
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }
   
    
    renderSpinner() {
        const markup = 
        `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
        `
      this._clean();

    //   console.log(markup)
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
      
        this._data = data;
        // console.log(data    )
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);

        const newElement = Array.from(newDom.querySelectorAll('*'));
        const curElement = Array.from(this._parentElement.querySelectorAll('*'));

        newElement.forEach((newEl,index) => {
            const curEl = curElement[index];

            if(!newEl.isEqualNode(curEl) &&
            newEl.firstChild?.nodeValue.trim()!='') {
              curEl.textContent = newEl.textContent;
            }

            if(!newEl.isEqualNode(curEl)) {
              Array.from(newEl.attributes).forEach(attr => {
                curEl.setAttribute(attr.name,attr.value);
              })
            }
        })

    }

    renderError(message = this._errorMessage) {
        const markup =`
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
          `
        this._clean();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    renderMessage(message = this._message) {
        const markup =`
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
          `
        this._clean();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    }

    _clean() {
        this._parentElement.innerHTML = '';
    }
}