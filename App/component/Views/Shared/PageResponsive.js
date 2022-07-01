import {Dimensions,PixelRatio} from 'react-native'
let {width,height} =  Dimensions.get('window')

const widthTodp =  number =>{
    let givenWidth  =  typeof number==='number' ? number: parseFloat(number);
    return PixelRatio.roundToNearestPixel ((width*givenWidth)/100);
}
const heightTodp =  number =>{
    let givenheigth  =  typeof number==='number' ? number: parseFloat(number);
    return PixelRatio.roundToNearestPixel ((height*givenheigth)/100);
}

