import React from 'react'
import { View } from 'react-native'
import { AdMobBanner } from 'expo-ads-admob';

const BannerAdMobBanner = props => {
    return (
        <View>
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3966719253606702/6829743132"
                servePersonalizedAds
                setTestDeviceIDAsync={!isProduction}
                onDidFailToReceiveAdWithError={erro => console.log(erro)} />
        </View>
    )
}

export {
    BannerAdMobBanner
}

