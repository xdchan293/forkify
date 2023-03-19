
import * as module from './module.js'

import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView'

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

      resultsView.render(module.state.search.results);
    }catch(err) {
        console.log(err);
    }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandelerSearch(controlSearchResult);
}

init();
///////////////////////////////////////
