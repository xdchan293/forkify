import View from "./View.js";
import icons from 'url:../../img/icons.svg'

class paginationView extends View {
    _parentElement = document.querySelector('.pagination');
 
    addHandelerClick(handeler) {
        this._parentElement.addEventListener('click',function (e) {
          
          const btn = e.target.closest('.btn--inline');
          //  
           const goto = Number(btn.dataset.goto);
          //  console.log(goto)
           handeler(goto);
        })
    }
    //讨论分页情况 
    _generateMarkup(){  
      const curPage = this._data.page;

      const pageNum = Math.ceil(this._data.results.length/this._data.resultsPerPage);

    //   console.log(curPage,pageNum);
    //以下几种情况
    
    //第一页 但只有一页
    
    //其他
    //第一页 而且有其他页
    if(curPage === 1 && pageNum > 1) {
      return  this._getNextBtn(curPage);
    }
    if(curPage === 1) {
      return '';  
    }

    //最后一页
    if(curPage === pageNum) {
      return this._getPrevBtn(curPage);
    }

    return `${this._getPrevBtn(curPage)}
    ${this._getNextBtn(curPage)}`;

    }

    _getPrevBtn(curPage) {
      return  `
       <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage-1}</span>
        </button>
      
      `;
    }

    _getNextBtn(curPage) {
      return  `
      <button  data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage+1}</span>
       </button>
      `
    }
}

export default new paginationView();