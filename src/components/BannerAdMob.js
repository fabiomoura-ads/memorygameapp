import React from 'react'
import { View } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob';

const isProduction = true;

const BannerAdMobBanner = props => {
    //--id valido
    return (
        <View>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID={isProduction ? "ca-app-pub-3966719253606702/6829743132" : "ca-app-pub-3940256099942544/6300978111"}
                servePersonalizedAds
                setTestDeviceIDAsync={!isProduction}
                onDidFailToReceiveAdWithError={erro => console.log(erro)} />
        </View>
    )
}

export {
    BannerAdMobBanner
}

