import React, {Component} from 'react';
import { StyleSheet, View, Image , ScrollView, ActivityIndicator} from 'react-native';
import { Card, ListItem, Button, Icon, Text } from 'react-native-elements'
import axios from 'axios';
import LogoTitle from '../LogoTitle/LogoTitle';

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts :[],
            currentPage: 1,
            totalPages: null,
            loading: true,
        }
    }

    componentDidMount() {
        this.getInformation(1);
    }

    getInformation(page) {
        axios.get(`http://www.dev.sergiomanzur.com/api/pages/page${page}`)
            .then(res => {
                this.setState({
                    posts:res.data.data,
                    currentPage: res.data['current_page'],
                    totalPages:res.data['total_pages'],
                    loading:false
                });
            })
    }

    static navigationOptions = {
        headerTitle: () => <LogoTitle />,
    };



    render() {

        const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
            const paddingToBottom = 20;
            return layoutMeasurement.height + contentOffset.y >=
                contentSize.height - paddingToBottom;
        };

        const homePosts = this.state.posts.filter((x,i) => i < 6).map(
            post => <Card key={post.id} title={post.title} image={{uri: "http://dev.sergiomanzur.com/site/assets/files/"+post.id+"/"+
                    post.images[0].data}}>
                <Text style={{marginBottom: 10}}> {post.summary}</Text>
                <Button buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: 'red'}}
                        onPress={() => this.props.navigation.navigate('Post', {slug: post.slug})}
                        title='Leer Artículo '
                        icon={<Icon
                            name='right'
                            type='antdesign'
                            color='#ffffff'
                        />}
                        iconRight={true}
                />
            </Card>
        );

        return (
            <ScrollView
                style={styles.container}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        console.log("reached the bottom");
                    }
                }}
                scrollEventThrottle={400}
            >
                <Text h1 style={{textAlign: 'center', padding: 15}}>El Blog de Sergio Manzur</Text>
                {this.state.loading ? <ActivityIndicator size={"large"} /> : homePosts}
            </ScrollView>
        );

    }

}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10
    },
});
