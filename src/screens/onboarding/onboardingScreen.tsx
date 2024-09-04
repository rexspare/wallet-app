import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {
    FlatList,
    Image,
    TouchableOpacity,
    View
} from 'react-native'
import { ASYNC_KEYS, SCREENS } from '../../assets/constants'
import { BackArrow } from '../../assets/icons'
import { IMAGES } from '../../assets/images'
import { SIZE, hp } from '../../assets/stylesGuide'
import { BodyText, Label, Layout, PrimaryButton } from '../../components'
import { styles } from './styles'

const slides = [
    {
        id: '1',
        image: IMAGES.ONBOARDING_1,
        title: 'Welcome to Grade Wallet',
        subtitle: 'Easily send and receive crypto, secure, simple, and convenient.',
    },
    // {
    //     id: '2',
    //     image: IMAGES.ONBOARDING_2,
    //     title: 'Crypto Transaction\nSecurity ',
    //     subtitle: 'Trusted by million, GRADE Wallet is a secure wallet making the world of web3 accessible to all.',
    // },
    // {
    //     id: '3',
    //     image: IMAGES.ONBOARDING_3,
    //     title: 'Fast and reliable market\nupdated',
    //     subtitle: 'Trusted by million, GRADE Wallet is a secure wallet making the world of web3 accessible to all.',
    // },
];

const Slide = ({ item }: any) => {

    useEffect(() => {

    }, []);

    return (
        <View style={styles.item}>
            <Image
                source={item.image}
                style={{ width: hp(33), height: hp(33), resizeMode: 'contain' }}
            />
        </View>
    );
};

const OnboardingScreen = () => {
    const navigation = useNavigation<any>()
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const ref = useRef<FlatList | any>(null);

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SIZE.WIDTH);
        setCurrentSlideIndex(currentIndex);
    };

    const goToPrevSlide = () => {
        const prevSlideIndex = currentSlideIndex - 1;
        if (prevSlideIndex != -1) {
            const offset = prevSlideIndex * SIZE.WIDTH;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex - 1);
        }
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * SIZE.WIDTH;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const skip = () => {
        gotoApp()
    };

    const gotoApp = () => {
        AsyncStorage.setItem(ASYNC_KEYS.ONBOARDING, "true")
            .then(() => {
                navigation.navigate(SCREENS.MAIN)
            })
            .catch(() => {
                navigation.navigate(SCREENS.MAIN)
            })

    }

    const Header = () => {
        return (
            <View style={styles.headerContainer}>
                {
                    currentSlideIndex == 0 ?
                        <View></View>
                        :
                        <TouchableOpacity
                            activeOpacity={0.8}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                            onPress={() => goToPrevSlide()}
                        >
                            <BackArrow height={hp(2)} />
                        </TouchableOpacity>

                }

                <TouchableOpacity style={[styles.skipBtn]} onPress={skip}>
                    <BodyText style={styles.skipTxt}>Skip</BodyText>
                </TouchableOpacity>
            </View>
        );
    };

    const Footer = () => (
        <View style={styles.footerContainer}>


            <Label style={styles.title}>{slides[currentSlideIndex]?.title}</Label>
            <BodyText style={styles.subtitle}>{slides[currentSlideIndex]?.subtitle}</BodyText>

            {/* Indicator container */}
            <View
                style={styles.dotsContainer}>
                {/* Render indicator */}
                {/* {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            currentSlideIndex == index && {
                                backgroundColor: COLORS.BLACK,
                                width: 8,
                            },
                        ]}
                    />
                ))} */}
            </View>
            {/* Render buttons */}
            <PrimaryButton
                style={{ alignSelf: 'center' }}
                title="Continue"
                onPress={() =>
                    currentSlideIndex == slides.length - 1
                        ? gotoApp()
                        : goToNextSlide()
                }
            />


        </View>
    )


    return (
        <Layout fixed={true} >
            <Header />
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                contentContainerStyle={{ maxHeight: SIZE.HEIGHT }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
        </Layout>
    )
}

export default OnboardingScreen

