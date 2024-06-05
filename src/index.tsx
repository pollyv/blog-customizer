import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from 'components/app/App';

import './styles/index.scss';

// Инициализируем корневой элемент для рендеринга
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// Рендерим главный компонент
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
