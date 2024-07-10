import React, { useState } from 'react';
import { View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';

const LoadableImage = ({ source, classes, style, showError = true }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const onLoadEnd = () => setIsLoading(false);
    const onLoadError = () => setError(true);

    return (
        <View className="items-center justify-center">
            {isLoading && (
                <ActivityIndicator style={styles.activityIndicator} size="large" />
            )}
            {!isLoading && !error && (
                <ImageBackground
                    className={classes}
                    source={{ uri: source }}
                    style={style}
                    onLoadEnd={onLoadEnd}
                    onError={onLoadError}
                />
            )}

            {error && showError && <Text className="text-red-500">Error loading image: {error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        position: 'absolute',
    },
});

export default LoadableImage;
