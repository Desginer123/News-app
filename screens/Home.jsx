
import {StatusBar, View, Text, Alert, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import React from 'react';
import Loading from '../components/Loading';
import { Post } from '../components/Post';
import axios from 'axios'

	
export const HomeScreen = ({navigation}) => {
	const [articles, setArticles] = React.useState('');
	const [loading, setLoading] = React.useState(true)

	const fetchPosts = () => {
		setLoading(true)
		axios.get('https://632009aae3bdd81d8ef10d61.mockapi.io/articles').then(({data}) => {
			setArticles(data)
		}).catch(err => {
			console.log(err);
			Alert.alert('Ошибка','Ошибка при подключении статьи')
		}).finally(() => {
			setLoading(false)
		})
	}
	React.useEffect(fetchPosts, [])
  if(loading) {
	return (
		<Loading/>
	)
  }
  return (
    <View>
		<FlatList refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts}/>} data={articles} renderItem={({item}) => 
		<TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id, title: item.title})}>
			<Post  title={item.title} createdAt={item.createdAt} imageUrl={item.imageUrl}/>
		</TouchableOpacity>
	}/>
	 <StatusBar theme='auto'/>
    </View>
  );
}

 