import View from "./View.js";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView.js";

class bookmarksView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage = ` No bookmarks yet. Find a nice recipe and bookmark it :)`;
    _message = ''
    
    addHandelerRender (handeler) {
      window.addEventListener('load',handeler);
    }

    _generateMarkup() {
        return this._data.map(bookmark => {
           return  previewView.render(bookmark,false)
        }).join('')
    }
    
}

export default new bookmarksView()