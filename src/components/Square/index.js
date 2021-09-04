import style from './Square.module.scss';

const Square = ({value, onClick}) => {
	return(
		<button 
			className={`${style.square} ${value ? style[value] : ''}`}
			onClick={onClick}
		>
			{value}
		</button>
	)
}

export default Square;