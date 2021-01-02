import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../styles/Pagination.css'

class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.handleActivePages = this.handleActivePages.bind(this);
        this.updateActiveClasses = this.updateActiveClasses.bind(this);
    }

    componentDidMount() {
        document.getElementById("0").className = styles.paginationActive;
    }

    renderPages() {
        var totalPages = 10;
        var arrPages = [];

        if (this.props.currentPage == "View All") {
            this.updateActiveClasses(totalPages, "View All")
        }

        for (var i = 0; i < totalPages; i++) {
            arrPages.push(i);
        }

        return (
            arrPages.map((data, i) => {
                //console.log(data);
                return (
                    <p className={styles.pagination} onClick={() => this.handleActivePages(event)} key={i} id={i}>{i + 1}</p>
                );
            })
        );
    }

    handleActivePages(event) {
        var maxPages = 10;
        var totalPages = Math.ceil(this.props.totalPokemon / 20);
        var pageClicked = event.path[0].outerText;
        var pageClickedId = event.path[0].id;

        //Update page numbers
        if (pageClickedId == 9) { //Last Page Clicked
            //console.log(pageClickedId)
            if (document.getElementById(pageClickedId).innerHTML < totalPages) {
                for (var i = 0; i < maxPages; i++) {
                    document.getElementById(i).innerHTML = +document.getElementById(i).innerHTML + +7;
                }
            }
        } else if (pageClickedId == 0) { //First Page Clicked
            //console.log(pageClickedId)
            if (document.getElementById(pageClickedId).innerHTML > 1) {
                for (var i = 0; i < maxPages; i++) {
                    document.getElementById(i).innerHTML = +document.getElementById(i).innerHTML - +7;
                }
            }
        }

        this.updateActiveClasses(maxPages, pageClicked)
        this.props.click(pageClicked);
    }

    updateActiveClasses(maxPages, pageClicked) {
        //Change all other classes
        document.getElementById("viewAll").className = styles.pagination;
        for (var i = 0; i < maxPages; i++) {
            document.getElementById(i).className = styles.pagination;
        }
        //Update active class
        var pageButtons = document.getElementsByTagName("p");
        for (var i = 0; i < pageButtons.length; i++) {
            if (pageButtons[i].innerHTML == pageClicked) {
                pageButtons[i].className = styles.paginationActive;
            }
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <p className={styles.pagination} onClick={() => this.handleActivePages(event)} id="viewAll">View All</p>
                {this.renderPages()}
            </div>
        );
    }
}

export default Pagination;