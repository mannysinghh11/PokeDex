import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/PokeCard.css'

class PokeCard extends React.Component {
	constructor(props){
		super(props);
    }

    render(){
        return(
            <div className={styles.container}>
                <img src={this.props.pokemonImage} className={styles.pokemonImage}/>
                <p className={styles.pokemonName}>{this.props.pokemonName}</p>
            </div>
        );
    }
}

export default PokeCard;