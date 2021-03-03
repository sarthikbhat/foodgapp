
import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, BackHandler, Image, Dimensions, Modal, ToastAndroid, StatusBar
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'rn-fetch-blob';
import { url } from '../../Reusables/constants'
import Marker from '../Reusables/Marker'

// let tflite = new Tflite();


const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

const landmarkSize = 2;

export default class CameraScreen extends React.Component {
    state = {
        loading: true,
        pictureData: {},
        values: [],
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        autoFocusPoint: {
            normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
            drawRectPosition: {
                x: Dimensions.get('window').width * 0.5 - 32,
                y: Dimensions.get('window').height * 0.5 - 32,
            },
        },
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['288p'],
        },
        isRecording: false,
        canDetectFaces: false,
        canDetectText: false,
        canDetectBarcode: false,
        faces: [],
        textBlocks: [],
        barcodes: [],
        clicked: false,
        uri: ''
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            console.log(this.state.clicked)
            if (this.state.clicked == false) {
                this.props.navigation.goBack();
                return true;
            }
            this.setState({ clicked: false })
            return true;
        });
    };                                         // ***

    componentWillUnmount = () => {         
        BackHandler.removeEventListener('hardwareBackPress')
    };

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    toggleWB() {
        this.setState({
            whiteBalance: wbOrder[this.state.whiteBalance],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    touchToFocus(event) {
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    submit = () => {
        var date = new Date()
        RNFetchBlob.fetch('POST', `${url}/upload`, {
            'Content-Type': 'multipart/form-data',
        }, [
            {
                name: 'file',
                filename:'aaa.jpg',
                data: RNFetchBlob.wrap(this.state.uri)
            },
            { name: 'name', data: JSON.stringify(date.getMilliseconds()) },
        ]).then(async (resp) => {
            var res;
            try {
                res = await JSON.parse(resp.data)
                if (res!=false) {
                    this.setState({
                        loading: false,
                    })
                    ToastAndroid.show('Processing', ToastAndroid.LONG)
                    this.props.navigation.replace('After',{ingredients:res})
                }
                else {
                    this.setState({
                        loading: false,
                    })
                    ToastAndroid.show('There was some error processing ur image\nPLease try again', ToastAndroid.LONG)
                }
            } catch (e) {
                this.setState({
                    loading: false,
                })
                ToastAndroid.show("Bad gateway", ToastAndroid.SHORT)
            }
        }).catch((e) => {
            var errorMsg = "An error Occured! Please try after sometime"
            if (e.message === "Timeout" || e.message === 'Network request failed') {
                errorMsg = "Looks like there is no Internet connection available"
            }
            this.setState({
                loading: false,
            })

            ToastAndroid.show("Network error", ToastAndroid.LONG)
        })
    }


    takePicture = async function () {
        // if (this.timerHandle) {                  // ***
        //     clearTimeout(this.timerHandle);      // ***
        //     this.timerHandle = 0;                // ***
        // }
        const data = await this.camera.takePictureAsync();
        this.setState({ clicked: true, uri: data.uri })
    };
    
    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));




    renderCamera() {

        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="rgb(0,0,0)" />
                {
                    this.state.clicked ? <>
                        <Image source={{ uri: this.state.uri }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                        <View style={{ zIndex: 99, position: 'absolute', height: 110, left: 0, bottom: 10, width: "100%", backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>

                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    alignItems: "center",
                                    marginBottom: 5
                                }}
                            >
                                <View style={{ flex: 1 }} />
                                <TouchableOpacity style={{ marginTop: 3 }} onPress={()=>{this.setState({ clicked: false })}}>
                                    <Text style={{ color: "white", fontSize: 15 }} >Cancel</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 2 }} />
                                <TouchableOpacity onPress={()=>{this.submit()}}>
                                    <Text style={{ color: "white", fontSize: 15 }} >OK</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }} />
                            </View>
                        </View>
                    </>
                        :
                        <>
                            <RNCamera
                                useNativeZoom={true}
                                ref={ref => {
                                    this.camera = ref;
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'space-between',
                                }}
                                type={this.state.type}
                                flashMode={this.state.flash}
                                autoFocus={this.state.autoFocus}
                                autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
                                zoom={this.state.zoom}
                                whiteBalance={this.state.whiteBalance}
                                ratio={this.state.ratio}
                                focusDepth={this.state.depth}
                                androidCameraPermissionOptions={{
                                    title: 'Permission to use camera',
                                    message: 'We need your permission to use your camera',
                                    buttonPositive: 'Ok',
                                    buttonNegative: 'Cancel',
                                }}
                            >
                                {/* <View style={StyleSheet.absoluteFill}>
                        <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
                        <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
                            <View style={{ flex: 1 }} />
                        </TouchableWithoutFeedback>
                    </View> */}
                                {
                                    this.state.values.slice(0, 3).map(elm => {
                                        return <Marker elm={elm} data={this.state.pictureData} />
                                        // return <Text>{elm.detectedClass},</Text>
                                    })
                                }
                                <View
                                    style={{
                                        flex: 0.5,
                                        height: 72,
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: 'transparent',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                        }}
                                    >

                                    </View>
                                </View>
                            </RNCamera>
                            {/* <ModalButtons takePicture={this.takePicture} toggleFacing={this.toggleFacing} toggleFlash={this.toggleFlash} visible={true} navigation={this.props.navigation} /> */}
                            <View style={{ height: 110, backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>

                                <View
                                    style={{
                                        backgroundColor: 'transparent',
                                        flexDirection: 'row',
                                        alignSelf: 'center',
                                        alignItems: "center",
                                        marginBottom: 5
                                    }}
                                >
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity style={{ marginTop: 3 }} onPress={this.toggleFacing.bind(this)}>
                                        <Image source={require('../../Assets/icons/flip.png')} style={{ width: 35, height: 30, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity
                                        style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: "white" }}
                                        onPress={this.takePicture.bind(this)}
                                    >
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                    <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
                                        <Image source={require('../../Assets/icons/flash.png')} style={{ width: 25, height: 25, resizeMode: "contain" }} />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }} />
                                </View>
                            </View>
                        </>
                }

            </>
        );
    }

    render() {
        return <View style={styles.container}>{this.renderCamera()}</View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#000',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
})
