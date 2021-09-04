import Square from "../Square";
import styles from "./Board.module.scss";

const Board = ({squares, onClick}) => (
	<div className={styles.board}>
		{
			squares.map((square, i)=>(
				<Square
					key={i}
					onClick={()=> {onClick(i)}}
					value={square}
				/>
			))
		}
	</div>
)

export default Board;
