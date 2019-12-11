import React, { Component } from 'react';
import axios from 'axios';
import ReposList from './ReposList';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            
        }
    }
    searchNew() {
        this.setState(
            () => {
                return {page: 1};
            },
            () => this.search()
        );
    }
    search(){
        let searchText = document.getElementById("searchText").value;

        let itemNumber = document.getElementById("itemNumber").value;

        if(searchText !== ""){
            let sortItems = document.getElementById("sortItems").value;
            let sortValue = sortItems.split("-")[1];
            let pagination = "&per_page=" + itemNumber;
            let url = "https://api.github.com/search/repositories?q=" + searchText + pagination;

            if(sortItems === "most-stars") url += "&order=desc" + "&sort=stars";
            if(sortItems === "fewest-stars") url += "&order=asc" + "&sort=stars";
            if(sortItems === "most-followers") url += "&order=desc" + "&sort=followers";
            if(sortItems === "fewest-followers") url += "&order=asc" + "&sort=followers";
            axios(url)
            .then(response => {
                if(response.data.items.length !== 0){
                    this.setState(()=>{
                        return {
                            data: response.data.items,
                            visible: "visible"
                        };
                    });
                }else{
                    alert("No repos found");
                }
            })
            .catch(error => {alert("Couldn't handle the given instructions" + searchText + ".")});

        }
    }

    render(){
        return(
            <div>
                <h2>Поиск репозиториев</h2>
                <div>
                    <input type="text" id="searchText"/>
                    <button onClick={() => this.searchNew()}>Поиск</button><br></br>
                    <select id="sortItems">
                        <option value="most-stars">Наивысший рейтинг</option>
                        <option value="fewest-stars">Наименьший рейтин</option>
                        <option value="most-followers">Наиболбшее число подптсчиков</option>
                        <option value="fewest-followers">Наименьшее число подптсчиков</option>
                    </select>
                    <input 
                    id = "itemNumber"
                    type="number"
                    min = '1'
                    max = '100'
                    defaultValue = '10'
                    />
                </div>
                <ReposList data={this.state.data}/>
            </div>
            
        );
    }
}

