import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from './Header';
import { Paragraph } from 'react-native-paper';
const { width: screenWidth } = Dimensions.get('window');
export default class Privacy extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
}
    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    render(){
        if (this.state.loading){
            return (
                <Container></Container>
              );
        }
        return(
            <Container>

<Text style={{fontSize:24,fontWeight:'bold',textAlign:'center',backgroundColor:'yellow'}}>Privacy Policy</Text>
<ScrollView>
<Paragraph>
cambridge institute of technology built the citech app as an Ad Supported app. This SERVICE is provided by cambridge institute of technology at no cost and is intended for use as is.{'\n'}{'\n'}

This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.{'\n'}{'\n'}

If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.{'\n'}{'\n'}

The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at citech unless otherwise defined in this Privacy Policy.{'\n'}

Information Collection and Use{'\n'}{'\n'}{'\n'}

For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to storage access. The information that we request will be retained by us and used as described in this privacy policy.{'\n'}

The app does use third party services that may collect information used to identify you.{'\n'}

Link to privacy policy of third party service providers used by the app{'\n'}{'\n'}{'\n'}

Google Play Services{'\n'}
Expo{'\n'}
Log Data{'\n'}{'\n'}{'\n'}

We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.{'\n'}

Cookies{'\n'}

Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{'\n'}

This Service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.{'\n'}{'\n'}

Service Providers{'\n'}

We may employ third-party companies and individuals due to the following reasons:{'\n'}{'\n'}{'\n'}

To facilitate our Service;{'\n'}
To provide the Service on our behalf;{'\n'}
To perform Service-related services; or{'\n'}
To assist us in analyzing how our Service is used.{'\n'}
We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.{'\n'}{'\n'}

Security{'\n'}{'\n'}

We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.{'\n'}{'\n'}

Links to Other Sites{'\n'}{'\n'}{'\n'}

This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.{'\n'}{'\n'}

Children’s Privacy{'\n'}

These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.{'\n'}{'\n'}

Changes to This Privacy Policy{'\n'}{'\n'}{'\n'}

We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.{'\n'}{'\n'}

This policy is effective as of 2020-06-25{'\n'}{'\n'}{'\n'}

Contact Us{'\n'}{'\n'}{'\n'}{'\n'}

If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at https://www.cambridge.edu.in{'\n'}{'\n'}
</Paragraph>
</ScrollView>
            </Container>
        );
    }
}