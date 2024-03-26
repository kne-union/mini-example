import {View} from "@tarojs/components";
import {stateColors} from '@kne/mini-core';
import {PackageVersionFetch} from "./PackageVersion";
import {useEffect} from "react";
import Taro from "@tarojs/taro";

const unicodeEncode = function (string) {
    return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function (character) {
        // Escape all characters not included in SingleStringCharacters and
        // DoubleStringCharacters on
        // http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
        switch (character) {
            case '"':
            case "'":
            case '\\':
                return '\\' + character
            // Four possible LineTerminator characters need to be escaped:
            case '\n':
                return '\\n'
            case '\r':
                return '\\r'
            case '\u2028':
                return '\\u2028'
            case '\u2029':
                return '\\u2029'
            default:
                return '';
        }
    })
}

export const DisplayHtml = ({content}) => {
    useEffect(() => {
        Taro.options.html.transformElement = (el) => {
            if (el.nodeName === 'image') {
                el.setAttribute('mode', 'aspectFit');
            }

            if (el.nodeName === 'input' && el.props.type === 'checkbox') {
                el.nodeName = 'view';
                if (el.props.hasOwnProperty('checked')) {
                    el.setAttribute('class', el.props.class + ' is-checked');
                }
            }
            return el
        }
    }, []);

    return <View dangerouslySetInnerHTML={{
        __html: `<div style="--primary-color:${stateColors.primary}">${content.replace(/&#x(.*?);/g, (match, string) => {
            return String.fromCharCode(parseInt(`0x${string}`, 16));
        })}</div>`
    }} className='html-content padding-h-32'/>
};

const Detail = ({id, api, name}) => {

    return <PackageVersionFetch {...Object.assign({}, api)} urlParams={{id}} name={name} render={({data, version}) => {
        return <DisplayHtml
            content={(data && typeof data === 'string' ? data : '').replace(/..\/..\/assets/g, `https://registry.npmmirror.com/${name}/${version}/files/assets`)}/>
    }}/>;
};

export default Detail;
