/* Latest Code Updates (Parcel v2 and more)
1️⃣ PARCEL

I use Parcel v2@BETA in the videos, but right now the stable Parcel v2 has been released, and there are some differences. Don't worry, it's nothing groundbreaking, so there is no need for new videos. It's just some small adjustments in some cases 😃

👉 Now, if you don't run into any issues by following the videos as they are, then you don't need to do anything.

👉 If you do have issues with Parcel, you can now find updated starter and final code in a new branch in the course repo, called updates-and-fixes 🐛.

👉 Parcel v2 has changed the way it names bundled files (the ones in the dist directory). You can see a JavaScript file called controller.js in my files, but for you, it may appear as index.js. Don't worry though, everything works the same.



2️⃣ OTHERS

The updated code also uses a package called Fracty instead of Fractional for later in the project (along with some necessary code changes), as there have been some issues with deployment when using Factional.



I hope this helps and solves any issues you might find. Let me know in the Q&A if it does ✌️ */

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

console.log('TEST');

const showRecipe = async function () {
  try {
    const res = await fetch(
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09`
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13`
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    console.log(res, data);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookongTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(recipe);
  } catch (err) {
    alert(err);
  }
};

showRecipe();
