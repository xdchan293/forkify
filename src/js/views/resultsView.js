import View from "./View.js";
import icons from 'url:../../img/icons.svg'
import previewView from "./previewView.js";

class resultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = `No recipe found for your query ! Please try again!!`;
    _message = ''
    
    _generateMarkup() {
  
    // console.log(this._data.map(result => {
    //     previewView.render(result,false)
    // }).join(''))
        return this._data.map(result => {
            // console.log(previewView.render(result,false))
         return previewView.render(result,false)
      }).join('')
   }
    
    
}

export default new resultsView()