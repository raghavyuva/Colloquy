<View style={styles.screen}>
<Header style={styles.Header}>
    <Button onPress={() => props.navigation.navigate('external', { screen: 'polladd' })} transparent>
        <Text style={styles.fieldtitle}>Create Poll ?</Text>
    </Button>
    <Right>
        <Button onPress={_upload} transparent>
            <Text>Post</Text>
        </Button>
    </Right>
</Header>
<View style={{ backgroundColor: '#4f6d9e', height: screenHeight - 400, borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}>
    <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
            source={{
                uri:
                    postimage
            }}
            style={styles.logo}
        />
    </View>
    <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: '#974455' }}
        position="bottomRight"
        onPress={() => setactive(!active)}>
        <EvilIcons name="pencil" size={24} />
        <TouchableOpacity style={{ backgroundColor: '#34A34F' }} onPress={_pickImagefromCamera} >
            <Icon name="camera" />
        </TouchableOpacity>
        <Button style={{ backgroundColor: '#3B5998' }} onPress={_pickImagefromGallery}>
            <FontAwesome name="photo" size={24} color="white" />
        </Button>
    </Fab>
</View>
<View>
    <View style={styles.contain}>
        <TouchableOpacity style={styles.opacity}>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder='Title' placeholderTextColor='white' />
    </View>
    <View style={styles.contain}>
        <TouchableOpacity style={styles.opacity}>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder='Caption' placeholderTextColor='white'
            onChangeText={(body) => setbody(body)} value={body} />
    </View>
</View>

</View>