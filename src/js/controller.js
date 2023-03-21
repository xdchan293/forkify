
import * as module from './module.js'

import {WAIT_TIME} from './config.js'

import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'

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

      resultsView.update(module.getSearchResultsPage());
      // console.log(module.state.bookmarks)
      bookmarksView.update(module.state.bookmarks);
      
      
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

const controlServings = function(newServing) {
   module.updateServings(newServing);

   recipeView.update(module.state.recipe);
}

const controlAddBookmark = function() {
  // console.log(module.state.recipe)
  if(!module.state.recipe.bookmarked) {
    // console.log('when true') debug info
    module.addBookmarks(module.state.recipe);
  }else  {
    // console.log('this is else ')
    module.deleteBookmark(module.state.recipe.id);
  }

  recipeView.update(module.state.recipe);
  bookmarksView.render(module.state.bookmarks);
}

const controlBookmark = function() {
   bookmarksView.render(module.state.bookmarks);
}

const controlAddRecipe = async function(recipe) {
  //  console.log(recipe)
   try{
    addRecipeView.renderSpinner();

    await module.uploadNewRecipe(recipe);
    // console.log(module.state.recipe)

    recipeView.render(module.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(module.state.bookmarks);

    setTimeout(function () {
      addRecipeView.toggleClasslist()
    },WAIT_TIME*1000);
   }catch(err) {
    console.error(err);
    addRecipeView.renderError(err.message)
    
   }
}

const init = function () {
  bookmarksView.addHandelerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandelerSearch(controlSearchResult);
  paginationView.addHandelerClick(controlPagination);
  addRecipeView.addHandelerUpload(controlAddRecipe);
}

init();
///////////////////////////////////////
