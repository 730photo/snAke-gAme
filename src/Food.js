import React from 'react';

export default (props) => {
    //style the food dot
    const style = {
        left: `${props.dot[0]}%`,
        top: `${props.dot[1]}%`
    }

    return (
        <div className="snake-food" style={style}></div>
    )
}