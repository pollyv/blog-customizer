import { ArrowButton } from 'components/arrow-button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from '../separator';
import { Button } from 'components/button';
import { useState, useEffect, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	// Начальное состояние статьи
	defaultArticle: ArticleStateType;
	// Функция для обновления состояния статьи
	setDefaultArticle: (data: ArticleStateType) => void;
};

//Компонент формы параметров статьи
export const ArticleParamsForm = ({
	defaultArticle,
	setDefaultArticle,
}: ArticleParamsFormProps) => {
	// Локальное состояние формы и параметров статьи
	const [form, setForm] = useState(false);
	const [state, setState] = useState(defaultArticle);

	// Обработчик закрытия формы, если кликаем вне формы
	function closeClickForm(event: MouseEvent) {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setForm(false);
		}
	}

	// Обработчик закрытия формы, если нажимаем Escape
	useEffect(() => {
		if (!form) return;

		function closeForm(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				setForm(false);
			}
		}

		// Добавляем обработчики событий
		document.addEventListener('keydown', closeForm);
		document.addEventListener('mousedown', closeClickForm);

		// Удаляем обработчики событий при размонтировании компонента
		return () => {
			document.removeEventListener('keydown', closeForm);
			document.removeEventListener('mousedown', closeClickForm);
		};
	}, [form]);

	// Ссылка на элемент формы для отслеживания кликов вне формы
	const ref = useRef<HTMLFormElement | null>(null);

	// Обработчик отправки формы
	function addSettings(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(state);
	}

	// Обработчик сброса настроек
	function resetSettings() {
		setState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	// Обработчик открытия и закрытия формы
	function toggleForm() {
		setForm((prevForm) => !prevForm);
	}

	return (
		<>
			{/* Кнопка для открытия/закрытия формы */}
			<ArrowButton form={form} onClick={toggleForm} />

			{/* Сайдбар с формой параметров статьи */}
			<aside
				className={clsx(styles.container, { [styles.container_open]: form })}>
				<form
					className={styles.form}
					onSubmit={addSettings}
					onReset={resetSettings}
					ref={ref}>
					<Text
						as='h1'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					{/* Выбираем шрифт */}
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) =>
							setState({ ...state, fontFamilyOption: selected })
						}
					/>

					{/* Выбираем размер шрифта */}
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(selected) =>
							setState({ ...state, fontSizeOption: selected })
						}
						title='Размер шрифта'
					/>

					{/* Выбираем цвет шрифта */}
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) => setState({ ...state, fontColor: selected })}
					/>

					<Separator />

					{/* Выбираем цвет фона */}
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) =>
							setState({ ...state, backgroundColor: selected })
						}
					/>

					{/* Выбираем ширину контента */}
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) =>
							setState({ ...state, contentWidth: selected })
						}
					/>

					{/* Кнопки для сброса и применения настроек */}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
