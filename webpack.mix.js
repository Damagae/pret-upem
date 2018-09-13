let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/js/etudiant.js', 'public/js')
   .react('resources/assets/js/delegataire.js', 'public/js')
   .react('resources/assets/js/personnel.js', 'public/js')
   .react('resources/assets/js/enseignant.js', 'public/js')
   .react('resources/assets/js/notfound.js', 'public/js')
   .react('resources/assets/js/unauthorized.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');
