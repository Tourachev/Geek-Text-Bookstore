import React from "react";

const SideBar = () => {
    return (
        <div id='sidebar'>
            <div>
                <h2>Genre</h2>
                <p>
                    Sci-Fi <input type='checkbox' />
                </p>
                <p>
                    Biography <input type='checkbox' />
                </p>
                <p>
                    Horror <input type='checkbox' />
                </p>
                <p>
                    Pulp Fiction <input type='checkbox' />
                </p>
                <p>
                    Drama <input type='checkbox' />
                </p>
                <p>
                    Comedy <input type='checkbox' />
                </p>
                <hr />
                <h2>Rating</h2>
                <p>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i> <input type='checkbox' />
                </p>
                <p>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i> <input type='checkbox' />
                </p>
                <p>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i>
                    <input type='checkbox' />
                </p>
                <p>
                    <i class='fas fa-star'></i>
                    <i class='fas fa-star'></i> <input type='checkbox' />
                </p>
                <p>
                    <i class='fas fa-star'></i> <input type='checkbox' />
                </p>
            </div>
        </div>
    );
};

export default SideBar;
