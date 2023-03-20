import {async} from 'regenerator-runtime'
import {API_URL,RES_PER_PAGE} from './config.js'
import {getJOSN} from './hlepers.js'

export const state = {
    recipe: {},
    search:{
       query:'',
       results:[],
       page:1,
       resultsPerPage:RES_PER_PAGE,
    }
}

//加载具体食物的食谱
export const loadRecipe = async function(id) {
    try{
        const data = await getJOSN(`${API_URL}/${id}`);
    

    const {recipe} = data.data;

    state.recipe = {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        ingredients:recipe.ingredients,
        sourceUrl:recipe.source_url,
        image: recipe.image_url,
        servings:recipe.servings,
        cookingTime:recipe.cooking_time
    }
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