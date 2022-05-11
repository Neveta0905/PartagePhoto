const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const routes = {};

fs
  .readdirSync(__dirname)
  .filter(file => { // Trie les fichiers pour ne retirer que les js
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // Chaque Js
    const router = require(path.join(__dirname, file)); // Lire
    routes[router.name] = router;  // Remplis la variable exportée  
    delete router.name
  });

// Un Routeur {name:nom_routeur,router:router}
// Sera stocké dans la variables routes

// Exemple :
// {name:user,router:user_router},{name:photos,router:photos_router}
// donne :
// { user{router:user_router},photos:photos_router }

module.exports = routes;
