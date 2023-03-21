import View from "./View";

class addRecipeView extends View {
    _message = 'Upload new recipe success';
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandelerShowWindow(); 
        this._addHandelerHideWindow();
    }

    addHandelerUpload(handeler) {
        this._parentElement.addEventListener('submit', function(e) {
            e.preventDefault();

            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr)
            // console.log(data,dataArr);
            handeler(data);
        })
    }

    _generateMarkup(){
        
    }

    toggleClasslist () {
        this._window.classList.toggle('hidden');
        this._overlay.classList.toggle('hidden');
    }

    _addHandelerShowWindow() {
        this._btnOpen.addEventListener('click',this.toggleClasslist.bind(this));
    }

    _addHandelerHideWindow() {
        this._btnClose.addEventListener('click',this.toggleClasslist.bind(this));
        this._overlay.addEventListener('click',this.toggleClasslist.bind(this));
    }
}

export default new addRecipeView()