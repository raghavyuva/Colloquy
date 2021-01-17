import React, { useState,useEffect } from 'react';
import { StyleSheet,  Dimensions, View, Alert,} from 'react-native';
import { Container,  Card, CardItem,  Text, Button, Form, Item, Label, Input } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BottomSheet } from 'react-native-btr';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
const { height: screenHeight } = Dimensions.get('window');
const EditProfile = () => {
    const [image, setimage] = useState('');
    const [body, setbody] = useState('');
    const [postimage, setpostimage] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [username, setusername] = useState('');
    const [visible, setvisible] = useState(false);
    const _upload = async () => {
        const uriArr = postimage.split('.');
        const fileType = uriArr[uriArr.length - 1]
        const file = `data:${fileType};base64,${image}`
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", 'primish');
        data.append("cloud_name", "raghavyuva");
        fetch("https://api.cloudinary.com/v1_1/raghavyuva/image/upload", {
            method: "POST",
            body: data, 
        }).then(res => res.json()).then((da) => {
            fetch(`${Config.url}` + `/user/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json", 
                },
                body: JSON.stringify({
                    tagline: body,
                    username: username,
                    userphoto: da.secure_url
                })
            }).then(res => res.json()).then((resp) => {
                console.log(resp);
            })
        }).catch(err => {
            Alert.alert(err);
        })
    }
    const _toggleBottomNavigationView = () => {
        setvisible(!visible);
    };
    const _pickImagefromCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                base64: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                const { uri, base64 } = result
                setpostimage(uri);
                setimage(base64)
            }
        } catch (E) {
            console.log(E);
        }
    };
    const _pickImagefromGallery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                base64: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                const { uri, base64 } = result
                setpostimage(uri);
                setimage(base64)
            }
        } catch (E) {
            console.log(E);
        }
    }
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    useEffect(() => {
        getPermissionAsync();
        return () => {

        }
    }, [])
    return (
        <Container>
            <Card style={styles.card}>
                <CardItem style={{ backgroundColor: '#0E043B' }}></CardItem>
                <Text style={styles.logo}>Edit your profile</Text>
                <Form>
                    <TouchableOpacity onPress={_toggleBottomNavigationView}>
                      
                    </TouchableOpacity>

                    <BottomSheet
                        visible={visible}
                        //setting the visibility state of the bottom sheet
                        onBackButtonPress={_toggleBottomNavigationView}
                        //Toggling the visibility state on the click of the back botton
                        onBackdropPress={_toggleBottomNavigationView}
                    //Toggling the visibility state on the clicking out side of the sheet
                    >
                        <CardItem style={styles.bottomNavigationView}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}>
                                <Text style={{ padding: 20, fontSize: 25, color: "white", fontWeight: 'bold' }}>
                                    Select one
              </Text>
                                <Button onPress={_pickImagefromCamera} style={{ backgroundColor: 'red', }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>turn on camera</Text>
                                </Button >

                                <Button onPress={_pickImagefromGallery} style={{ backgroundColor: 'red', marginTop: 20 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>open gallery</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </BottomSheet>
                    <Item floatingLabel>
                        <Label style={styles.fieldtitle} >User Name</Label>
                        <Input style={styles.fieldinput} onChangeText={(username) => setusername(username)}
                            value={username} returnKeyType='next' editable={true} />

                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.fieldtitle} >Tagline</Label>
                        <Input style={styles.fieldinput}
                            onChangeText={(tagline) => setbody(tagline)}
                            value={body} returnKeyType='next' editable={true} />

                    </Item>
                    <Item stackedLabel style={styles.submission}>
                        <Button style={styles.submit} onPress={_upload} ><Text style={styles.submittext}>Submit</Text></Button>
                    </Item>
                </Form>
            </Card>
        </Container>
    )
}

export default EditProfile
const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#0E043B',
      textAlign: 'center',
    },
    logo: {
      fontSize: 24,
      textAlign: 'center',
      color: 'yellow',
    },
    card: {
      backgroundColor: '#0E043B',
      height: screenHeight
    },
    fieldtitle: {
      color: 'white',
    },
    fieldinput: {
      color: 'yellow',
  
    },
    submission: {
      marginTop: 15,
      borderColor: null,
    },
    submit: {
      backgroundColor: '#5F7',
      borderRadius: 26,
      width: 170,
      justifyContent: 'center'
    },
    submittext: {
      color: 'black',
      textTransform: 'capitalize',
    },
    signup: {
      color: 'red',
      fontSize: 20
    },
    fieldtitl: {
      color: '#FFF',
      borderColor: null,
    },
    MainContainer: {
      flex: 1,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
      backgroundColor: '#E0F7FA',
    },
    bottomNavigationView: {
      backgroundColor: '#0E043B',
      width: '100%',
      height: 250,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 23
    },
  });
  
  