import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Тип для функции обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	/** Флаг состояния формы */
	form?: boolean;
	/** Функция, вызываемая при открытии/закрытии формы */
	onClick?: OnClick;
};

/**
 * Компонент кнопки со стрелкой для открытия/закрытия формы
 */
export const ArrowButton = ({ form, onClick }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: form })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: form })}
			/>
		</div>
	);
};
