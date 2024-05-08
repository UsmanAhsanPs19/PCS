import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const PinnedLocation = ({ latitude, longitude }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        // mapRef?.current?.fitToCoordinates([{ latitude: 37.78825, longitude: -122.4324 }], {
        //     edgePadding: calculateMapPadding(),
        //     animated: true,
        // });
    }, [])

    // Calculate padding for the map to ensure markers are fully visible
    const calculateMapPadding = () => {
        const { width, height } = Dimensions.get('window');
        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 0.0922;
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
        return {
            top: height / 10,
            right: width / 10,
            bottom: height / 10,
            left: width / 10,
        };
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* <Marker
                    coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                    }}
                    title="Pinned Location"
                /> */}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: "100%",
        width: "100%"
    },
});

export default PinnedLocation;
