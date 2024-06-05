import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

// Инициализируем корневой элемент для рендеринга
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Главный компонент
const App = () => {
	// Состояние по умолчанию для параметров статьи
	const [defaultArticle, setDefaultArticle] = useState(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticle.fontFamilyOption.value,
					'--font-size': defaultArticle.fontSizeOption.value,
					'--font-color': defaultArticle.fontColor.value,
					'--container-width': defaultArticle.contentWidth.value,
					'--bg-color': defaultArticle.backgroundColor.value,
				} as CSSProperties
			}>
			{/* Форма параметров статьи */}
			<ArticleParamsForm
				defaultArticle={defaultArticle}
				setDefaultArticle={setDefaultArticle}
			/>
			{/* Статья */}
			<Article />
		</div>
	);
};

// Рендерим главный компонент
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
