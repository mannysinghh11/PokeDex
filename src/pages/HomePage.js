import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../components/Navbar.js'
import PokeCard from '../components/PokeCard.js'
import Pagination from '../components/Pagination.js'


import styles from '../styles/HomePage.css'

class HomePage extends React.Component {
	constructor(props){
        super(props);
        
        this.state = {
            pokemonData: [],
            pagePokemonData: [],
            searchQuery: "",
            pageClicked: "0"
        }

        this.renderPokemonCards = this.renderPokemonCards.bind(this);
        this.searchPokemon = this.searchPokemon.bind(this);
        this.paginationButtonClicked = this.paginationButtonClicked.bind(this);
        this.getPageOfPokemon = this.getPageOfPokemon.bind(this);
    }

    componentDidMount(){
        //Total = 895
        var offset = 0;
        var apiCall = "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=895";
        fetch(apiCall)
        .then(res => res.json())
        .then(
            (result) =>{
                //console.log(result.results);
                var allPokemon = result.results;
                var arr = this.state.pokemonData;
                for(var i = 0; i < allPokemon.length; i++){
                    //console.log(allPokemon)
                    var imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (i + 1) + ".png"
                    var pokemon = {pokemonName: allPokemon[i].name, pokemonURL: allPokemon[i].url, pokemonImage: imageURL};
                    arr.push(pokemon);

                    //console.log(pokemon);
                    //console.log(offset + i + 1 - 100);
                }                

                this.setState({
                    pokemonData: arr
                });
            },
            (error) => {
                console.log(error);
            }
        )

        this.paginationButtonClicked("firstRun");
    }

    renderPokemonCards(){
        //console.log(this.state.pokemonData);

        if(this.state.searchQuery == "" && this.state.pageClicked == "View All"){
            //console.log('render everything')
            return(
                this.state.pokemonData.map((data, i) => {
                    //console.log(data);
                    return(
                        <PokeCard key = {i} pokemonName={data.pokemonName} pokemonImage={data.pokemonImage} className={styles.pokemonCard}/>
                    );
                })
            );
        }else if(this.state.searchQuery == "" && this.state.pageClicked != "View All"){
            //console.log("page cliked")
            return(
                this.state.pagePokemonData.map((data, i) => {
                    //console.log(data);
                    return(
                        <PokeCard key = {i} pokemonName={data.pokemonName} pokemonImage={data.pokemonImage} className={styles.pokemonCard}/>
                    );
                })
            );
        }else{
            var arr = this.state.pokemonData;
            var filtered = [];

            for(var i = 0; i < arr.length; i ++){
                if(arr[i].pokemonName.includes(this.state.searchQuery)){
                    filtered.push(arr[i]);
                }
            }

            return(
                filtered.map((data, i) => {
                    //console.log(data);
                    return(
                        <PokeCard key = {i} pokemonName={data.pokemonName} pokemonImage={data.pokemonImage} className={styles.pokemonCard}/>
                    );
                })
            );
        }
    }

    paginationButtonClicked(event){
        var page = "";
        if(event == "firstRun" || event == "View All"){
            if(event == "View All"){
                page = event;
            }else if(event == "firstRun"){
                page = "0";
            }
        }else{
            page = event - 1;
        }

        this.setState({
            pageClicked: page
        },
        this.getPageOfPokemon
        );
    }

    getPageOfPokemon(){
        //console.log('call the api')
        var offset = 0;
        if(this.state.pageClicked != "0"){
            offset = this.state.pageClicked * 20;
        }

        //console.log("offset value: " + offset);
        //console.log("page #: " + this.state.pageClicked);

        var apiCall = "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=20";
        if(offset == 880){
            apiCall = "https://pokeapi.co/api/v2/pokemon?offset=" + offset + "&limit=15"
        }
        fetch(apiCall)
        .then(res => res.json())
        .then(
            (result) =>{
                //console.log(result.results);
                var allPokemon = result.results;
                var arr = [];
                for(var i = 0; i < allPokemon.length; i++){
                    //console.log(allPokemon)
                    //console.log(allPokemon[i].name);
                    var imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + (offset + i + 1) + ".png"
                    var pokemon = {pokemonName: allPokemon[i].name, pokemonURL: allPokemon[i].url, pokemonImage: imageURL};
                    arr.push(pokemon);

                    //console.log(pokemon);
                }                

                this.setState({
                    pagePokemonData: arr
                });
            },
            (error) => {
                console.log(error);
            }
        )  
    }

    searchPokemon(event){
        var query = event.target.value;

        this.setState({
            searchQuery: query,
            pageClicked: "View All"
        });
    }

    render(){
        return(
            <div className={styles.container}>
                <Navbar search={this.searchPokemon}/>

                <div className={styles.pagination}>
                    <Pagination click={this.paginationButtonClicked} totalPokemon={895} currentPage={this.state.pageClicked}/>
                </div>

                <div className={styles.pokemonContainer}>
                    {this.renderPokemonCards()}
                </div>
            </div>
        );
    }
}

export default HomePage;