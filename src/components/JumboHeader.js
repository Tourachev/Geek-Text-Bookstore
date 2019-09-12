import React from "react";

const JumboHeader = () => {
    return (
        <div className='jumbotron header'>
            <div className='container header-text'>
                <h1 className='display-2'>Geek text_</h1>
                <h1 className='display-4'>Because geeks like reading too.</h1>
                <hr className='my-4' />
                <button
                    className='ui secondary basic button huge'
                    id='browse-button'
                >
                    > Browse
                </button>
            </div>
        </div>
    );
};

export default JumboHeader;
