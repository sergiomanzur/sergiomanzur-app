import React from "react";
import {Image} from "react-native";

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../../static/images/header-image-transp.png')}
                style={{ width: 30, height: 30 }}
            />
        );
    }
}

export default LogoTitle;