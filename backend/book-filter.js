
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
 *Sorts books by title from A-Z or Z-A.
 *
 * param: sort : boolean (true for A-Z, false for Z-A)
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byTitle(sort, pool, callback){
    if (typeof sort == 'boolean' || sort instanceof Boolean){

        var sortType;
        if (sort === true){
            sortType = 'DESC';
        }
        else{
            sortType = 'ASC';
        }

        var findBooks = "SELECT * FROM Book SORT BY title " + sortType;
        pool.query(findBooks, (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byTitle: Invalid parameter for sort, must be boolean');
    }
}

/*async functio: byAuthor
 *---------------------------------
 *Sorts books by author from A-Z to Z-A.
 *
 * param: sort : boolean
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byAuthor(sort, pool, callback){
    if (typeof sort == 'boolean' || sort instanceof Boolean){
        
        var sortType;
        if (sort === true){
            sortType = 'DESC';
        }
        else{
            sortType = 'ASC';
        }

        var findBooks = "SELECT * FROM Book SORT BY Author " + sortType;
        pool.query(findBooks, (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byAuthor: Invalid parameter for sort, must be boolean');
    }
}

/*Function: byPrice
 *----------------------------------
 *Sorts books by price. Can specify high or low price.
 *Should be able to include price range.
 *
 * param: highOrLow : boolean (1 for high, 0 for low)
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byPrice(highOrLow, pool, callback){
    if (typeof highOrLow == 'boolean' || highOrLow instanceof Boolean){
        
        var option;
        if (highOrLow === true){
            option = 'DESC';
        }
        else{
            option = 'ASC';
        }
        var findBooks = "SELECT * FROM Book ORDER BY price " + option;
        pool.query(findBooks, (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byPrice: Invalid parameter for byPrice, must be decimal');
    }
}

/*Function: bySales
 *-----------------------------------
 *Sorts books by total number of sales. Can specify most or least sold.
 *
 * param: mostOrLeast : boolean (1 for most, 0 for least)
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function bySales(mostOrLeast, pool, callback){
    if (typeof mostOrLeast == 'boolean' || mostOrLeast instanceof Boolean){

        var option;
        if (mostOrLeast === true){
            option = 'DESC';
        }
        else{
            option = 'ASC';
        }
        
        var findBooks = "SELECT * FROM Book ORDER BY sales " + option;
        pool.query(findBooks, (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byAuthor: Invalid parameter for mostOrLeast, must be boolean');
    }
}

/*Functiopn: byGenre
 *-----------------------------------
 *Sorts books by genre. Must specify genre.
 *
 * param: genre : string
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byGenre(genre, pool, callback){
    if (typeof genre == 'string' || genre instanceof String){
        
        var findBooks = "SELECT * FROM Book WHERE author = ?";
        pool.query(findBooks, [genre], (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byAuthor: Invalid parameter for author, must be string');
    }
}

/*Function: byRating
 *-------------------------------------
 *Sorts books by rating. If user chooses a specific rating n then display
 *books in the range n <= n >= n + 1.
 *
 * param: rating : int (-1 for no specific rating chosen)
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byRating(rating, pool, callback){
    if (typeof rating == 'number'){
        
        var findBooks = "SELECT * FROM Book WHERE rating = ?";
        pool.query(findBooks, [rating], (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byRating: Invalid parameter for rating, must be integer');
    }
}

/*Function: byDate
 *---------------------------------------
 *Sorts books by release date. From latest to oldest.
 * 
 * param: newOrOld : boolean (1 for newest, 0 for oldest)
 *        pool : db connection
 *        callback: function to return error or result
 * 
 * return: json object containing sorted books
 */
async function byDate(newOrOld, pool, callback){
    if (typeof newOrOld == 'boolean' || newOrOld instanceof Boolean){

        var option;
        if (newOrOld === true){
            option = 'DESC';
        }
        else{
            option = 'ASC';
        }
        
        var findBooks = "SELECT * FROM Book ORDER BY date " + option;
        pool.query(findBooks, (err, res, fields) => {
            if (err){
                callback(err, null, null);
            }
            else{
                callback(null, res, fields);
            }
        });
    }
    else{
        console.log('In function byDate: Invalid parameter for newOrOld, must be boolean');
    }
}

async function insertBook(values, pool, callback){
    var query = 'INSERT INTO Book VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    pool.query(query, values, (err, res, fields) => {
        if (err){
            callback(err, null, null);
        }
        else{
            callback(null, res, fields);
        }
    });
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
    insertBook
};