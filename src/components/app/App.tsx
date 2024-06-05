import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

const App = () => {
	const [defaultArticle, setDefaultArticle] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': defaultArticle.fontFamilyOption.value,
					'--font-size': defaultArticle.fontSizeOption.value,
					'--font-color': defaultArticle.fontColor.value,
					'--container-width': defaultArticle.contentWidth.value,
					'--bg-color': defaultArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultArticle={defaultArticle}
				setDefaultArticle={setDefaultArticle}
			/>
			<Article />
		</main>
	);
};

export default App;
