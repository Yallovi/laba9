import React, { Component } from 'react';
import axios from 'axios';
import ReposList from './ReposList';

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [],
            page: 1,
            pages: 100,
            itemsPerPage: 10
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
    changeCurrentPage(page){
        this.setState(() => {
            return{
                page: page
            };
        });
    }

    render(){
        return(
            <div>
                <h2>Global GitHub repo search</h2>
                <div>
                    <input type="text" id="searchText"/>
                    <button onClick={() => this.searchNew()}>Search</button><br></br>
                    <select id="sortItems" onChange={() => this.changeCurrentPage(1)}>
                        <option value="most-stars">Most stars</option>
                        <option value="fewest-stars">Fewest stars</option>
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

