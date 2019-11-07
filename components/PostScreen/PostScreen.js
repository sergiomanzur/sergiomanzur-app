import React from "react";
import {StyleSheet, View, ScrollView, Image, Dimensions, ActivityIndicator} from "react-native";
import { WebView } from 'react-native-webview';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'
import axios from "axios";
import LogoTitle from '../LogoTitle/LogoTitle';


class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            imgWidth: 0,
            imgHeight: 0,
            loading : true,
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const slug = navigation.getParam('slug');
        console.log('url:' + 'http://www.dev.sergiomanzur.com/api/pages/' + slug)

        axios.get('http://www.dev.sergiomanzur.com/api/pages/' + slug)
            .then(res => {
                this.setState({posts:res.data, loading:false});
                Image.getSize(this.state.posts.main_image, (width, height) => {
                    // calculate image width and height
                    const screenWidth = Dimensions.get('window').width;
                    const scaleFactor = width / screenWidth;
                    const imageHeight = height / scaleFactor;
                    this.setState({imgWidth: screenWidth, imgHeight: imageHeight})
                })

            }, (error) => {
                console.log(error);
                this.setState({posts: false});
            })

    }

    onWebViewMessage = (event: WebViewMessageEvent) => {
        this.setState({webViewHeight: Number(event.nativeEvent.data)})
    };

    static navigationOptions = {
        headerTitle: () => <LogoTitle />,
    };


    render() {

        const {title, body: content, main_image: exampleImage } =  this.state.posts;
        const {imgWidth, imgHeight} = this.state;
        const jsCode = `const meta = document.createElement('meta');  document.getElementsByTagName('head')[0].appendChild(meta); 
                      
                      var style = document.createElement('style');
                      style.innerHTML = \`
                      img {
                      width: 100%;
                      }
                      p {
                        font-size: 18px;
                        line-height: 27px;
                        color: #3C3F47;
                        font-family: var(--font-family-secondary);
                        font-weight: 400;
                        margin: 48px 0px;
                        clear: both;
                        word-break: break-word;
                        letter-spacing: -0.1px;
                      }
                      :root {
                        --main-hilite-color: #8c8c8c;
                        --title-case: uppercase;
                        --font-family-primary: 'Lato', sans-serif;
                        --font-family-secondary: 'Noticia Text', serif;
                        --font-family-heading: 'Oswald', sans-serif;
                        --tl: 0.5;
                       }
                       h1 {
                        font-size: 39px;
                        margin: 0px;
                        line-height: 42px;
                        font-family: var(--font-family-secondary);
                        text-align: center;
                        color: #3C3F47;
                        padding: 0 20px;
                        }
                        h2 {
                        font-size: 32px;
                        margin: 0px;
                        line-height: 42px;
                        font-family: var(--font-family-secondary);
                        text-align: center;
                        color: #3C3F47;
                        padding: 0 20px;
                        }
                        h3 {
                        font-size: 29px;
                        margin: 0px;
                        line-height: 42px;
                        font-family: var(--font-family-secondary);
                        text-align: center;
                        color: #3C3F47;
                        padding: 0 20px;
                        }   
                      \`;
                      document.head.appendChild(style);
                      window.ReactNativeWebView.postMessage(document.body.scrollHeight)
                       `;

        const contentView = (<WebView
            source={{ html: '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'+ content }}
            style={{ height: this.state.webViewHeight, width: Dimensions.get('window').width}}
            /*style = {[this.props.style,{flex : 1,borderWidth: 1, height: '100%'}]}*/
            onMessage={this.onWebViewMessage}
            injectedJavaScript={jsCode}
            scrollEnabled={false}
        />);


        return (
            <ScrollView style={{flexGrow: 1}}>
                <Text h1 style={{textAlign: 'center', padding: 15}}>{title}</Text>
                <Image
                    source={{ uri: exampleImage }}
                    style={{width: imgWidth, height: imgHeight}}
                />
                {this.state.loading ? <ActivityIndicator size={"large"} /> : contentView}
            </ScrollView>
        );
    }
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10
    },
});