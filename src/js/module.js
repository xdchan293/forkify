import {async} from 'regenerator-runtime'
import {API_URL,RES_PER_PAGE,KEY} from './config.js'
import {getJOSN,sendJOSN} from './hlepers.js'

export const state = {
    recipe: {},
    search:{
       query:'',
       results:[],
       page:1,
       resultsPerPage:RES_PER_PAGE,
    },
    bookmarks:[]
}

const createRecipeObj = function(data) {
    const {recipe} = data.data;

    return {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        ingredients:recipe.ingredients,
        sourceUrl:recipe.source_url,
        image: recipe.image_url,
        servings:recipe.servings,
        cookingTime:recipe.cooking_time,
        ...(recipe.key && {key:recipe.key})
    };
}

//加载具体食物的食谱
export const loadRecipe = async function(id) {
    try{
    const data = await getJOSN(`${API_URL}/${id}`);
    state.recipe = createRecipeObj(data);

    if(state.bookmarks.some(item => item.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false
    }catch(err) {
        throw err;
    }
}

export const loadSearch = async function(item) {
    try{
        state.search.query = item;

        const {data} = await getJOSN(`${API_URL}?search=${item}`);
        // console.log(data)
    
        state.search.results = data.recipes.map(rec => {
            return {
            id:rec.id,
            title:rec.title,
            publisher:rec.publisher,
            image: rec.image_url,
            
            }
        })
        // console.log(state.search.results)
        state.search.page = 1;
    }catch(err) {
        throw err;
    }
}

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    // console.log( page)
    const start = (page-1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    // console.log(start,end)
    // console.log(state.search.results)
    return state.search.results.slice(start,end);
}
// loadSearch('pizza')

export const updateServings = function (newServing) {
     const rate = newServing/state.recipe.servings;

     state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity) * rate;
     });

     state.recipe.servings = newServing;
}

const persistBookmark = function() {
    localStorage.setItem('bookmark',JSON.stringify(state.bookmarks));
}

export const addBookmarks =function (recipe) {
    state.bookmarks.push(recipe);

    if(recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
        // console.log('mark true')
    } 
    persistBookmark()
}

export const deleteBookmark = function(id) {
    const index = state.bookmarks.find(item => item.id === id);
    state.bookmarks.splice(index,1);
    // console.log(state.bookmarks)
    if(id === state.recipe.id)  state.recipe.bookmarked = false;
    persistBookmark();
}

export const uploadNewRecipe = async function(newRecipe) {
//    console.log(Object.entries(recipe))
   try{
    //筛选有效的配料 转换成对象
   const ingredients = Object.entries(newRecipe).filter(item => {
    //筛选有效的配料 
      return item[0].startsWith('ingredient') && item[1] !== '';
   }).map(ingredient => {
      const ingArr = ingredient[1].replaceAll(' ','') //格式化处理
      .split(',');
    //   console.log(ingArr);
    if(ingArr.length !== 3) throw new Error('Wrong ingredient format! Please use correct format :)');
      
      const [quantity , unit , description] = ingArr;

      return { quantity:quantity?Number(quantity):null,
                unit,description};
   
   })   
    // console.log(ingredients)
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
    }
    // console.log(recipe)
    const data = await sendJOSN(`${API_URL}?key=${KEY}`,recipe);
    // console.log(data);
    state.recipe = createRecipeObj(data);
    // clearBookmark()
    addBookmarks(state.recipe);
    // console.log(state.bookmarks)
   }catch(err) {
    throw err;
   }
//    console.log(ingredients);
}

const init = function() {
    const store = localStorage.getItem('bookmark');
    if(store) state.bookmarks = JSON.parse(store);
}

const clearBookmark = function() {
    localStorage.clear('bookmark');
}

init();