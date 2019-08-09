import React from 'react';
import './loader.css';

const Loader = (props) => {
    let className = 'loader-wrapper' + (!props.isLoading ? ' hide' : '');
    return (
        <div className={className}>
            <div className="loader large"></div>
        </div>
    );
};

export default Loader;