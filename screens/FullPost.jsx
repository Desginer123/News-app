import React from 'react'
import styled from 'styled-components/native';
import axios from 'axios'
import Loading from '../components/Loading';
const FullPostView = styled.View`
	padding: 15px;
`
const PostImage = styled.Image`
	border-radius: 10px;
	width: 100%;
	height: 250px;
	margin-bottom: 20px;
`

const PostText = styled.Text`
	font-size: 18px;
	line-height: 24px;
`

const FullPostScreen = ({ route, navigation }) => {

	const [article, setArticle] = React.useState('');
	const [loading, setLoading] = React.useState(true)
	const { id, title } = route.params;



	React.useEffect(() => {
		navigation.setOptions({
			title
		})
		setLoading(true)
		axios.get(`https://632009aae3bdd81d8ef10d61.mockapi.io/articles/${id}`).then(({ data }) => {
			setArticle(data)
		}).catch(err => {
			console.log(err);
			Alert.alert('Ошибка', 'Ошибка при подключении cтатью')
		}).finally(() => {
			setLoading(false)
		})
	}, [])
	if (loading) {
		return (
			<Loading />
		)
	}
	return (
		<FullPostView>
			<PostImage source={{ uri: article.imageUrl }} />
			<PostText>{article.text}</PostText>
		</FullPostView>
	)
}

export default FullPostScreen