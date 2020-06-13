import React from 'react';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
    CheckRow,
    SwitchRow,
	SliderRow,
	View,
} from 'react-native-settings-page';
import FontAwesome5 from 'react-native-vector-icons';
class Settings extends React.Component {
	state = {
		Readbar: false,
		switch: false,
		save:false,
		changes:false,
		notify:false,
		value: 40,
	}
	_navigateToScreen = () => {
		const { navigation } = this.props
		navigation.navigate('LoginScreen');
	}
	render() {
		return (
			
			<ReactNativeSettingsPage style = {{backgroundColor:'black'}}>
				<SectionRow text='Writing'>
                
					<SwitchRow
                    iconName = 'volume-up'
                        text='Keyboard sound'
                        _value={this.state.switch}
						_onValueChange={() => { this.setState({ switch: !this.state.switch }) }}
						 />

					<SwitchRow 
						text='Auto Save' 
						iconName='save'
						_value={this.state.save}
						_onValueChange={() => { this.setState({save: !this.state.save }) }} />
					<CheckRow 
						text='Suggest changes'
						iconName='lock'
						_color='#000'
						_value={this.state.changes}
						_onValueChange={() => { this.setState({ changes: !this.state.changes }) }} />
				</SectionRow>
                <SectionRow text = 'Notification and theme'>
                    <SwitchRow
                     iconName = 'book'
                     text='Enable Readbar'
                     _value={this.state.Readbar}
                     _onValueChange={() => { this.setState({ Readbar: !this.state.Readbar }) }}
                     />
                                         <SwitchRow
                     iconName = 'toggle-up'
                     text='Enable Notification'
                     _value={this.state.notify}
                     _onValueChange={() => { this.setState({ notify: !this.state.notify }) }}
                     />
                                                              <NavigateRow
                     iconName = 'file'
                     text='Privacy policy'
                     onPressCallback={this._navigateToScreen}
                     />
					 <NavigateRow
                     iconName = 'feed'
                     text='Help and feedback'
                     onPressCallback={this._navigateToScreen}
                     />
                </SectionRow>
			</ReactNativeSettingsPage>
			
		)
	}
}

export default Settings