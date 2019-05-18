import React from 'react';
import { Image } from 'react-native';
import PropTypes from "prop-types";

const sizes = {
    large: {
        width: 150,
        height: 150,
    },
    small: {
        width: 50,
        height: 50,
    }
}


function Icon(props)  {
    const style = sizes[props.size];
    return (<Image
        source={{
            uri: `http://openweathermap.org/img/w/${props.icon}.png`
        }}
        style={style}
    />);
}


Icon.defaultProps = {
    size: 'small',
};

Icon.propTypes = {
    size: PropTypes.oneOf(['small', 'large']),
    icon: PropTypes.string,
};

export default Icon;
