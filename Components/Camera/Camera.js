
import React from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image, Dimensions, Modal, ToastAndroid, StatusBar
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import Tflite from 'tflite-react-native';

import Marker from '../Reusables/Marker'

let tflite = new Tflite();


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
    };

    componentDidMount() {
        tflite.loadModel({
            model: 'models/detect.tflite',// required
            labels: 'models/labelmap.txt',  // required
            numThreads: 1,                              // defaults to 1  
        },
            (err, res) => {
                this.setState({
                    loading: false
                })
                if (err) {
                    ToastAndroid.show("Error loading the model", ToastAndroid.SHORT);
                    this.props.togglePitcher(false)
                } else
                    ToastAndroid.show("Model loaded successfully", ToastAndroid.SHORT);
            });
        this.timerHandle = setInterval(async () => {    // ***
            console.log('iiii')
            if (this.camera) {
                const data = await this.camera.takePictureAsync();
                console.log('takePicture ', data);
                try {
                    tflite.detectObjectOnImage({
                        path: data.uri,
                        model: 'SSDMobileNet',
                        // imageMean: 127.5,
                        // imageStd: 127.5,
                        threshold: 0.3,       // defaults to 0.1
                        numResultsPerClass: 2,// defaults to 5
                    },
                        (err, res) => {
                            if (err)
                                console.log(err);
                            else {
                                console.log(res);
                                this.setState({
                                    pictureData: data,
                                    values: res
                                })
                            }
                        });
                } catch (e) {
                    console.warn(e)
                }
            }                  // ***
        }, 2000);                                // ***
    };                                         // ***

    componentWillUnmount = () => {             // ***
        if (this.timerHandle) {                  // ***
            clearTimeout(this.timerHandle);      // ***
            this.timerHandle = 0;                // ***
        }
        tflite.close();                                     // ***
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

    takePicture = async function () {
        if (this.timerHandle) {                  // ***
            clearTimeout(this.timerHandle);      // ***
            this.timerHandle = 0;                // ***
        }
        this.props.navigation.replace("CheckBoxer", { values: this.state.values })
        // if (this.camera) {
        //     const data = await this.camera.takePictureAsync();
        //     console.log('takePicture ', data);
        //     try {
        //         tflite.detectObjectOnImage({
        //             path: data.uri,
        //             model: 'SSDMobileNet',
        //             // imageMean: 127.5,
        //             // imageStd: 127.5,
        //             threshold: 0.3,       // defaults to 0.1
        //             numResultsPerClass: 2,// defaults to 5
        //         },
        //             (err, res) => {
        //                 if (err)
        //                     console.log(err);
        //                 else {
        //                     console.log(res);
        //                     this.setState({
        //                         values: res
        //                     })
        //                 }
        //             });
        //     } catch (e) {
        //         console.warn(e)
        //     }
        // }
    };

    takeVideo = async () => {
        const { isRecording } = this.state;
        if (this.camera && !isRecording) {
            try {
                const promise = this.camera.recordAsync(this.state.recordOptions);

                if (promise) {
                    this.setState({ isRecording: true });
                    const data = await promise;
                    console.warn('takeVideo', data);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    facesDetected = ({ faces }) => this.setState({ faces });

    renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
        <View
            key={faceID}
            transform={[
                { perspective: 600 },
                { rotateZ: `${rollAngle.toFixed(0)}deg` },
                { rotateY: `${yawAngle.toFixed(0)}deg` },
            ]}
            style={[
                styles.face,
                {
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                },
            ]}
        >
            <Text style={styles.faceText}>ID: {faceID}</Text>
            <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
            <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
        </View>
    );

    renderLandmarksOfFace(face) {
        const renderLandmark = position =>
            position && (
                <View
                    style={[
                        styles.landmark,
                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                        },
                    ]}
                />
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
                {renderLandmark(face.leftEarPosition)}
                {renderLandmark(face.rightEarPosition)}
                {renderLandmark(face.leftCheekPosition)}
                {renderLandmark(face.rightCheekPosition)}
                {renderLandmark(face.leftMouthPosition)}
                {renderLandmark(face.mouthPosition)}
                {renderLandmark(face.rightMouthPosition)}
                {renderLandmark(face.noseBasePosition)}
                {renderLandmark(face.bottomMouthPosition)}
            </View>
        );
    }

    renderFaces = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderFace)}
        </View>
    );

    renderLandmarks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderLandmarksOfFace)}
        </View>
    );

    renderTextBlocks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.textBlocks.map(this.renderTextBlock)}
        </View>
    );

    renderTextBlock = ({ bounds, value }) => (
        <React.Fragment key={value + bounds.origin.x}>
            <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
                {value}
            </Text>
            <View
                style={[
                    styles.text,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            />
        </React.Fragment>
    );

    textRecognized = object => {
        const { textBlocks } = object;
        this.setState({ textBlocks });
    };

    barcodeRecognized = ({ barcodes }) => this.setState({ barcodes });

    renderBarcodes = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.barcodes.map(this.renderBarcode)}
        </View>
    );

    renderBarcode = ({ bounds, data, type }) => (
        <React.Fragment key={data + bounds.origin.x}>
            <View
                style={[
                    styles.text,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}
            >
                <Text style={[styles.textBlock]}>{`${data} ${type}`}</Text>
            </View>
        </React.Fragment>
    );

    renderRecording = () => {
        const { isRecording } = this.state;
        const backgroundColor = isRecording ? 'white' : 'darkred';
        const action = isRecording ? this.stopVideo : this.takeVideo;
        const button = isRecording ? this.renderStopRecBtn() : this.renderRecBtn();
        return (
            <TouchableOpacity
                style={[
                    styles.flipButton,
                    {
                        flex: 0.3,
                        alignSelf: 'flex-end',
                        backgroundColor,
                    },
                ]}
                onPress={() => action()}
            >
                {button}
            </TouchableOpacity>
        );
    };

    stopVideo = async () => {
        await this.camera.stopRecording();
        this.setState({ isRecording: false });
    };

    renderRecBtn() {
        return <Text style={styles.flipText}> REC </Text>;
    }

    renderStopRecBtn() {
        return <Text style={styles.flipText}> ☕ </Text>;
    }

    renderCamera() {
        const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <>
                <StatusBar barStyle="light-content" backgroundColor="rgb(0,0,0)" />
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
                    faceDetectionLandmarks={
                        RNCamera.Constants.FaceDetection.Landmarks
                            ? RNCamera.Constants.FaceDetection.Landmarks.all
                            : undefined
                    }
                    onFacesDetected={canDetectFaces ? this.facesDetected : null}
                    onTextRecognized={canDetectText ? this.textRecognized : null}
                    onGoogleVisionBarcodesDetected={canDetectBarcode ? this.barcodeRecognized : null}
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
                    {!!canDetectFaces && this.renderLandmarks()}
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
                            <Image source={require('../../assets/Icons/flip.png')} style={{ width: 35, height: 30, resizeMode: "contain" }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity
                            style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 5, borderColor: "white" }}
                            onPress={this.takePicture.bind(this)}
                        >
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity onPress={this.toggleFlash.bind(this)}>
                            <Image source={require('../../assets/Icons/flash.png')} style={{ width: 25, height: 25, resizeMode: "contain" }} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }} />
                    </View>
                </View>
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
