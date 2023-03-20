
import * as module from './module.js'

import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime';


const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

const controlRecipe = async function () {
    try{
      const id = window.location.hash.slice(1);
      if(!id) return;
      
      //加载图标集
      recipeView.renderSpinner();
      //加载请求数据
      await module.loadRecipe(id);
      
    //  console.log(module.state.recipe)
      //渲染到对应视图层
      recipeView.render(module.state.recipe);

    }catch(err) {
       recipeView.renderError();
    }

 
}

const controlSearchResult = async function() {
    try{
      resultsView.renderSpinner()
      //搜索内容
      const searchItem = searchView.getQuery();

      if(!searchItem) return;

      await module.loadSearch(searchItem);

      // resultsView.render(module.state.search.results);
      // console.log(module.getSearchResultsPage(1))
      //侧边栏结果
      resultsView.render(module.getSearchResultsPage());
      //加载侧边栏按钮
      paginationView.render(module.state.search);
    }catch(err) {
        console.log(err);
    }
}

const controlPagination = function(gotoPage) {
  //  console.log(gotoPage)
  resultsView.render(module.getSearchResultsPage(gotoPage));

  paginationView.render(module.state.search);
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandelerSearch(controlSearchResult);
  paginationView.addHandelerClick(controlPagination);
}

init();
///////////////////////////////////////
