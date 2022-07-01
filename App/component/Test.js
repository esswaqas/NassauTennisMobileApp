 import DropDownPicker from 'react-native-dropdown-picker';
 import React from 'react';
export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            country: null,
            city: null,
            cities: []
        };
    }

    changeCountry(item) {
      alert(1)
        let city = null;
        let cities;
        switch (item.value) {
            case 'fr':
                cities = [
                    {label: 'Paris', value: 'paris'}
                ];
            break;
            case 'es':
                cities = [
                    {label: 'Madrid', value: 'madrid'}
                ];
            break;
        }

        this.setState({
            city,
            cities
        });
    }

    changeCity(item) {
        this.setState({
            city: item.value
        });
    }

    render() {
        return (
            <>
                <DropDownPicker
                    items={[
                        {label: 'France', value: 'fr'},
                        {label: 'Spain', value: 'es'},
                    ]}
                    defaultNull={this.state.country === null}
                    placeholder="Select your country"
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.changeCountry(item)}
                />
                <DropDownPicker
                    items={this.state.cities}
                    defaultNull={this.state.city === null}
                    placeholder="Select your city"
                    containerStyle={{height: 40}}
                    onChangeItem={item => this.changeCity(item)}
                />
            </>
        );
    }
}