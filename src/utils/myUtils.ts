import { Platform, Share } from "react-native"
import DeviceInfo from "react-native-device-info"
import { passwordStrength } from 'check-password-strength';
import moment from "moment";
import Clipboard from '@react-native-clipboard/clipboard';
import { COINS } from "../assets/images";

/**
 * EMAIL VAILDATION
 * **/
const validateEmail = (text: string) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(text)) {
        return true
    } else {
        return false
    }
};

const onShare = async (data: string) => {
    try {
        const result = await Share.share({
            message: data,
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error: any) {
    }
};

const passowrdStrength_ = (txt: any) => {
    const strength = passwordStrength(txt).id;
    return strength
};

const isIOS = () => {
    return Platform.OS == 'ios'
}

const hasNotch = () => {
    return DeviceInfo.hasNotch()
}

const formateDate = (_date: any) => {
    const date = moment(_date).format('DD')
    const month = moment(_date).format('MM')
    const year = moment(_date).format('YYYY')
    return `${year}-${month}-${date}`
}

const pasteFromClipboard = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const text = await Clipboard.getString();
            resolve(text)
        } catch (error) {
            resolve('')
        }
    })
};

const copyToClipboard = async (txt: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Clipboard.setString(txt || "");
            resolve(txt)
        } catch (error) {
            resolve('')
        }
    })
};

const getFormatedCoinBalance = (selectedWalletCoin: any) => {
    return selectedWalletCoin?.coinBalance ?
        Number(selectedWalletCoin?.coinBalance?.amount)?.toFixed(6) : (0).toFixed(2)
}

const isValidEthereumAddress = (address: string) => {
    // Ethereum addresses start with '0x' followed by 40 hexadecimal characters
    return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
}

const isValidBitcoinAddress = (address: string) => {
    // Bitcoin addresses start with '1' or '3' or 'bc1' for bech32 addresses, followed by a varying length of alphanumeric characters excluding '0', 'O', 'I', and 'l'
    return /^(1|3)[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(address) || /^(bc1)[0-9a-zA-HJ-NP-Z]{25,39}$/.test(address);
}

const isValidSolanaAddress = (address: string) => {
    // Solana addresses are 44 characters long base58 strings
    return /^[1-9A-HJ-NP-Za-km-z]{44}$/.test(address);
}

const isValidXRPAddress = (address: string) => {
    // XRP addresses start with 'r' and are between 25 and 35 characters long, using alphanumeric characters excluding '0', 'O', 'I', and 'l'
    return /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(address);
}

const isAddressValid = (network: string, address: string) => {
    if (address == '') {
        return true
    }
    switch (network?.toUpperCase()) {
        case 'BTC':
            return isValidBitcoinAddress(address)
        case 'ETH':
        case 'BNB':
        case 'USDT':
        case 'DOGE':
        case 'LINK':
        case 'AVAX':
        case 'UNI':
        case ('SAI').toUpperCase():
        case 'SHIBTC':
            return isValidEthereumAddress(address)
        case 'SOL':
            return isValidSolanaAddress(address)
        case 'XRP':
            return isValidXRPAddress(address)
        case 'GRADE':
            return isValidEthereumAddress(address)
        default:
            return false
    }
}

const getSendLimit = (network: string) => {
    const networkMap: any = {
        'BTC': 0.00014,
        'ETH': 0.0028,
        'USDT': 10,
        'BNB': 0.017,
        'SOL': 36.95,
        'XRP': 15.60,
        'DOGE': 1.4991,
        'LINK': 141.1,
        'AVAX': 3.47,
        'UNI': 81.9
    };
    return networkMap[network.toUpperCase()] || 10;
}

const minimizeAddress = (str: string) => {
    if (str.length <= 16) {
        return str;
    }
    return str.substring(0, 7) + "...." + str.substring(str.length - 7);
}

const getNetwork = (symbol: string) => {
    const networkMap: any = {
        'BTC': 'Bitcoin',
        'ETH': 'ERC20',
        'USDT': 'ERC20',
        'USDC': 'ERC20',
        'DAI': 'ERC20',
        'SAI': 'ERC20',
        'SHIBTC': 'ERC20',
        'BNB': 'BEP20',
        'SOL': 'Solana',
        'XRP': 'Ripple',
        'DOGE': 'BEP20',
        'LINK': 'ERC20',
        'AVAX': 'ERC20',
        'UNI': 'ERC20',
        'GRADE': "BEP20"
    };

    return networkMap[symbol.toUpperCase()] || 'NET';
};

const getCoinLocalData = (coin: any) => {
    switch (coin?.symbol?.toUpperCase()) {
        case "BTC":
            return {
                icon: COINS.BITCOIN,
            }
        case "ETH":
            return {
                icon: COINS.ETHEREUM,
            }
        case "USDT":
            return {
                icon: COINS.TETHER,
            }
        case "BNB":
            return {
                icon: COINS.BINANCE,
            }
        case "SOL":
            return {
                icon: COINS.SOLANA,
            }
        case "XRP":
            return {
                icon: COINS.XRP,
            }
        case "LINK":
            return {
                icon: COINS.CHAINLINK,
            }
        case "ETHDYDX":
        case "GRADE":
            return {
                icon: COINS.GRADE,
            }

        default:
            return {
                icon: { uri: coin?.logo },
            }
    }
}

const getAvailableBalance = (coinBalanceList: any[], symbol: string) => {
    const exists = coinBalanceList.find((x) => x.network_name?.toUpperCase() == symbol?.toUpperCase())
    return exists ? Number(exists.amount) : 0
}

const getAvailableBalanceInFiat = (coinBalanceList: any[], symbol: string) => {
    const exists = coinBalanceList.find((x) => x.network_name?.toUpperCase() == symbol?.toUpperCase())
    return exists ? Number(exists.fiat_balance) : 0
}

const getCurrencySymbol = (currency: string) => {
    switch (currency?.toUpperCase()) {
        case 'USD':
            return '$'
        case 'HKD':
            return 'HK$'
        case 'GBP':
            return '£'
        case 'KRW':
            return '₩'
        case 'EUR':
            return '€'
        case 'AED':
            return 'د.إ'
        default:
            return '$'
    }
}

const getTotalBalanceInFiat = (balanceList: any[]) => {
    let total = 0
    for (let index = 0; index < balanceList.length; index++) {
        const balance = balanceList[index];
        total = total + Number(balance?.fiat_balance)
    }
    return total?.toFixed(2)
}

const getCoinData = (coinList: any[], symbol: string) => {
    return coinList.find((x) => x.symbol?.toUpperCase() == symbol?.toUpperCase())
}

const getCryptoName = (symbol: string) => {

    const networkMap: any = {
        'BTC': 'bitcoin',
        'ETH': 'ethereum',
        'USDT': 'tether',
        'BNB': 'binancecoin',
        'SOL': 'solana',
        'XRP': 'ripple',
        'DOGE': 'dogecoin',
        'LINK': 'chainlink',
        'AVAX': 'ERC20',
        'UNI': 'uniswap'
    };

    return networkMap[symbol.toUpperCase()] || '';
}

const getWithdrawLimit = (cryptoId: string, fiatCurrency = 'usd') => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCryptoName(cryptoId)}&vs_currencies=${fiatCurrency}`);

            if (!response.ok) {
                resolve(getSendLimit(cryptoId))
            }

            const data = await response.json();
            const price = data[getCryptoName(cryptoId)]?.[fiatCurrency];

            if (price) {
                console.log(`${cryptoId} Price in ${fiatCurrency.toUpperCase()}: ${price}`);
                resolve((10 / price)?.toFixed(5));
            } else {
                resolve(getSendLimit(cryptoId))
            }
        } catch (error) {
            resolve(getSendLimit(cryptoId))
        }
    });
};

const getPriceInUsd = (cryptoId: string, fiatCurrency = 'usd') => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCryptoName(cryptoId)}&vs_currencies=${fiatCurrency}`);

            if (!response.ok) {
                resolve(false)
            }

            const data = await response.json();
            const price = data[getCryptoName(cryptoId)]?.[fiatCurrency];

            if (price) {
                resolve(price);
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(false)
        }
    });
};

const getWithdrawFees = (cryptoId: string, cryptoCurrency = 'eth') => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${getCryptoName(cryptoId)}&vs_currencies=${cryptoCurrency}`);

            if (!response.ok) {
                resolve(false)
            }

            const data = await response.json();
            const price = data[getCryptoName(cryptoId)]?.[cryptoCurrency];

            if (price) {
                console.log(`${cryptoId} Price in ${cryptoCurrency.toUpperCase()}: ${price}`);
                resolve(price);
            } else {
                resolve(false)
            }
        } catch (error) {
            resolve(false)
        }
    });
};

const getAmountToBeReceived = (base: number, amount: number) => {
    return Number((amount * 10) / base)?.toFixed(4)
}

const getFormattedAmount = (amount: string) => {
    return Number(amount.replace(/ /g, '')).toString()
}

const generateRandomId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const fixCoinSymbol = (asset: string) => {
    if (asset?.toUpperCase() === ("GRADE").toUpperCase() || asset?.toUpperCase() === ("SHIBTC").toUpperCase()) {
        return "GRADE"
        return "SHIBTC"
    } else {
        return asset
    }
}

const customSort = (a: any, b: any) => {
    const order = ["BTC", "ETH", "GRADE", "USDT", "XRP", "ADA", "DOGE", "LTC", "ICP", "DOT"];
    const first = a?.symbol || a?.network_name;
    const second = b?.symbol || b?.network_name;

    const indexA = order.indexOf(first);
    const indexB = order.indexOf(second);

    // If either indexA or indexB is -1, treat it as larger than any valid index
    const maxIndex = order.length;
    const rankA = indexA === -1 ? maxIndex : indexA;
    const rankB = indexB === -1 ? maxIndex : indexB;

    return rankA - rankB;
}

const sortCoinsList = (data: any) => {
    return data.sort(customSort);
}


export {
    onShare,
    isIOS,
    hasNotch,
    passowrdStrength_,
    formateDate,
    pasteFromClipboard,
    copyToClipboard,
    validateEmail,
    getFormatedCoinBalance,
    isValidEthereumAddress,
    isValidBitcoinAddress,
    isValidSolanaAddress,
    isValidXRPAddress,
    isAddressValid,
    getSendLimit,
    minimizeAddress,
    getNetwork,
    getCoinLocalData,
    getAvailableBalance,
    getAvailableBalanceInFiat,
    getCurrencySymbol,
    getTotalBalanceInFiat,
    getCoinData,
    getWithdrawLimit,
    getWithdrawFees,
    getAmountToBeReceived,
    getFormattedAmount,
    generateRandomId,
    fixCoinSymbol,
    sortCoinsList,
    getPriceInUsd
}