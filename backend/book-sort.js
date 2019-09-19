const mariadb = require('mariadb');

/*
    Source file: book-sort.js
    Authors: Team 8
    
    Description: 
    
    This module includes a library of functions created to interact with a database connection.
    It's main purpose is to provide functions for sorting books by specific criteria through queries.

    It is not by any means final and will change as the database definition changes.

    Functions:

    byTitle() - sort books by title
    byAuthor() - sort books by author
    byPrice() - sort books by price
    bySales() - sort books by total sales
    byGenre() - sort books by genre
    byRating() - sort books by rating
    byDate() - sort books by release date
*/

/*Function: byTitle
 *---------------------------------
 *Sorts books by title. If no match is found, display books with similar
 *names. Output 'did you mean ...?' 
 *
 * param: 
 *        title : string
 *        conn : db connection
 *        callback: function to return error or result
 * 
 * return: json file containing sorted books
 */
async function byTitle(title, pool, callback){
    if (typeof title == 'string' || title instanceof String)
    {
        var findBooks = "SELECT *FROM Book WHERE title = ?";

        pool.query(findBooks, [title], function(err, res){
            if (err) callback(err, null);
            console.log(res);
            callback(null, res);
        });
    }
    else
    {
        console.log('In function byTitle: Invalid parameter for title, must be string');
    }
}

/*async functio: byAuthor
 *---------------------------------
 *Sorts books by author. If no match is found, display books with similar named
 *authors. Output 'did you mean ...?'
 *
 * param: 
 *        author : string
 * 
 * return: json file containing sorted books
 */
async function byAuthor(){

}

/*Function: byPrice
 *----------------------------------
 *Sorts books by price. Can specify high or low price.
 *Should be able to include price range.
 *
 * param: 
 *        highOrLow : boolean (1 for high, 0 for low)
 * 
 * return: json file containing sorted books
 */
async function byPrice(){

}

/*Function: bySales
 *-----------------------------------
 *Sorts books by total number of sales. Can specify most or least sold.
 *
 * param: 
 *        mostOrLeast : boolean (1 for most, 0 for least)
 * 
 * return: json file containing sorted books
 */
async function bySales(){

}

/*Functiopn: byGenre
 *-----------------------------------
 *Sorts books by genre. Must specify genre.
 *
 * param: 
 *        genre : string
 * 
 * return: json file containing sorted books
 */
async function byGenre(){

}

/*Function: byRating
 *-------------------------------------
 *Sorts books by rating. If user chooses a specific rating n then display
 *books in the range n <= n >= n + 1.
 *
 * param: 
 *        rating : int (-1 for no specific rating chosen)
 *        highOrLow: boolean (1 for high, 0 for low)
 * 
 * return: json file containing sorted books
 */
async function byRating(){

}

/*Function: byDate
 *---------------------------------------
 *Sorts books by release date. From latest to oldest.
 * 
 * param:
 *        newOrOld : boolean (1 for newest, 0 for oldest)
 * 
 * return: json file containing sorted books
 */
async function byDate(){

}

//Make functions readily available from other files
module.exports = {
    byTitle,
    byAuthor,
    byPrice,
    bySales,
    byGenre,
    byRating,
    byDate,
};