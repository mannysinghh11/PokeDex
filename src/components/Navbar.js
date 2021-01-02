import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/Navbar.css'

class Navbar extends React.Component {
	constructor(props){
		super(props);
    }

    render(){
        return(
            <div className={styles.container}>
                <div className={styles.navBarItem}>
                    <p className={styles.mainText}>PokeDex</p>
                </div>

                <div className={styles.navBarSearch}>
                    <input className={styles.mainInput} type="text" name="search" placeholder="Search for a Pokemon" onChange={this.props.search}/>
                </div>
            </div>
        );
    }
}

export default Navbar;