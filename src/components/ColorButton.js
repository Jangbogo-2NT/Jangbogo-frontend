import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';


export default class ColorButton extends Component {
    static defaultProps = {
        title: 'untitled',
        buttonColor: '#fff',
        titleColor: '#000',
        onPress: () => null,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity style={[
                styles.button,
                { backgroundColor: this.props.buttonColor }
            ]}
                onPress={this.props.onPress}>
                <Text style={[
                    styles.title,
                    { color: this.props.titleColor }
                ]}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        width: 300,
    },
    title: {
        fontSize: 18,
    },
});
